/**************************************************/
/*  VB Starter Kit for Gulp 4.0.2                 */
/*  https://github.com/vladikslavus/vbstarterkit  */
/*  by Vlad Beletsky, 2019                        */
/**************************************************/

/* change mode */
const devMode = true,
    prodMode = !devMode;

/* server settings */
const config = {
    proxy: 'vbstarterkit.dev',
    notify: false
};

/* source paths, production paths and paths for files we need to watch */
const path = {
    build: {
        html: './assets/build/',
        php: './assets/build/',
        js: './assets/build/js/',
        css: './assets/build/css/',
        img: './assets/build/img/',
        fonts: './assets/build/fonts/',
        icons: './assets/build/fonts/fa/'
    },
    src: {
        html: './assets/src/*.html',
        php: './assets/src/**/*.php',
        js: ['./assets/src/js/main.js', './assets/src/js/test-01.js'], // js entry points, string when one, array when several
        style: ['./assets/src/style/main.scss', './assets/src/style/test-01.scss'], // scss entry points, string when one, array when several
        img: './assets/src/img/**/*.*',
        fonts: './assets/src/fonts/**/*.*',
        icons: './node_modules/@fortawesome/fontawesome-free/webfonts/*'
    },
    watch: {
        html: './assets/src/**/*.html',
        php: './assets/src/**/*.php',
        js: './assets/src/**/*.js',
        css: './assets/src/**/*.scss',
        img: './assets/src/img/**/*.*',
        fonts: './assets/srs/fonts/**/*.*'
    },
    clean: './assets/build/*'
};

/* define gulp and plugins */
const gulp = require('gulp'),  // Gulp
    browserSync = require('browser-sync'), // automatically reloads the browser while editing CSS, JS, etc.
    gulpif = require('gulp-if'), // a ternary gulp plugin
    plumber = require('gulp-plumber'), // error plugin prevents pipe breaking caused by errors from gulp plugins
    rigger = require('gulp-rigger'), // build time include engine for development files
    htmlMin = require('gulp-htmlmin'), // minify HTML
    sourcemaps = require('gulp-sourcemaps'), // generate sourcemaps
    sass = require('gulp-sass'), // sass plugin (SASS to CSS)
    autoprefixer = require('gulp-autoprefixer'), // add vendor prefixes to CSS
    cleanCSS = require('gulp-clean-css'), // minify CSS
    cache = require('gulp-cache'), // a simple in-memory file cache plugin
    imagemin = require('gulp-imagemin'), // minify PNG, JPEG, GIF and SVG images
    jpegrecompress = require('imagemin-jpeg-recompress'), // jpeg-recompress imagemin plugin
    pngquant = require('imagemin-pngquant'), // png-recompress imagemin plugin
    del = require('del'), // similar to rimraf, but with some improvements
    rename = require('gulp-rename'), // plugin to rename files easily
    newer = require('gulp-newer'), // pass through only those source files that are newer than corresponding destination files
    webpack = require('webpack'), // module bundler itself
    webpackStream = require('webpack-stream'), // run webpack as a stream to conveniently integrate with gulp
    TerserPlugin = require("terser-webpack-plugin"); // minify JS


/* tasks */

// server startup
function webserver() {
    browserSync(config);
}

// html build
function html_build() {
    return gulp.src(path.src.html) // get all html files
        .pipe(plumber()) // gulp plugins bug tracking
        .pipe(rigger()) // templates import
        .pipe(gulpif(prodMode, htmlMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        })))
        .pipe(gulp.dest(path.build.html)) // build html
        .pipe(browserSync.reload({ stream: true })); // browser-sync reload
}

// php build
function php_build() {
    return gulp.src(path.src.php) // get all php files
        .pipe(gulp.dest(path.build.php)) // build php
        .pipe(browserSync.reload({ stream: true })); // browser-sync reload
}

// style build
function css_build () {
    return gulp.src(path.src.style) // pass the string or the array of values pointed above if we want to pass several ones 
        .pipe(plumber()) // gulp plugins bug tracking
        .pipe(gulpif(devMode, sourcemaps.init())) // initialize source maps
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer({ // add vendor prefixes to CSS
            overrideBrowserslist:  ['last 2 versions'], // last two versions recommended by plugin developers
            cascade: false
        }))
        .pipe(gulp.dest(path.build.css)) // deploy temporary css
        .pipe(rename({ suffix: '.min' })) // add prefixes to the deployed file
        .pipe(cleanCSS({level: {1: {specialComments: 0}}})) // minify CSS and disable even special comments
        .pipe(gulpif(devMode, sourcemaps.write('./')))  // write source maps
        .pipe(gulp.dest(path.build.css)) // deploy final css
        .pipe(browserSync.reload({ stream: true })); // browser-sync reload
}

function js_build() {

    let webpackConf = {
        mode: `${(devMode === true) ? 'development' : 'production'}`, // current mode for webpack
        output: {
            filename: `[name].js`,  // the same name as the source
            sourceMapFilename: '[name].map'
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,    // get all js-files
                    exclude: /(node_modules)/, // exclude development modules folder
                    loader: 'babel-loader', // convert ES6 into a backwards compatible version of JS in older browsers
                    query: {
                        presets: ['@babel/env'] // use babel preset
                    }
                },
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
    };

    // convert Gulp array into entry property for Webpack
    let fileName = null;
    let entryObj = {};
    path.src.js.map((filePath) => {
      fileName = filePath.split('/').pop().split('.').slice(0, -1).join('.');
      entryObj[fileName] = filePath;
    });

    // add converted entry property to Webpack    
    webpackConf.entry = entryObj;

    return gulp.src(path.src.js)
        .pipe(webpackStream(webpackConf)).on('error', function handleError() {
            this.emit('end')
        })
        .pipe(gulp.dest(path.build.js))  // build js
        .pipe(rename({ suffix: '.min' })) // add suffix to the filename
        .pipe(gulp.dest(path.build.js)) // build final min js
        .pipe(browserSync.reload({ stream: true })); // browser-sync reload
}

// copy fonts
function fonts_build() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
}

// copy fortawesome icons
function icons_build() {
    return gulp.src(path.src.icons)
        .pipe(gulp.dest(path.build.icons));
}

// optimize images
function image_build() {
    return gulp.src(path.src.img) // get all images
        .pipe(newer(path.build.img)) // have to ensure that only those images that have changed gonna be minified
        .pipe(cache(imagemin([ // image compression
            imagemin.gifsicle({ interlaced: true }),    // gif
            jpegrecompress({                            // jpg
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),                                 // png
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })  // svg
        ])))
        .pipe(gulp.dest(path.build.img)); // unload final resulting images
}

// clean build folder
function clean_build() {
    return del('path.clean', { force: true });
}

// we have to specify that the task is complete using (done)
function build(done) {
    // return Promise.resolve(
    return gulp.series(
        clean_build,
        gulp.parallel(
            html_build,
            js_build,
            css_build,
            php_build,
            fonts_build,
            icons_build,
            image_build
        )
    )(done);
    // );
}

// start tasks when files are changed
function watch() {
    gulp.watch(path.watch.html, gulp.series(html_build));
    gulp.watch(path.watch.php, gulp.series(php_build));
    gulp.watch(path.watch.css, gulp.series(css_build));
    gulp.watch(path.watch.js, gulp.series(js_build));
    gulp.watch(path.watch.img, gulp.series(image_build));
    gulp.watch(path.watch.fonts, gulp.series(fonts_build));
    gulp.watch(path.watch.fonts, gulp.series(icons_build));
}

// define tasks
exports.html_build = html_build;
exports.php_build = php_build;
exports.css_build = css_build;
exports.js_build = js_build;
exports.fonts_build = fonts_build;
exports.icons_build = icons_build;
exports.image_build = image_build;
exports.build = build;

// default task
exports.default = gulp.series(
    build,
    gulp.parallel(webserver, watch)
);
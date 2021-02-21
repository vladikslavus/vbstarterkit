# vbstarterkit

## Web development environment
This is desktop environment for developing front-end components of sites and front-end interfaces. The main feature is using both in one. We use Webpack with Babel inside Gulp via webpack-stream plugin.

## Environment requirements
The following tools must be installed to create the environment:
- Node.js
- Git
- Gulp

If you do not have these tools, you need to install them.

## Project dependencies installation
To install the project's dependencies, enter the command at the command line:
- `npm install`

## How to use the environment
Normal mode: enter `gulp` at the command line.
Selective build: enter the task you need at the command line. For example, enter `gulp css_build` to build CSS or `gulp js_build` to build JS. A list of all available tasks can be found in the file gulpfile.js.

## P.S.
If you are used to using postcss, enter `npm install --save-dev postcss postcss-100vh-fix` at the command line and modify your gulpfile.js.
If there are some vulnerabilities run `npm audit fix` to fix them, or `npm audit` for details.
If you want to use Bootstrap, you need to uncomment it in main.js and main.scss.


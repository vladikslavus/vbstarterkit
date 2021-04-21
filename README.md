## Web development environment
This is my desktop starter kit for developing front-end components of sites and front-end interfaces created to simlify my development workflow. The main feature is that it's using both in one – we use Webpack with Babel inside Gulp via webpack-stream plugin.

You can open `package.json` to read the packages I use.

## Clone the starter kit and install npm modules.
Good, all stuff is installed and imported, and if you want to learn more about my starter kit, let's dive into it by visiting [My Demo Website](https://vbstarterkit.vextor.ru/)

## Environment requirements
The following tools must be installed to create the environment:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Gulp-cli](https://gulpjs.com/docs/en/getting-started/quick-start/) (need to globally install only gulp-cli)

If you do not have these tools, you need to install them.

## Project dependencies installation
To install the project's dependencies, enter the command at the command line:
- `npm install`

## How to use the environment
Normal mode: enter `gulp` at the command line.
Selective build: enter the task you need at the command line. For example, enter `gulp css_build` to build CSS or `gulp js_build` to build JS. A list of all available tasks can be found in the file gulpfile.js.

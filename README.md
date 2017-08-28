# MESH Electron front-end

This is the [Electron](https://electron.atom.io/) based HTML5 frontend for configuration and token management. The application is an [Angular2+](https://angular.io/) app that runs inside the Electron webview.

## Running

VERY IMPORTANT: For all of the below you should have ridiculously reasonably recent node and npm versions installed. It's working for me with npm 5.3.0 and node 8.4.0. Several earlier versions of node and npm are known not to work.

Run:

    $ npm install
    $ npm run build
    $ npm start

## Developing

To begin developing, run:

    $ npm install
    $ npm run build-watch &
    $ npm start

Changes made to the js/ts/scss files will be detected, and the built app files will be available in the `build` directory. Doing "command-r" only very rarely updates the files in the webview, so usually when you make changes you have to stop and re-run `npm start`.

### To install libraries

To install libraries to be used by the web app, run:

    $ npm install foolib@version --save

Then either link to the files in the app/index.html file, or add the files as dependencies in the .angular-cli.json file (you probably want to do the latter if you want the files processed by a preprocessor).

### To add an angular component

The easiest way is to use the `ng generate` command; e.g.:

    $ ng generate component my-cool-new-component

See https://github.com/angular/angular-cli/wiki/generate-component for details

### Building the executables

NB: See the note above about npm/node versions. All commands, including `npm install`, have to have been run with particular versions of node/npm installed.

To build the macOS executable, run:

    $ npm run build-mac-executable

...And several flavors of distributable mac executables will then be in the `out` directory.

Building for windows from the mac does not work yet; when/if it does, you will be able to do it by running:

    $ npm run build-win-executable

The executables are build using the [electron-packager](https://github.com/electron-userland/electron-packager) tool.

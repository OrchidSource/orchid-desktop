# MESH Electron front-end

This is the [Electron](https://electron.atom.io/) based HTML5 frontend for configuration and token management. The application is an [Angular2+](https://angular.io/) app that runs inside the Electron webview.

## Running

You should have a reasonably recent node and npm installed. It's working for me with npm 5.4.0 and node 6.11.2.

Run:

    $ npm install
    $ npm run build
    $ npm start

## Developing

Run:

    $ npm install
    $ npm run build-watch &
    $ npm start

Changes made to the js/ts/scss files will be detected, and the built app files will be available in the `build` directory. Doing "command-r" should reload the files in the Electron webview, though this doesn't work as consistently as one might like; sometimes you have to re-start electron.

### To install libraries

    $ npm install foolib@version --save

Then either link to the files in the app/index.html file, or add the files as dependencies in the .angular-cli.json file (you probably want to do the latter if you want the files processed by a preprocessor).

### To add an angular component

The easiest way is to use the `ng generate` command; e.g.:

    $ ng generate component my-cool-new-component

See https://github.com/angular/angular-cli/wiki/generate-component for details

### Building the executables

NB: There is a bug in npm 5.3.0, and maybe earlier versions, that prevents the executable from being built (see https://github.com/electron-userland/electron-packager/issues/686). 5.4.0 works, so install that if you run into any issues.

To build the macOS executable, run:

    $ npm run build-mac-executable

And the executable will be at `mesh-frontend-electron-darwin-x64/mesh-frontend-electron.app`.

To build the Windows executable from a mac, you first need to install Wine (`brew install wine`). Then run:

    $ npm run build-win-executable

And the executable will be placed at `mesh-frontend-electron-win32-x64/mesh-frontend-electron.exe`.

The executables are build using the [electron-packager](https://github.com/electron-userland/electron-packager) tool.

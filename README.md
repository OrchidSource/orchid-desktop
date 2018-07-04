# Orchid Desktop

This is the [Electron](https://electron.atom.io/) based HTML5 frontend for configuration and token management. The application is an [Angular2+](https://angular.io/) app that runs inside the Electron webview.

## Building

In theory, any recent version of node and npm should work; in practice, you will probably have better luck if you run the same version of node and npm as Electron uses. At present, for Electron 1.8.2, that is node version 8.2.1. ([Node Version Manager (nvm)](https://github.com/creationix/nvm) provides a relatively easy way to switch between versions of node, and is the recommended way to get the correct node version for building the application. Once you've installed nvm, you can run the following command to install 1.8.2:

    nvm install 8.2.1

Then run this command whenever you want to use version 8.2.1 of node in the console.

    nvm use 8.2.1

Then install the build dependency dependency `json5`:

    npm install -g json5

Then run:

    npm install

(Note that the orchid-core and orchid-service-vpn libraries are now included via a git submodule, and all building/linking of those libraries is handled by `npm install`.)

## Running

To run the electron app:

    $ npm run build
    $ npm start

It is not currently possible to run the app from the browser.

Then browse to the weird url http://localhost:8080/build

## Developing

To begin developing, run:

    $ npm run build-watch &
    $ npm start

Changes made to the js/ts/scss files will be detected, and the built app files will be available in the `build` directory. To see your changes you'll have to re-start the app with `yarn start`.

### Debugging info

If the app is crashing or otherwise misbehaving, adding the following to your environment may provide some information in the console:

    set ELECTRON_ENABLE_LOGGING=true
    set ELECTRON_ENABLE_STACK_DUMPING=true

### To install libraries

To install libraries to be used by the web app, run:

    $ npm add foolib@version

Then either link to the files in the app/index.html file, or add the files as dependencies in the .angular-cli.json file (you probably want to do the latter if you want the files processed by a preprocessor).

### To add an angular component

The easiest way is to use the `ng generate` command; e.g.:

    $ node_modules/.bin/ng generate component my-cool-new-component

See https://github.com/angular/angular-cli/wiki/generate-component for details on the `ng generate` command.

### MacOS Icons

The raw icon files live in the `icons` directory. To update the icon for MacOS, update the png files in the `icons/orchid.iconset` directory; see https://developer.apple.com/library/content/documentation/GraphicsAnimation/Conceptual/HighResolutionOSX/Optimizing/Optimizing.html for a list of the file sizes/names that should be in that directory. In practice, you don't need to supply all of these files; the most appropriate available icon size will be used. So if you are lazy, just include a 512x512 version of the icon. Once you've updated the file there, run `npm run generate-icon` and the icns file will be generated and placed in `build-resources`. Check that file in.


### Linux Icons

Create icons for building on linux with `npm run generate-icon-linux` which directly creates the properly sized pngs and outputs them into build/icons


### Building the executables

NB: See the note above about npm/node versions. All commands, including `npm install`, have to have been run with particular versions of node/npm installed.

All executables get placed in the `out` directory.

Building can take a very long time, especially the first time you do it; be patient.

All executables are built using the [electron-builder](https://www.electron.build/) tool; see the options for that tool to see how to modify the generated executables (e.g. sign them or change the app icon).

#### MacOS

It is only possible to build a Mac executable from a Mac computer.

To build the macOS executable, run the following command from a mac:

    $ npm run build-mac-executable

...And several flavors of distributable mac executables will then be in the `out` directory.

#### Windows

It is possible to build for Windows from a non-windows machine using Docker. To do so you need [Docker for mac](https://docs.docker.com/docker-for-mac/) installed. Then run:

    $ npm run build-win-executable

#### Linux

This is untested, but should work:

    $ npm run build-linux-executable

# Importing translations

Translations currently live in this spreadsheet:

https://docs.google.com/spreadsheets/d/1Nm10JF2oqftGZbre658UB935_ErB8HeGZ18eHffthZw/

To load those translations into the app, first export the spreadsheet as a csv file and place it in the root directory with the name `translations.csv`. Then run `npm run import-translations`. The new translation files will be placed in `src/assets/translations`, and can be committed.

In the future we may make the sceript automatically pull the translations from the spreadsheet.

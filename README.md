# Orchid Desktop

This is the [Electron](https://electron.atom.io/) based HTML5 frontend for configuration and token management. The application is an [Angular2+](https://angular.io/) app that runs inside the Electron webview.

## Building
You need orchid-core and orchid-service-vpn which you can get from here:

    cd ..
    git clone https://git.orchidprotocol.org/orchid/orchid-core.git
    git clone https://git.orchidprotocol.org/orchid/orchid-service-vpn.git

You need to build and "link" both `core` and `service-vpn`:

    cd orchid-core
    ./setup
    ./install
    npm run build
    npm link
    cd ..

    cd orchid-service-vpn
    ./setup
    ./install
    npm link @orchidprotocol/core
    npm run build
    npm link

Once that's done, you can build in this directory:

     cd orchid-desktop
     npm link @orchidprotocol/core
     npm link @orchidprotocol/service-vpn
     npm install
     
## Running

VERY IMPORTANT: For all of the below you should have ridiculously reasonably recent node and npm versions installed. It's working for me with npm 5.3.0 and node 8.4.0. Several earlier versions of node and npm are known not to work.

To run the electron app:

    $ npm install
    $ npm run build
    $ npm start

To run the app from from the browser, first do `npm run build` or `npm run build-watch`, then run the following (note that things related to accessing the user's system won't work):

    $ npm run serve

Then browse to the weird url http://localhost:8080/build

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

    $ node_modules/.bin/ng generate component my-cool-new-component

See https://github.com/angular/angular-cli/wiki/generate-component for details


### MacOS Icons

The raw icon files live in the `icons` directory. To update the icon for MacOS, update the png files in the `icons/orchid.iconset` directory; see https://developer.apple.com/library/content/documentation/GraphicsAnimation/Conceptual/HighResolutionOSX/Optimizing/Optimizing.html for a list of the file sizes/names that should be in that directory. In practice, you don't need to supply all of these files; the most appropriate available icon size will be used. So if you are lazy, just include a 512x512 version of the icon. Once you've updated the file there, run `npm run generate-icon` and the icns file will be generated and placed in `build-resources`. Check that file in.


### Linux Icons

Create icons for building on linux with `npm run generate-icon-linux` which directly creates the properly sized pngs and outputs them into build/icons


### Building the executables

NB: See the note above about npm/node versions. All commands, including `npm install`, have to have been run with particular versions of node/npm installed.

All executables get placed in the `out` directory.

Building can take a very long time, especially the first time you do it; be patient.

All executables are built using the [electron-builder](https://www.electron.build/) tool; see the options for that tool to see how to modify the generated executables (e.g. sign them or change the app icon).

#### Mac OX

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

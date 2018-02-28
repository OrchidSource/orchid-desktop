#!/bin/sh
# Does all the stuff that needs to be done before "npm install" is run.
# Called by the prinstall script in package.json, so you shouldn't usually
# have to run this manually

# TODO: check node/npm versions here
# TODO: check that json5 is installed

git submodule init
git submodule update
cd submodules/orchid-core
./install
npm run build
npm link
cd ../orchid-service-vpn
./setup
npm link @orchidprotocol/core
./install
npm run build
cd ../..

# now you can run `npm install`

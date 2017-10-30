//manage-chrome.js: -*- JavaScript-IDE -*-  DESCRIPTIVE TEXT.
//
// Copyright (c) 2017 Brian J. Fox & Orchid Labs, Inc.
// Author: Brian J. Fox (bfox@meshlabs.org)
// Author: A truckload of others
// Birthdate: Mon Oct 30 08:33:57 2017.

const { spawn } = require('child_process');

class chromeManager {
  var chrome_variables = {
    userData: app.getPath("userData"),
    executable: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    chrome: null
  };

  function startChrome() {
    var userData = chrome_variables["userData"];
    var chrome = chrome_variables["executable"];
    chrome_variables.chrome = spawn(chrome, ['--user-data-dir="' + userData + '"', '--proxy-server="socks5://localhost:1323"']);
    console.log("Chrome started", chrome_variables.chrome);
  }

  function stopChrome = {
    if (chrome_variables.chrome) {
      chrome_variables.chrome.kill();
      delete chrome_variables["chrome"];
      console.log("Chrome Stopped");
    } else {
      console.log("Chrome wasn't running");
    }
}

exports.default = chromeManager;

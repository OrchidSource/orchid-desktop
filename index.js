var {app, BrowserWindow, Menu, MenuItem, nativeImage, Tray, shell} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const {spawn} = require('child_process');


const NARROW_WIDTH = 285;
const WIDE_WIDTH = 1024;
const WIDE_HEIGHT = 618;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// the system tray thing
let tray = null;

function createWindow(width) {
  width = width || WIDE_WIDTH;
  // Create the browser window.

  // TODO I think this is a bug with how electron handles icons in linux
  // and should be fixed to deal with multiple resolution sizes
  let _appIcon = nativeImage.createFromPath(__dirname + "/build/icons/icon_128x128.png");

  win = new BrowserWindow({
    width: width,
    height: WIDE_HEIGHT,
    minWidth: NARROW_WIDTH,
    minHeight: 410,
    icon: _appIcon,
    titleBarStyle: 'hidden'
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'build', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Opens links with target="_blank" in an external browser window
  win.webContents.on('new-window', function(e, url) {
    console.log('new-window');
    e.preventDefault();
    shell.openExternal(url);
  });

  // indicates that "electron" was run with a target directory, which should
  // only happen when developing
  if (process.defaultApp) {
    // Open the DevTools.
    win.webContents.openDevTools();
  }

  win.onbeforeunload = function() {
    console.log('onbeforeunload');
    win.hide();

    // Unlike usual browsers that a message box will be prompted to users, returning
    // a non-void value will silently cancel the close.
    // It is recommended to use the dialog API to let the user confirm closing the
    // application.
    // e.returnValue = false // equivalent to `return false` but not recommended
    return false;
  };

  // Emitted when the window is closed.
  win.on('closed', () => {
    console.log('closed');
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.

    // If the window was closed, remove from dock. The user can get back to the UI
    // by clicking the tray icon
    app.dock.hide();

    win = null;
  });

  win.on('minimize', () => {
    console.log('minimize');
    app.dock.show();
  });

  win.on('maximize', () => {
    console.log('minimize');
    app.dock.show();
  });


  // Show the icon in the dock; it may have been hidden if the user previously closed the window
  app.dock.show();
}


function createTray() {
  tray = new Tray(__dirname + "/icons/orchid.iconset/icon_22x22.png");
  // const trayMenu = new Menu();
  // trayMenu.append(new MenuItem({
  //   label: 'Open',
  //   click() {
  //     console.log('Open clicked');
  //     if (win == null) {
  //       createWindow(NARROW_WIDTH);
  //     } else {
  //       // win.focusOnWebView();
  //       win.restore();
  //     }
  //   }
  // }));
  //
  // trayMenu.append(new MenuItem({
  //   type: 'separator'
  // }));
  //
  // trayMenu.append(new MenuItem({
  //   label: 'Exit Orchid',
  //   click() {
  //     console.log('Exit clicked');
  //     app.quit();
  //   }
  // }));
  // tray.setContextMenu(trayMenu);

  tray.setToolTip('Orchid VPN');

  tray.on('click', function(event) {
    console.log('tray click');
    if (win == null) {
      createWindow(NARROW_WIDTH);
    } else {
      win.focusOnWebView();
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
  createTray();
  createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  console.log('window-all-closed');
// do nothing; keep open in tray
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

let logizomai = require('logizomai');
// let orchid = {
//   core: require('@orchidprotocol/core'),
//   vpn: require('@orchidprotocol/service-vpn')
// };
let orchid = {
  core: {},
  vpn: {}
};

let using = logizomai.using;

async function filter(host) {
  return true;
}

const port = 1323;

var sfo_seeds = ['orchid://0@104.131.141.48:3200/0/NGgM-Dvy7LQ-RO7oSr2iRaskwnxbdUal8OHI-vTTv0k', /* ALPHA-SFO-1 */
  'orchid://0@165.227.9.47:3200/0/mza4QadI_d7XchB5CW2rIe9YjEEcInBHZNl5-vPcCBY', /* ALPHA-SFO-2 */
  'orchid://0@165.227.13.29:3200/0/lG1Qx-DpNKdYLQ9l2otkBf-DsKvYkwXo72O-6foQXB8', /* ALPHA-SFO-3 */
  'orchid://0@165.227.11.29:3200/0/_S8mCK7E47_Kri7zK68Bd7vg6SzRWpkNme1v_qxS4GA' /* ALPHA-SFO-4 */
];

var nyc_seeds = ['orchid://0@159.203.81.5:3200/0/R6x45CN-OlJVKv4srEcbq9MAM6GulXsXw1QHxxzH90w']; /* ALPHA-NYC-1 */
var ams_seeds = ['orchid://0@188.166.87.162:3200/0/LlSjBhzmScTiaYynTCGMV8iCXUJDgvp7WwvgnlTFkBY']; /* ALPHA-AMS-1 */

var de_seeds = ['orchid://0@46.101.188.244:3200/0/aflY86Krju0pLdrKxBDtQS8Wshf3Uc1QY5oXglurUhg']; /* ALPHA-FRA-1 */
var sng_seeds = ['orchid://0@128.199.214.165:3200/0/lcMM3Blomj6Thyiy36cqdxm1zP1qghMZyWsxByhnBFo']; /* ALPHA-SNG-1 */
var hkg_seeds = ['orchid://0@180.235.133.148:3200/0/OrZ358LCmMTLPI5R4j7G9TLFdyZGc5HT4WgSubzOdHE']; /* ALPHA-HKG-1 */

var us_seeds = sfo_seeds.concat(nyc_seeds);
var eu_seeds = ams_seeds.concat(de_seeds);
var cn_seeds = sng_seeds.concat(hkg_seeds);

var all_seeds = (us_seeds).concat(eu_seeds).concat(cn_seeds);
var all_but_sf = nyc_seeds.concat(eu_seeds).concat(cn_seeds);

app.virtuals = [];

function start_orchid_network(desired_exit_location) {
  var choices = all_but_sf;

  if (!desired_exit_location)
    desired_exit_location = "ALL";
  console.log("Starting Orchid Network: " + desired_exit_location);
  if (desired_exit_location == "US") {
    choices = us_seeds;
  } else if (desired_exit_location == "EU") {
    choices = eu_seeds;
  } else if (desired_exit_location == "CN") {
    choices = cn_seeds;
  } else if (desired_exit_location == "DE") {
    choices = de_seeds;
  } else if (desired_exit_location == "HKG") {
    choices = hkg_seeds;
  } else if (desired_exit_location == "SNG") {
    choices = sng_seeds;
  }
  var index = Math.floor(Math.random() * choices.length);
  var referral = choices[index];
  var result;

  console.log("REFERRAL:" + referral);
  result = (async() => {
    await using(new orchid.core.DummyClock(), async (clock) => {
      await using(new orchid.core.DummyContext(clock), async (context) => {
        await context.refer(referral);
        await using(await new orchid.vpn.Client(context)._(), async (client) => {
          await using(await new orchid.vpn.SocksCapture(context, client, filter, port)._(), async (virtual) => {
            virtual.retain();
            app.virtuals.push(virtual);
          });
        });
      });
    });
  })().catch(function(err) {
    console.log("Error: ", err);
  });
}

function stop_orchid_network() {
  if (app.virtuals && app.virtuals.length) {
    var virtual = app.virtuals.pop();
    console.log("Stopping Orchid Network...", virtual);
    virtual.release();
  }
}

function get_chrome_path() {
  switch (process.platform) {
    case "darwin":
      return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    case "win32":
      // windows 10, TODO: older versions
      return "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";
    case "linux":
      return "/usr/bin/google-chrome";
    default:
      throw new Error("unsupported platform: " + process.platform);
  }
}

var chrome_variables = {
  EVENTS: {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
  },
  userData: app.getPath("userData"),
  executable: get_chrome_path(),
  instance: null,

  startNetwork: function(location) {
    win.webContents.send(this.EVENTS.CONNECTED);
  // stop_orchid_network();
  // start_orchid_network(location);
  },

  stopNetwork: function() {
    win.webContents.send(this.EVENTS.DISCONNECTED);
  // stop_orchid_network();
  },

  startChrome: function() {
    var userData = this.userData;
    var program = this.executable;
    var args = ['--user-data-dir=' + userData,
      '--no-first-run',
      '--proxy-server=socks5://127.0.0.1:1323',
      '--host-resolver-rules=MAP * ~NOTFOUND , EXCLUDE 127.0.0.1'];
    if (this.instance) this.instance.kill();
    this.instance = spawn(program, args);
    win.webContents.send(this.EVENTS.CONNECTED);
    console.log("Chrome started");
  },

  stopChrome: function() {
    if (this.instance) {
      this.instance.kill();
      this.instance = null;
      console.log("Chrome Stopped");
    } else {
      console.log("Chrome wasn't running");
    }
    win.webContents.send(this.EVENTS.DISCONNECTED);
  }
};

app.chrome_vars = chrome_variables;

process.on('uncaughtException', function(error) {
  console.log("GOT ERROR: ", error);
});

var setup_script = "/Applications/OrchidAlpha.app/Contents/bin/setup.sh";
if (fs.existsSync(setup_script)) {
  spawn("/bin/bash", [setup_script]);
}

// setTimeout(function() {
//   app.chrome_vars.startNetwork("EU");
// }, 500);

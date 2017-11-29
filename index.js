var { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { spawn } = require('child_process');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.

  // TODO I think this is a bug with how electron handles icons in linux
  // and should be fixed to deal with multiple resolution sizes
  let _appIcon = nativeImage.createFromPath(__dirname + "/build/icons/icon_128x128.png")

  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 410,
    minHeight: 410,
    icon: _appIcon,
    titleBarStyle: 'hidden',
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'build', 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // indicates that "electron" was run with a target directory, which should
  // only happen when developing
  if (process.defaultApp) {
    // Open the DevTools.
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
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
let orchid = { core: require('@orchidprotocol/core'), vpn: require('@orchidprotocol/service-vpn') };
let using = logizomai.using;

async function filter(host) {
  console.log("FILTER CALLED");
  return true;
};

const port = 1323;

var sfo_seeds = [ 'orchid://0@104.131.141.48:3200/0/NGgM-Dvy7LQ-RO7oSr2iRaskwnxbdUal8OHI-vTTv0k', /* ALPHA-SFO-1 */
                  'orchid://0@165.227.9.47:3200/0/mza4QadI_d7XchB5CW2rIe9YjEEcInBHZNl5-vPcCBY',   /* ALPHA-SFO-2 */
                  'orchid://0@165.227.13.29:3200/0/lG1Qx-DpNKdYLQ9l2otkBf-DsKvYkwXo72O-6foQXB8',  /* ALPHA-SFO-3 */
                  'orchid://0@165.227.11.29:3200/0/_S8mCK7E47_Kri7zK68Bd7vg6SzRWpkNme1v_qxS4GA'   /* ALPHA-SFO-4 */
                ];

var nyc_seeds = ['orchid://0@159.203.81.5:3200/0/R6x45CN-OlJVKv4srEcbq9MAM6GulXsXw1QHxxzH90w'];   /* ALPHA-NYC-1 */
var ams_seeds = ['orchid://0@188.166.87.162:3200/0/LlSjBhzmScTiaYynTCGMV8iCXUJDgvp7WwvgnlTFkBY']; /* ALPHA-AMS-1 */

var de_seeds  = ['orchid://0@46.101.188.244:3200/0/aflY86Krju0pLdrKxBDtQS8Wshf3Uc1QY5oXglurUhg'];  /* ALPHA-FRA-1 */
var sng_seeds = ['orchid://0@128.199.214.165:3200/0/lcMM3Blomj6Thyiy36cqdxm1zP1qghMZyWsxByhnBFo']; /* ALPHA-SNG-1 */
var hkg_seeds = ['orchid://0@180.235.133.148:3200/0/OrZ358LCmMTLPI5R4j7G9TLFdyZGc5HT4WgSubzOdHE']; /* ALPHA-HKG-1 */

var us_seeds  = sfo_seeds.concat(nyc_seeds);
var eu_seeds  = ams_seeds.concat(de_seeds);
var cn_seeds  = sng_seeds.concat(hkg_seeds);

var all_seeds = (us_seeds).concat(eu_seeds).concat(cn_seeds);

function start_orchid_network(desired_exit_location) {
  var choices = all_seeds;

  if (!desired_exit_location) desired_exit_location = "ALL";
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
            // app.virtual_object = virtual;
          });
        });
      });
    });
  })().catch(function(err) { console.log("Error: ", err); });
}

function stop_orchid_network() {
  if (app.virtual_object) {
    console.log("Stop Orchid Network: app.virtual_object:", app.virtual_object);
    // app.virtual_object.release();
    // app.virtual_object = null;
  }
};

var chrome_variables = {
  EVENTS: {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
  },
  userData: app.getPath("userData"),
  executable: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  instance: null,

  startNetwork: function(location) {
    stop_orchid_network();
    start_orchid_network(location);
  },

  stoptNetwork: function() {
    stop_orchid_network();
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

var setup_script = "/Applications/OrchidAlpha.app/Contents/bin/setup.sh";
if (fs.existsSync(setup_script)) { spawn("/bin/bash", [ setup_script ]); }

app.chrome_vars.startNetwork();

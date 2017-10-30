var {app, BrowserWindow, nativeImage} = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');

var chrome_variables = {
  userData: app.getPath("userData"),
  executable: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  instance: null,

  startChrome: function() {
    var userData = this.userData;
    var program = this.executable;
    this.instance = spawn(program, ['--user-data-dir=' + userData, '--proxy-server=socks5://127.0.0.1:1323']);
    console.log("Chrome started", this.instance);
  },

  stopChrome: function() {
    if (this.instance) {
      this.instance.kill();
      this.instance = null;
      console.log("Chrome Stopped");
    } else {
      console.log("Chrome wasn't running");
    }
  }
};

app.chrome_vars = chrome_variables;

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

let orchid = require('orchid-p2p');

let logizomai = require('logizomai');
let using = logizomai.using;

async function filter(host) {
    return true;
}

const port = 1323;
const referral = 'orchid://0@54.90.192.199:3200/0/zV2r8zUGzS2-bqg0uV7_kL0dLfEcPzCJZ3N0rZX4Kn4';

(async () => {
  await using(new orchid.DummyClock(), async (clock) => {
    await using(new orchid.DummyContext(clock), async (context) => {
      await context.refer(referral);
      await using(await new orchid.Client(context)._(), async (client) => {
        await using(await new orchid.SocksCapture(context, client, filter, port)._(), async (virtual) => {
          virtual.retain();
        }); }); }); });
})().catch();

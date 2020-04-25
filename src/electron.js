const electron = require('electron');
const OauthTwitter = require('electron-oauth-twitter');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const tw = new OauthTwitter({
  key: 'EbONJcOqssFttqWt4qA12jn5s',
  secret: '7mV3ukOVWjskrme9LgPCuV53G4oA3w0P7xkDOHYvnarADoSuRc'
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // delete menu bar(Windows)
  mainWindow.setMenu(null);

  // mainWindow.loadURL('https://musing-booth-a199e7.netlify.app/');
  mainWindow.loadURL('http://localhost:3000');

  // if not login -> create login window.
  if(mainWindow.webContents.executeJavaScript('localStorage.getItem("ACCESS_TOKEN")') === "") {
    tw.startRequest().then(function(result) {
      const accessToken = result.oauth_access_token;
      const accessTokenSecret = result.oauth_access_token_secret;
      mainWindow.webContents.executeJavaScript('localStorage.setItem("ACCESS_TOKEN", "' + accessToken + '");', true);
      mainWindow.webContents.executeJavaScript('localStorage.setItem("ACCESS_TOKEN_SECRET", "' + accessTokenSecret + '");', true);
    }).catch(function(error) {
      console.error(error, error.stack);
    });
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// Disable HardwareAcceleration.
app.disableHardwareAcceleration();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// 今後削除される予定なのでdocに従いdefaultでfalseを設定する。
// https://www.electronjs.org/docs/all
app.allowRendererProcessReuse = false;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
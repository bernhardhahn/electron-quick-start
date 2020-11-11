
const {app, BrowserWindow, Menu, crashReporter} = require('electron')
const path = require('path')

crashReporter.start({
  submitURL: 'https://someurl.com/crashreport',
  uploadToServer: false
})

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.hide();
  setTimeout(() => mainWindow.show(), 4000);


  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null);
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// related: https://github.com/electron/electron/issues/23282
// related: https://github.com/electron/electron/issues/17652

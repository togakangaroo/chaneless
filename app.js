const electron = require('electron')
const app = electron.app // Module to control application life.
const BrowserWindow = electron.BrowserWindow // Module to create native browser window.

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(`file://${__dirname}/ui/main.html`)

  mainWindow.webContents.openDevTools() //TODO - remove

  mainWindow.on('closed', () => mainWindow = null )
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu barto stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
  !mainWindow  && createWindow()
})

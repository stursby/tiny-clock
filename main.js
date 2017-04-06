const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const Positioner = require('electron-positioner')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 90,
    height: 22,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  })
  positioner = new Positioner(win)
  positioner.move('topRight')

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

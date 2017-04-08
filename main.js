const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const Positioner = require('electron-positioner')
const isDev = require('electron-is-dev')

let positioner
let win

function createWindow () {
  win = null
  positioner = null

  win = new BrowserWindow({
    width: 120,
    height: 24,
    alwaysOnTop: true,
    frame: false,
    focusable: false,
    fullscreenable: false,
    hasShadow: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    maximizable: false,
    minimizable: false,
    resizable: false,
    skipTaskbar: false,
    textAreasAreResizable: false,
    title: 'tiny clock',
    transparent: true
  })

  function positionWin () {
    positioner.move('topRight')
    const [x, y] = win.getPosition()
    win.setPosition(x - 10, y + 5)
  }

  positioner = new Positioner(win)
  positionWin()

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const template = [{
    label: 'View',
    role: 'window',
    submenu: [{
      label: 'Choose Theme',
      submenu: [{
        type: 'radio',
        label: 'Dark Theme',
        checked: true,
        click() {
          win.webContents.send('changeTheme', 'dark')
        }
      }, {
        type: 'radio',
        label: 'Light Theme',
        click() {
          win.webContents.send('changeTheme', 'light')
        }
      }]
    }, {
      label: 'Show Seconds',
      type: 'checkbox',
      checked: false,
      click(menuItem) {
        win.webContents.send('showSeconds', menuItem.checked)
      }
    }, {
      type: 'separator'
    }, {
      role: 'quit'
    }]
  }]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  if (isDev) {
    win.webContents.openDevTools({ detach: true })
  }

  win.on('resize', positionWin)

  win.on('closed', () => {
    win = null
    positioner = null
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const { autoUpdater } = require('electron-updater')

autoUpdater.addListener('update-available', (event) => {
  console.log('update-available')
})
autoUpdater.addListener('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
  console.log('update-downloaded')
})
autoUpdater.addListener('error', (error) => {
  console.log('error')
})
autoUpdater.addListener('checking-for-update', (event) => {
  console.log('checking for updates')
})
autoUpdater.addListener('update-not-available', (event) => {
  console.log('update not available')
})

autoUpdater.checkForUpdates()

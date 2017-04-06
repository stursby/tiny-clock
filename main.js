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
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    textAreasAreResizable: false,
    title: 'tiny clock',
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
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
      label: 'Toggle Theme',
      click() {
        win.webContents.send('toggleTheme')
      }
    }, {
      label: 'Toggle Seconds',
      click() {
        win.webContents.send('toggleSeconds')
      }
    }, {
      label: 'Toggle Blinking Separator',
      click() {
        win.webContents.send('toggleBlink')
      }
    }]
  }]
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [{
        role: 'quit'
      }]
    })
  }
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

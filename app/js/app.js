const { ipcRenderer } = require('electron')
const settings = require('electron-settings')
const moment = require('moment')

const { themeSetting, showSecondsSetting } = settings.getAll()

if (themeSetting) {
  changeTheme(themeSetting)
}

let showSeconds = (showSecondsSetting !== undefined) ? showSecondsSetting : false

ipcRenderer.on('showSeconds', (e, value) => {
  showSeconds = value
})

ipcRenderer.on('changeTheme', (e, theme) => {
  changeTheme(theme)
})

function changeTheme(theme) {
  document.body.classList = ''
  document.body.classList.add(`theme-${theme}`)
}

function startTime() {
  const time = document.getElementById('time')
  const now = moment()
  time.innerHTML = `<span title="${now.format('LLLL')}">${now.format(showSeconds ? `h:mm:ss A` : `h:mm A`)}</span>`
  requestAnimationFrame(startTime)
}
requestAnimationFrame(startTime)

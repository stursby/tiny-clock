const { ipcRenderer } = require('electron')
const moment = require('moment')

let showSeconds = false

ipcRenderer.on('showSeconds', (e, value) => {
  showSeconds = value
})
ipcRenderer.on('changeTheme', (e, theme) => {
  document.body.classList = ''
  document.body.classList.add(`theme-${theme}`)
})

function startTime() {
  const time = document.getElementById('time')
  const now = moment()
  time.innerHTML = `<span title="${now.format('LLLL')}">${now.format(showSeconds ? `h:mm:ss A` : `h:mm A`)}</span>`
  requestAnimationFrame(startTime)
}
requestAnimationFrame(startTime)

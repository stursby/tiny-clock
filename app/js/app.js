const { ipcRenderer } = require('electron')
const moment = require('moment')

let showSeconds = false
let blinkSeparator = false

ipcRenderer.on('toggleTheme', () => {
  document.body.classList.toggle('theme-light')
})
ipcRenderer.on('toggleSeconds', () => {
  showSeconds = !showSeconds
})

function startTime() {
  const time = document.getElementById('time')
  const now = moment()
  time.innerHTML = `<span title="${now.format('LLLL')}">${now.format(showSeconds ? `h:mm:ss A` : `h:mm A`)}</span>`
  requestAnimationFrame(startTime)
}
requestAnimationFrame(startTime)

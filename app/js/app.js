const { ipcRenderer } = require('electron')

let showSeconds = false
let blinkSeparator = false

ipcRenderer.on('toggleTheme', () => {
  document.body.classList.toggle('theme-dark')
  document.body.classList.toggle('theme-light')
})
ipcRenderer.on('toggleSeconds', () => {
  showSeconds = !showSeconds
})
ipcRenderer.on('toggleBlink', () => {
  blinkSeparator = !blinkSeparator
})

function startTime() {
  const time = document.getElementById('time')
  const today = new Date()
  let h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()
  let isOdd = s % 2
  let ap = h < 12 ? 'AM': 'PM'
  h = h === 0 ? 12 : (h > 12 ? h - 12 : h)
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  let separator = blinkSeparator ? `<span class="${isOdd ? 'odd' : ''}">:</span>` : `:`
  let sec = showSeconds ? `${separator}${s}` : ``
  time.innerHTML = `${h}${separator}${m}${sec} ${ap}`
  requestAnimationFrame(startTime)
}
requestAnimationFrame(startTime)

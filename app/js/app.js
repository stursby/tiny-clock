const { remote } = require('electron')
const { Menu, MenuItem } = remote
const win = remote.getCurrentWindow()
const menu = new Menu()

let showSeconds = false
let blinkSeparator = false

menu.append(new MenuItem({label: 'toggle theme', click() {
  document.body.classList.toggle('theme-dark')
  document.body.classList.toggle('theme-light')
}}))
menu.append(new MenuItem({label: 'toggle seconds', click() {
  showSeconds = !showSeconds
}}))
menu.append(new MenuItem({label: 'toggle blink', click() {
  blinkSeparator = !blinkSeparator
}}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(win)
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

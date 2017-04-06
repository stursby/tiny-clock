function startTime() {
  const time = document.getElementById('time')
  const today = new Date()
  let h = today.getHours()
  let m = today.getMinutes()
  let s = today.getSeconds()
  let ap = h < 12 ? 'AM': 'PM'
  h = h === 0 ? 12 : (h > 12 ? h - 12 : h)
  m = m < 10 ? `0${m}` : m
  s = s < 10 ? `0${s}` : s
  time.innerHTML = `${h}:${m} ${ap}`
  requestAnimationFrame(startTime)
}
requestAnimationFrame(startTime)
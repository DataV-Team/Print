function secondsToMinutes (seconds) {
  seconds = Math.ceil(seconds)

  let minute = Math.trunc(seconds / 60).toString().padStart(2, '0')
  let second = (seconds % 60).toString().padStart(2, '0')

  return `${minute}:${second}`
}

export default function (Vue) {
  Vue.filter('secondsToMinutes', secondsToMinutes)
}

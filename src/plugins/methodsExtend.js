const { parse, stringify } = JSON

/**
 * @description          deep clone obecjt
 * @return     {object}  clone
 */
export function deepClone (object) {
  return parse(stringify(object))
}

export function gameTimerFilter (timer) {
  const { trunc } = Math

  const minutes = trunc(timer / 60).toString().padStart(2, '0')
  const seconds = (timer % 60).toString().padStart(2, '0')

  return `${minutes}:${seconds}`
}

export function deleteArrayAllItems (arrays) {
  arrays.forEach(element => element.splice(0, element.length))
}

export default function (Vue) {
  Vue.prototype.deepClone = deepClone
  Vue.prototype.gameTimerFilter = gameTimerFilter
  Vue.prototype.deleteArrayAllItems = deleteArrayAllItems
}

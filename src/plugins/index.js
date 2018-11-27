// import axiosExtend from './axiosExtend'
import canvasExtend from './canvasExtend'
import color from './color'
import mathExtend from './mathExtend'
import methodsExtend from './methodsExtend'
import filters from './filters'
// import routerExtend from './routerExtend'

export default function (Vue) {
  // axiosExtend(Vue)
  canvasExtend(Vue)
  color(Vue)
  mathExtend(Vue)
  methodsExtend(Vue)
  filters(Vue)
  // routerExtend(Vue)
}

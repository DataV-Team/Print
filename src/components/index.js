import canvasBG from './canvasBG.vue'

import audioCanvasFrequency from './audioCanvasFrequency.vue'

import menuBar from './menuBar.vue'

import inputWithEnter from './inputWithEnter.vue'

export default function (Vue) {
  Vue.component('canvasBG', canvasBG)
  Vue.component('menuBar', menuBar)
  Vue.component('inputWithEnter', inputWithEnter)
  Vue.component('audioCanvasFrequency', audioCanvasFrequency)
}

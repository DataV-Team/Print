import canvasBG from './canvasBG.vue'

import audioCanvasFrequency from './audioCanvasFrequency.vue'

import menuBar from './menuBar.vue'

import inputWithEnter from './inputWithEnter.vue'

import photoCover from './photoCover.vue'

import videoCover from './videoCover.vue'

import videoPlayer from './videoPlayer.vue'

import progresser from './progresser.vue'

import loading from './loading.vue'

export default function (Vue) {
  Vue.component('canvasBG', canvasBG)
  Vue.component('menuBar', menuBar)
  Vue.component('inputWithEnter', inputWithEnter)
  Vue.component('audioCanvasFrequency', audioCanvasFrequency)
  Vue.component('photoCover', photoCover)
  Vue.component('videoCover', videoCover)
  Vue.component('videoPlayer', videoPlayer)
  Vue.component('progresser', progresser)
  Vue.component('loading', loading)
}

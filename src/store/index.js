import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicAudio: '',
    fadeHeader: false
  },
  mutations: {
    setMusicAudio (state, audio) {
      state.musicAudio = audio
    },
    setFadeHeader (state, scrollTop) {
      state.fadeHeader = scrollTop
    }
  },
  actions: {

  }
})

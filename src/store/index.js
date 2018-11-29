import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // BGM play status
    bgmStatus: true,
    // music audio for canvas frequency component
    musicAudio: '',
    // weather fade header
    fadeHeader: false
  },
  mutations: {
    setBgmStatus (state, status) {
      state.bgmStatus = status
    },
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

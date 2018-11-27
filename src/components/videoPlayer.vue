<template>
  <div class="video-player">
    <div class="player-container">

      <video :ref="videoRef"
        preload="auto"
        @click="playOrPause"
        @waiting="waitingHandle"
        @canplay="canPlayHandle"
        :autoplay="autoplay"
        :src="resource.videoSrc"
        :poster="resource.coverSrc">
      </video>

      <loading v-if="loading" />

      <div class="video-controls">
        <progresser :progress="currentTime / durationTime" @change="setVideoProgress" />

        <i :class="`jm-video-${status ? 'pause' : 'play'}`" @click="playOrPause" />

        <div class="current-time">{{ (currentTime || 0) | secondsToMinutes }}</div>

        <div class="volume"><div /></div>

        <div class="duration-time">{{ durationTime | secondsToMinutes }}</div>

        <i class="jm-full-screen" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: ['videoSrc', 'resource', 'autoplay', 'currentTime', 'volume'],
  data () {
    return {
      // video ref
      videoRef: `video-${(new Date()).getTime()}`,
      // video dom
      video: '',
      // duration time
      durationTime: 0,
      // video play status
      status: false,
      // loading
      loading: false,
      // time out handle
      timeOutHandle: ''
    }
  },
  watch: {
    volume (v) {
      const { video } = this

      video.volume = v
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { $refs, videoRef, getCurrentTime } = this

      this.video = $refs[videoRef]

      getCurrentTime()
    },
    /**
     * @description             set video progress
     * @return     {undefined}  no return
     */
    setVideoProgress (p) {
      const { video, durationTime, emitPlayingEvent } = this

      const currentTime = durationTime * p

      video && (video.currentTime = currentTime) && emitPlayingEvent(currentTime)
    },
    /**
     * @description             play or pause video
     * @return     {undefined}  no return
     */
    playOrPause () {
      const { status, video } = this

      this.status = !status

      this.status && video.play()
      !this.status && video.pause()
    },
    /**
     * @description             video waiting handle
     * @return     {undefined}  no return
     */
    waitingHandle () {
      this.loading = true
    },
    /**
     * @description             video can play handle
     * @return     {undefined}  no retrun
     */
    canPlayHandle () {
      this.durationTime = this.video.duration
      this.loading = false
    },
    /**
     * @description             get current time of video
     * @return     {undefined}  no return
     */
    getCurrentTime () {
      const { status, video, getCurrentTime, emitPlayingEvent } = this

      status && emitPlayingEvent(video.currentTime)

      this.timeOutHandle = setTimeout(getCurrentTime, 1000)
    },
    /**
     * @description             emit playing event
     * @return     {undefined}  no return
     */
    emitPlayingEvent (value) {
      this.$emit('playing', value)
    }
  },
  mounted () {
    const { init } = this

    init()
  },
  destroyed () {
    const { timeOutHandle } = this

    clearTimeout(timeOutHandle)
  }
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.video-player {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;

  .player-container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1000px;
    height: 562px;
    transform: translate(-50%, -50%);
    margin-top: -50px;
  }

  video {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .video-controls {
    position: absolute;
    height: 30px;
    width: 100%;
    bottom: -30px;
    .SBS(fade(@BSC, 60));
  }

  .jm-full-screen, .jm-video-play, .jm-video-pause {
    position: absolute;
    font-size: 20px;
    line-height: 30px;
    color: @TC;
    cursor: pointer;
    .STS(@TC);
  }

  .jm-video-play, .jm-video-pause {
    left: 10px;
  }

  .jm-full-screen {
    right: 10px;
  }

  .current-time, .duration-time {
    position: absolute;
    font-size: 20px;
    line-height: 32px;
    top: 3px;
    color: @TC;
    .STS(@TC);
  }

  .current-time {
    left: 50px;
  }

  .duration-time {
    right: 50px;
  }
}
</style>

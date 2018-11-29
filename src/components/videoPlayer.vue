<template>
  <div class="video-player">
    <div class="player-container">

      <video :ref="videoRef"
        preload="auto"
        @click="playOrPause"
        @waiting="waitingHandle"
        @canplay="canPlayHandle"
        @ended="status = false"
        :autoplay="autoplay"
        :src="resource && resource.videoSrc"
        :poster="resource && resource.coverSrc">
      </video>

      <loading v-if="loading" />

      <div class="video-controls">
        <progresser class="video-progress" :progress="currentTime / durationTime" @change="setVideoProgress" />

        <i :class="`jm-video-${status ? 'pause' : 'play'}`" @click="playOrPause" />

        <div class="current-time">{{ (currentTime || 0) | secondsToMinutes }}</div>

        <progresser
          class="volume-progress"
          :progress="volume"
          :btnClass="`jm-${volume < 0.05 ? 'mute' : (volume < 0.3 ? 'volume-low' : (volume > 0.7 ? 'volume-hight' : 'volume-middle'))}`"
          @change="emitVolumeChangeEvent" />

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
      const { $refs, videoRef, getCurrentTime, volume, currentTime } = this

      this.video = $refs[videoRef]

      this.video.volume = volume || '0.5'

      this.video.currentTime = currentTime

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
    },
    /**
     * @description             emit volume change event
     * @return     {undefined}  no return
     */
    emitVolumeChangeEvent (value) {
      this.$emit('volumeChange', value)
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

  .video-progress {
    position: absolute;
  }

  .volume-progress {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    margin-top: 3px;
    transform: translate(-50%, -50%);

    .change-progress-btn {
      color: @STC;
      background-color: transparent;
      border-color: transparent;
      font-size: @VPVBIFS;
      line-height: 11px;
      .STS(@TC);
    }
  }

  .jm-full-screen, .jm-video-play, .jm-video-pause {
    position: absolute;
    top: 3px;
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
    height: 27px;
    font-size: @VPTFS;
    line-height: 32px;
    top: 3px;
    color: @TC;
    cursor: default;
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

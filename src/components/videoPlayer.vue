<template>
  <div class="video-player">
    <div class="player-container">

      <video :ref="videoRef"
        preload="auto"
        @click="status = !status"
        @waiting="waitingHandle"
        @canplay="canPlayHandle"
        @ended="(status = false) & (ended = true)"
        :autoplay="autoplay"
        :src="resource && resource.videoSrc"
        :poster="resource && resource.coverSrc">
      </video>

      <div class="replay-btn" v-if="ended && !status" @click="replayVideo"><i class="jm-replay" />Replay</div>

      <loading v-if="loading" />

      <div class="video-controls">
        <progresser class="video-progress" :progress="videoProgress" @change="setVideoCurrentTime" />

        <i :class="`jm-video-${status ? 'pause' : 'play'}`" @click="status = !status" />

        <div class="current-time">{{ (currentTime || 0) | secondsToMinutes }}</div>

        <progresser
          class="volume-progress"
          :progress="volume"
          :btnClass="`jm-${volume < 0.05 ? 'mute' : (volume < 0.3 ? 'volume-low' : (volume > 0.7 ? 'volume-hight' : 'volume-middle'))}`"
          @change="emitVolumeChangeEvent" />

        <div class="duration-time">{{ durationTime | secondsToMinutes }}</div>

        <i class="jm-full-screen" @click="fullScreen" />
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
      // ended status
      ended: false,
      // time out handle
      timeOutHandle: ''
    }
  },
  watch: {
    status () {
      const { playOrPause } = this

      playOrPause()
    },
    volume (v) {
      const { video } = this

      video.volume = v
    },
    resource (v) {
      !v && (this.status = false)
    }
  },
  computed: {
    videoProgress () {
      const { currentTime, durationTime } = this

      if (!durationTime) return 0

      return currentTime / durationTime
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { initConfig, getCurrentTime, addSpaceEnhance } = this

      initConfig()

      getCurrentTime()

      addSpaceEnhance()
    },
    /**
     * @description             init component config
     * @return     {undefined}  no return
     */
    initConfig () {
      const { $refs, videoRef, volume, currentTime } = this

      this.video = $refs[videoRef]

      this.video.volume = volume || '0.5'

      this.video.currentTime = currentTime
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
     * @description             add space key up play video enhance
     * @return     {undefined}  no return
     */
    addSpaceEnhance () {
      const { spacePlayOrPause } = this

      document.addEventListener('keyup', spacePlayOrPause)
    },
    /**
     * @description             remove space enhance
     * @return     {undefined}  no return
     */
    removeSpaceEnhance () {
      const { spacePlayOrPause } = this

      document.removeEventListener('keyup', spacePlayOrPause)
    },
    /**
     * @description             play or pause by space key up
     * @return     {undefined}  no return
     */
    spacePlayOrPause ({ keyCode }) {
      const { status, resource } = this

      if (keyCode !== 32) return

      resource && (this.status = !status)
    },
    /**
     * @description             set video setVideoCurrentTime
     * @return     {undefined}  no return
     */
    setVideoCurrentTime (p) {
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

      status && (this.ended = false)

      status && video.play()
      !status && video.pause()
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
     * @description             full screen
     * @return     {undefined}  no return
     */
    fullScreen () {
      const { video } = this

      if (video.requestFullscreen) {
        video.requestFullscreen()
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen()
      }
    },
    /**
     * @description             replay video
     * @return     {undefined}  no return
     */
    replayVideo () {
      const { video, emitPlayingEvent } = this

      video.currentTime = 0

      emitPlayingEvent(0)

      this.status = true
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
    const { timeOutHandle, removeSpaceEnhance } = this

    clearTimeout(timeOutHandle)

    removeSpaceEnhance()
  }
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.video-player {
  position: relative;
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

    &:hover {
      .video-controls {
        visibility: visible;
      }
    }
  }

  video {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .replay-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 80px;
    color: @TC;
    font-size: @VPRBFS;
    line-height: 70px;
    text-align: center;
    border-radius: 30px;
    cursor: pointer;
    .STS(@TC);
    .SBS(fade(@BSC, 60));

    .jm-replay {
      font-size: @VPRBIFS;
      margin-right: 20px;
    }
  }

  .video-controls {
    position: absolute;
    height: 30px;
    width: 100%;
    bottom: -30px;
    visibility: hidden;
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

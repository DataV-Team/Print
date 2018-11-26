<template>
  <div class="video-player">
    <div class="player-container">
      <!-- <video :autoplay="true" src="data:video/mp4;base64,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"></video> -->
      <video :ref="videoRef" :autoplay="autoplay" :src="resource.videoSrc" :poster="resource.coverSrc"></video>

      <div class="video-controls">
        <progresser :progress="progress" @change="setVideoProgress" />

        <i :class="`jm-video-${status ? 'pause' : 'play'}`" @click="playOrPause" />

        <div class="current-time"></div>

        <div class="volume"><div /></div>

        <div class="duration-time"></div>

        <i class="jm-full-screen" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: ['videoSrc', 'resource', 'autoplay'],
  data () {
    return {
      // video ref
      videoRef: `video-${(new Date()).getTime()}`,
      // video dom
      video: '',
      // current time
      currentTime: 0,
      // duration time
      durationTime: 0,
      // current video progress
      progress: 0,
      // video play status
      status: false
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { $refs, videoRef } = this

      this.video = $refs[videoRef]
    },
    /**
     * @description             set video progress
     * @return     {undefined}  no return
     */
    setVideoProgress (p) {
      this.progress = p
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
    }
  },
  mounted () {
    const { init } = this

    init()
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
}
</style>

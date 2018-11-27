<template>
  <div id="video-album">
    <video-cover :class="{ fade: palyVideoIndex !== false}" :covers="contents" @scroll="setFadeHeader" @click="turnToVideo" />

    <video-player
      v-if="palyVideoIndex !== false"
      :resource="contents[palyVideoIndex]"
      :autoplay="false"
      :volume="volume"
      :currentTime="videoCurrentTime"
      @playing="setCurrentTime" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'VideoAlbum',
  props: ['album'],
  data () {
    return {
      // all video contents
      contents: [
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          Album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        }
      ],
      //  current play video index
      palyVideoIndex: false,
      // video current time
      videoCurrentTime: 0,
      // video volume
      volume: 0.5
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { contents, album } = this

      let currentVideo = album.split('-')

      if (currentVideo[1]) this.palyVideoIndex = contents.findIndex(({ album: a }) => a === currentVideo[1])
    },
    /**
     * @description             turn to video
     * @return     {undefined}  no return
     */
    turnToVideo (index) {
      this.palyVideoIndex = index

      this.videoCurrentTime = 0
    },
    /**
     * @description             set current video current time
     * @return     {undefined}  no return
     */
    setCurrentTime (time) {
      this.videoCurrentTime = time
    },
    ...mapMutations(['setFadeHeader'])
  },
  created () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
#video-album {
  width: 100%;
  height: 100%;

  .fade {
    opacity: 0;
  }

  .video-cover {
    transition: all 0.3s;
  }
}
</style>

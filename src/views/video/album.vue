<template>
  <div id="video-album">
    <video-cover :class="{ fade: palyVideoIndex !== false}" :covers="contents" @scroll="setFadeHeader" @click="turnToVideo" />

    <video-player :resource="contents[palyVideoIndex]" :autoplay="false" v-if="palyVideoIndex !== false" />
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
      palyVideoIndex: false
    }
  },
  methods: {
    init () {
      const { contents, album } = this

      let currentVideo = album.split('-')

      if (currentVideo[1]) this.palyVideoIndex = contents.findIndex(({ album: a }) => a === currentVideo[1])
    },
    turnToVideo (index) {
      this.palyVideoIndex = index
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

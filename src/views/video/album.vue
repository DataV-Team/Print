<template>
  <div id="video-album">
    <video-cover :class="{ fade: palyVideoIndex !== false}" :covers="contents" @scroll="setFadeHeader" />

    <div class="play-video" v-if="palyVideoIndex !== false"></div>
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
          album: 'Video321',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video313',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video313',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video1313',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video313',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video2211',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video  12313',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video3123',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video2',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video31231',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          Album: 'Video 3123',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video3213',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        },
        {
          album: 'Video3123',
          coverSrc: '/API/assets/temp/videoCover/2.jpg'
        }
      ],
      //  current play video index
      palyVideoIndex: false
    }
  },
  methods: {
    ...mapMutations(['setFadeHeader'])
  }
}
</script>

<style lang="less">
#video-album {
  width: 100%;
  height: 100%;
}
</style>

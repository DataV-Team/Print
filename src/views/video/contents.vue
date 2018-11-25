<template>
  <div id="video-contents">
    <video-cover :covers="contents" @scroll="setFadeHeader" @click="turnToAlbum" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'VideoContents',
  data () {
    return {
      contents: [
        {
          album: 'Video321',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video313',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video313',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video1313',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video313',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video2211',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video  12313',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video3123',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video2',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video31231',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          Album: 'Video 3123',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video3213',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        {
          album: 'Video3123',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        }
      ]
    }
  },
  methods: {
    /**
     * @description             turn to video album
     * @return     {undefined}  no return
     */
    turnToAlbum (index) {
      const { contents, $router } = this

      $router.push(`/home/video/${contents[index].album}`)
    },
    ...mapMutations(['setFadeHeader'])
  }
}
</script>

<style lang="less">
#video-contents {
  width: 100%;
  height: 100%;
}
</style>

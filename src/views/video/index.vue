<template>
  <div id="video">
    <video-cover :covers="contents" />
  </div>
</template>

<script>
export default {
  name: 'Video',
  data () {
    return {
      contents: [
        {
          Album: 'Video',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        // {
        //   Album: 'Video',
        //   coverSrc: '/API/assets/temp/videoCover/1.jpg'
        // },
        {
          Album: 'Video',
          coverSrc: '/API/assets/temp/videoCover/1.jpg'
        }
      ]
    }
  }
}
</script>

<style lang="less">
#video {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
}
</style>

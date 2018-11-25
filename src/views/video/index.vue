<template>
  <div id="video">
    <video-album :album="album" v-if="album" />

    <video-contents v-else />
  </div>
</template>

<script>
import videoAlbum from './album.vue'
import videoContents from './contents'

export default {
  name: 'Video',
  props: ['album'],
  components: {
    videoAlbum,
    videoContents
  },
  methods: {
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

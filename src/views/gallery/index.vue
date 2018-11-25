<template>
  <div id="gallery">
    <gallery-album :album="album" v-if="album" />

    <gallery-contents v-else />
  </div>
</template>

<script>
import galleryAlbum from './album'
import galleryContents from './contents'

export default {
  name: 'Gallery',
  components: {
    galleryAlbum,
    galleryContents
  },
  props: ['album'],
  data () {
    return {}
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang="less">
#gallery {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
}
</style>

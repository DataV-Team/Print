<template>
  <div id="gallery">
    <album :album="album" v-if="album" />

    <gallery-contents v-else />
  </div>
</template>

<script>
import album from './album'
import galleryContents from './contents'

export default {
  name: 'Gallery',
  components: {
    album,
    galleryContents
  },
  props: ['album'],
  data () {
    return {}
  },
  methods: {
  },
  created () {
    console.error(this.album)
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

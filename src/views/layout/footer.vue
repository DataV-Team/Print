<template>
  <div id="bottom">
    <audio-canvas-frequency :audio="musicAudio" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Bottom',
  computed: {
    ...mapState(['musicAudio'])
  }
}
</script>

<style lang="less">
#bottom {
  height: 300px;
}
</style>

<template>
  <div id="home" refs="home">
    <canvas-b-g class="canvas-bg" />
    <top-header />
    <bottom-footer />
  </div>
</template>

<script>
import canvasBG from '@/components/canvasBG.vue'
import topHeader from './header.vue'
import bottomFooter from './footer.vue'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    canvasBG,
    topHeader,
    bottomFooter
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#home {
  width: 100%;
  height: 100%;

  .canvas-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>

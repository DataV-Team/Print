<template>
  <div id="home" refs="home">
    <canvas-b-g class="canvas-bg" />
    <top-header :class="`top-header ${fadeHeader && 'fade'}`" />
    <middle-content />
    <bottom-footer class="bottom-footer" />
  </div>
</template>

<script>
import topHeader from './header.vue'
import middleContent from './content.vue'
import bottomFooter from './footer.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  data () {
    return {}
  },
  components: {
    topHeader,
    middleContent,
    bottomFooter
  },
  computed: {
    ...mapState(['fadeHeader'])
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
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .canvas-bg {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: @BCC;
  }

  .top-header {
    position: absolute;
    width: 100%;
    top: 0px;

    &.fade {
      top: -70px !important;
    }
  }

  .bottom-footer {
    position: absolute;
    width: 100%;
    bottom: 0px;
  }
}
</style>

<template>
  <div id="header">
    <div class="left">
      <song-ctl />
    </div>

    <div class="middle">
      <menu-bar />
    </div>

    <div class="right">
      this is right
    </div>
  </div>
</template>

<script>
import songCtl from './header/songCtl'
import menuBar from '@/components/menuBar.vue'

export default {
  name: 'Header',
  data () {
    return {}
  },
  components: {
    songCtl,
    menuBar
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#header {
  height: 70px;
  box-sizing: border-box;
  // box-shadow: 0 0 3px red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .left {
    box-sizing: border-box;
    padding-left: 10px;
  }
}
</style>

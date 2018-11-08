<template>
  <div id="header">
    <song-ctl />
    <menu-bar />
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
  box-shadow: 0 0 3px red;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

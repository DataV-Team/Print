<template>
  <div id="header">
    <div class="left">
      <song-ctl />
    </div>

    <div class="middle">
      <menu-bar :navBar="navbar" />
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
  components: {
    songCtl,
    menuBar
  },
  data () {
    return {
      navbar: [
        {
          title: 'Gallery',
          icon: 'jm-gallery',
          target: '',
          children: [
            {
              title: 'edit',
              icon: 'jm-manage'
            }
          ]
        },
        {
          title: 'Video',
          icon: 'jm-video',
          target: '',
          children: [
            {
              title: 'edit',
              icon: 'jm-manage'
            }
          ]
        },
        {
          title: 'Words',
          icon: 'jm-words',
          target: '',
          children: []
        },
        {
          title: 'Game',
          icon: 'jm-game',
          target: '',
          children: [
            {
              title: 'tetris',
              icon: 'jm-tetris'
            }
          ]
        },
        {
          title: 'Cloud',
          icon: 'jm-cloud',
          target: '',
          children: [
            {
              title: 'file',
              icon: 'jm-file'
            },
            {
              title: 'note',
              icon: 'jm-note'
            },
            {
              title: 'memo',
              icon: 'jm-memo'
            },
            {
              title: 'contact',
              icon: 'jm-contact'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#header {
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .left, .middle, .right {
    box-sizing: border-box;
  }

  .left, .right {
    width: 200px;
  }

  .left {
    padding-left: 10px;
  }

  .middle {
    padding-top: 10px;
  }

  // .right {}
}
</style>

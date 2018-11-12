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
          icon: 'jm-play',
          target: '',
          children: [
            {
              title: 'test1',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test2',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test3',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test4',
              icon: 'jm-next',
              target: ''
            }
          ]
        },
        {
          title: 'Gallery',
          icon: 'jm-play',
          target: '',
          children: [
            {
              title: 'test1',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test2',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test3',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test4',
              icon: 'jm-next',
              target: ''
            }
          ]
        },
        {
          title: 'Gallery',
          icon: 'jm-play',
          target: '',
          children: [
            {
              title: 'test1',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test2',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test3',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test4',
              icon: 'jm-next',
              target: ''
            }
          ]
        },
        {
          title: 'Gallery',
          icon: 'jm-play',
          target: '',
          children: [
            {
              title: 'test1',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test2',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test3',
              icon: 'jm-next',
              target: ''
            },
            {
              title: 'test4',
              icon: 'jm-next',
              target: ''
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

  .left {
    box-sizing: border-box;
    padding-left: 10px;
  }

  .middle {
    box-sizing: border-box;
    padding-top: 10px;
  }
}
</style>

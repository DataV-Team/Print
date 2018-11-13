<template>
  <div id="header">
    <div class="left">
      <song-ctl class="song-ctl" />
      <weixin-code class="weixin-code" />
    </div>

    <div class="middle">
      <menu-bar :navBar="navbar" />
    </div>

    <div class="right">
      <login-register class="login-register" />
    </div>
  </div>
</template>

<script>
import songCtl from './header/songCtl'
import weixinCode from './header/weixinCode'
import menuBar from '@/components/menuBar.vue'
import loginRegister from './header/loginRegister'

export default {
  name: 'Header',
  components: {
    songCtl,
    weixinCode,
    menuBar,
    loginRegister
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

  .left, .right {
    flex: 1;
  }

  .left {
    display: flex;
    flex-direction: row;

    .song-ctl {
      margin-left: 10px;
    }

    .weixin-code {
      margin-left: calc(~"(100% - 210px) / 2");
    }
  }

  .middle {
    padding-top: 10px;
  }

  .right {

    .login-register {
      margin-left: calc(~"(100% - 30px) / 2");
      margin-top: 10px;
    }
  }
}
</style>

<template>
  <div id="gallery-album">
    <photo-cover :imgs="albums" :column="3" width="400" @scroll="setFadeHeader" @click="doZoom" :class="{fade: zoomIndex !== false}" />

    <div class="zoom" v-if="zoomIndex !== false">
      <div class="zoom-img-container">
        <img :src="albums[zoomIndex].src">
        <i :class="`jm-${autoPlayStatus ? 'pause' : 'play'}`" @click="doAutoPlay" />
      </div>

      <i class="jm-left" @click="zoomIndex - 1 < 0 ? zoomIndex = albums.length - 1 : zoomIndex--" />
      <i class="jm-right" @click="zoomIndex + 1 === albums.length ? zoomIndex = 0 : zoomIndex++" />
      <i class="jm-fork" @click="zoomIndex = autoPlayStatus = false" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Album',
  props: ['album'],
  data () {
    return {
      // all albums
      albums: [
        {
          src: '/API/assets/temp/school/1.jpg'
        },
        {
          src: '/API/assets/temp/school/2.jpg'
        },
        {
          src: '/API/assets/temp/school/14.png'
        },
        {
          src: '/API/assets/temp/school/4.jpg'
        },
        {
          src: '/API/assets/temp/school/5.jpg'
        },
        {
          src: '/API/assets/temp/school/6.jpg'
        },
        {
          src: '/API/assets/temp/school/7.jpg'
        },
        {
          src: '/API/assets/temp/school/8.jpg'
        },
        {
          src: '/API/assets/temp/school/9.jpg'
        },
        {
          src: '/API/assets/temp/school/10.jpg'
        },
        {
          src: '/API/assets/temp/school/11.jpg'
        },
        {
          src: '/API/assets/temp/school/12.jpg'
        },
        {
          src: '/API/assets/temp/school/13.jpg'
        }
      ],
      // zoom img index
      zoomIndex: false,
      // auto play status
      autoPlayStatus: false,
      // auto play time frame
      autoPlayTime: 3000
    }
  },
  methods: {
    /**
     * @description             zoom img
     * @return     {undefined}  no return
     */
    doZoom (index) {
      this.zoomIndex = index
    },
    /**
     * @description             do auto play
     * @return     {undefined}  no return
     */
    doAutoPlay () {
      const { autoPlayStatus, autoPlay } = this

      this.autoPlayStatus = !autoPlayStatus

      if (this.autoPlayStatus) setTimeout(autoPlay, 1000)
    },
    /**
     * @description             auto play
     * @return     {undefined}  no return
     */
    autoPlay () {
      const { albums: { length: albumsNum }, zoomIndex, autoPlay, autoPlayStatus, autoPlayTime } = this

      if (!autoPlayStatus) return

      const nextZoomIndex = zoomIndex + 1

      this.zoomIndex = (nextZoomIndex === albumsNum ? 0 : nextZoomIndex)

      setTimeout(autoPlay, autoPlayTime)
    },
    ...mapMutations(['setFadeHeader'])
  },
  created () {
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#gallery-album {
  position: relative;
  width: 100%;
  height: 100%;

  .fade {
    opacity: 0;
  }

  .photo-cover {
    transition: all 0.3s;
  }

  .zoom {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;

    .zoom-img-container {
      position: absolute;
      top: 10%;
      left: 50%;
      height: 80%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      border-radius: 15px;

      &:hover {
        .jm-play, .jm-pause {
          visibility: visible;
          opacity: 1;
        }
      }

      img {
        height: 100%;
        width: auto;
        box-sizing: border-box;
        padding: 10px;
        border-radius: 15px;
        .SBS(fade(@BSC, 60));
      }
    }

    .jm-left, .jm-right, .jm-fork, .jm-play, .jm-pause {
      position: absolute;
      cursor: pointer;
      color: transparent;
      .STS(@TC);

      &:active {
        color: @TC;
      }
    }

    .jm-left, .jm-right {
      top: 50%;
      transform: translateY(-50%);
      font-size: 100px;
    }

    .jm-left {
      left: 20px;
    }

    .jm-right {
      right: 20px;
    }

    .jm-fork {
      top: 100px;
      right: 40px;
      font-size: 60px;
    }

    .jm-play, .jm-pause {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9;
      font-size: 100px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }
  }
}
</style>

<template>
  <div id="front-cover">
    <div class="cover-container">

      <div class="middle-title">{{ cover[currentMiddleIndex].describe }}</div>

      <div v-for="(photo, index) in cover"
        :key="index"
        :class="`img-container ${photoClass[currentMiddleIndex][index]}`"
        @click="turnCover(photoClass[currentMiddleIndex][index])">
        <img :src="photo.src" />

        <i class="jm-left" v-show="photoClass[currentMiddleIndex][index].indexOf('left') !== -1" />
        <i :class="`jm-${autoPlayStatus ? 'pause' : 'play'}`" v-show="photoClass[currentMiddleIndex][index] === 'middle'"
          @click="autoPlay" />
        <i class="jm-right" v-show="photoClass[currentMiddleIndex][index].indexOf('right') !== -1" />
      </div>

      <div class="square-container">
        <div :class="`square ${currentMiddleIndex === index && 'current'}`"
          v-for="(square, index) in  cover"
          :key="index"
          @click="currentMiddleIndex = index" />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FrontCover',
  data () {
    return {
      cover: [
        {
          src: '/API/assets/temp/photo/1.jpg',
          describe: 'PIC 1'
        },
        {
          src: '/API/assets/temp/photo/2.jpg',
          describe: 'PIC 2'
        },
        {
          src: '/API/assets/temp/photo/3.jpg',
          describe: 'PIC 3'
        },
        {
          src: '/API/assets/temp/photo/4.jpg',
          describe: 'PIC 4'
        },
        {
          src: '/API/assets/temp/photo/5.jpg',
          describe: 'PIC 5'
        },
        {
          src: '/API/assets/temp/photo/6.jpg',
          describe: 'PIC 6'
        },
        {
          src: '/API/assets/temp/photo/7.jpg',
          describe: 'PIC 7'
        }
      ],
      // photo class
      photoClass: [],
      // current middle index
      currentMiddleIndex: 0,
      // auto play status
      autoPlayStatus: false,
      // auto play time
      autoPlayTime: 1500
    }
  },
  methods: {
    /**
     * @description             init current cover data
     * @return     {undefined}  no return
     */
    init () {
      const { cover, photoClass } = this

      cover.length < 5 && (cover.push(...new Array(5 - cover.length).fill({ src: '', describe: '' })))

      const coverNum = cover.length

      photoClass.push(...new Array(coverNum).fill(null).map((t, index) => {
        const tempClassArray = new Array(coverNum).fill('hide')

        tempClassArray[index] = 'middle'

        const leftIndex = (index - 1 < 0) ? (coverNum + index - 1) : index - 1
        const leftSmallIndex = (index - 2 < 0) ? (coverNum + index - 2) : index - 2
        const rightIndex = (index + 1 >= coverNum) ? (index + 1 - coverNum) : index + 1
        const rightSmallIndex = (index + 2 >= coverNum) ? (index + 2 - coverNum) : index + 2

        tempClassArray[leftIndex] = 'left'
        tempClassArray[leftSmallIndex] = 'left-small'
        tempClassArray[rightIndex] = 'right'
        tempClassArray[rightSmallIndex] = 'right-small'

        return tempClassArray
      }))
    },
    /**
     * @description             turn cover
     * @return     {undefined}  no return
     */
    turnCover (photoClass) {
      const { cover: { length: coverNum } } = this

      switch (photoClass) {
        case 'left':
        case 'left-small':
          --this.currentMiddleIndex < 0 && (this.currentMiddleIndex = coverNum - 1)
          break
        case 'right':
        case 'right-small':
          ++this.currentMiddleIndex === coverNum && (this.currentMiddleIndex = 0)
          break
      }
    },
    /**
     * @description             auto play
     * @return     {undefined}  no return
     */
    autoPlay () {
      const { autoPlayStatus, doAutoPlay } = this

      this.autoPlayStatus = !autoPlayStatus

      if (this.autoPlayStatus) doAutoPlay()
    },
    /**
     * @description             do auto play
     * @return     {undefined}  no return
     */
    doAutoPlay () {
      const { autoPlayStatus } = this

      if (!autoPlayStatus) return

      const { autoPlayTime, cover: { length: coverNum }, currentMiddleIndex, doAutoPlay } = this

      currentMiddleIndex + 1 === coverNum ? (this.currentMiddleIndex = 0) : this.currentMiddleIndex++

      setTimeout(doAutoPlay, autoPlayTime)
    }
  },
  created () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#front-cover {
  position: relative;
  width: 100%;
  height: 100%;

  .cover-container {
    position: absolute;
    width: 100%;
    height: 450px;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    transform: translate(-50%, -50%);

    .middle-title {
      position: absolute;
      height: 40px;
      left: 50%;
      transform: translate(-50%);
      text-align: center;
      line-height: 40px;
      color: @TC;
      font-size: @FCMTFS;
      cursor: default;
      .STS(@TC);
    }

    .middle {
      top: 0px;
      width: 630px;
      height: 350px;
      margin-left: 0px;
      z-index: 3;
    }

    .left, .right {
      top: 48px;
      width: 480px;
      height: 255px;
      z-index: 2;
    }

    .left {
      margin-left: -400px;
    }

    .right {
      margin-left: 400px;
    }

    .left-small, .right-small, .hide {
      top: 93px;
      width: 300px;
      height: 165px;
      z-index: 1;
    }

    .left-small {
      margin-left: -700px;
    }

    .right-small {
      margin-left: 700px;
    }

    .img-container {
      position: absolute;
      box-sizing: border-box;
      padding: 10px;
      margin-top: 50px;
      border-radius: 15px;
      left: 50%;
      transform: translate(-50%);
      transition: .3s;
      cursor: pointer;
      .SBS(fade(@TC, 60));

      &:hover {
        .jm-left, .jm-right, .jm-play, .jm-pause {
          opacity: 1;
        }

        .SBS(fade(@TC, 80));
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }

    .square-container {
      position: absolute;
      bottom: 15px;
      display: flex;
      flex-direction: row;
      left: 50%;
      transform: translate(-50%);

      div {
        width: 30px;
        height: 10px;
        background-color: fade(@TC, 10);
        margin: 0 10px;
        border-radius: 5px;
        cursor: pointer;
        .SBS(fade(@TC, 60));

        &.current {
          background-color: fade(@TC, 80);
        }

        &:hover {
          background-color: fade(@TC, 80);
        }
      }
    }

    .jm-left, .jm-right, .jm-play, .jm-pause {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: transparent;
      opacity: 0;
      .STS(@TC);
    }

    .jm-left {
      left: 0px;
    }

    .jm-right {
      right: 0px;
    }

    .left .jm-left, .right .jm-right {
      font-size: 80px;
    }

    .left-small .jm-left, .right-small .jm-right {
      font-size: 50px;
    }

    .jm-play, .jm-pause {
      left: 50%;
      font-size: 100px;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

<template>
  <div id="front-cover">
    <div class="cover-container">

      <div class="middle-title">{{ cover[currentMiddleIndex].describe }}</div>

      <div v-for="(photo, index) in currentCover"
        :key="index"
        :class="`img-container ${currentCover[index].class}`">
        <img :src="currentCover[index].src" />
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
      // current cover
      currentCover: [],
      // current middle index
      currentMiddleIndex: 0
    }
  },
  methods: {
    /**
     * @description             init current cover data
     * @return     {undefined}  no return
     */
    init () {
      const { cover, currentCover } = this

      cover.length < 5 && (cover.push(...new Array(5 - cover.length).fill({ src: '', describe: '' })))

      currentCover[0] = { src: cover[cover.length - 2].src, class: 'left-small' }
      currentCover[1] = { src: cover[cover.length - 1].src, class: 'left' }
      currentCover[2] = { src: cover[0].src, class: 'middle' }
      currentCover[3] = { src: cover[1].src, class: 'right' }
      currentCover[4] = { src: cover[2].src, class: 'right-small' }
    },
    /**
     * @description             turn cover
     * @return     {undefined}  no return
     */
    turnCover () {
      const { cover, currentCover, currentMiddleIndex } = this

      
    },
    /**
     * @description             next or prev
     * @return     {undefined}  no return
     */
    nextOrPrev (prev = false) {
      const { cover, currentCover } = this

      const coverNum = cover.length

      if (prev) {
        --this.currentMiddleIndex < 0 && (this.currentMiddleIndex = coverNum - 1)

        let addPhotoIndex = this.currentMiddleIndex - 2
        addPhotoIndex - coverNum >= 0 && (addPhotoIndex = coverNum - Math.abs(addPhotoIndex))

        currentCover[4].src = cover[addPhotoIndex].src

        currentCover[0].class = 'left'
        currentCover[1].class = 'middle'
        currentCover[2].class = 'right'
        currentCover[3].class = 'right-small'
        currentCover[4].class = 'left-small'
      }

      if (!prev) {
        ++this.currentMiddleIndex === coverNum && (this.currentMiddleIndex = 0)

        let addPhotoIndex = this.currentMiddleIndex + 2
        addPhotoIndex - coverNum >= 0 && (addPhotoIndex = 2 * coverNum - addPhotoIndex - 1)

        currentCover[0].src = cover[addPhotoIndex].src

        currentCover[0].class = 'right-small'
        currentCover[1].class = 'left-small'
        currentCover[2].class = 'left'
        currentCover[3].class = 'middle'
        currentCover[4].class = 'right'
      }
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
    box-shadow: 0 0 3px red;

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

    .left-small, .right-small {
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
      transition: 0.3s;
      cursor: pointer;
      .SBS(fade(@TC, 60));

      &:hover {
        .SBS(fade(@TC, 80));
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
  }
}
</style>

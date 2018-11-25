<template>
  <div :class="`photo-cover ${column >= imgs.length && 'one-row'}`" :ref="ref" @scroll="getScrollStatusDebounce">
    <div class="photo-column" :style="`max-width: ${width}px`" v-for="(col) in columns" :key="col">

      <div class="photo-item" @click="$emit('click', index)" v-for="(img, index) in imgs" :key="img.src" v-if="index % column === col">
        <img :src="img.src" />

        <div class="info" v-if="info" :title="img.title">
          <div class="border" />
          <div class="info-container">
            <div class="title">{{ img.album }}</div>
            <div class="describe">{{ img.describe }}</div>
          </div>
        </div>
      </div>

    </div>

    <div class="jm-top turn-to-top" title="turn to top" @click="turnToTop" v-if="turnToTopBtn"></div>
  </div>
</template>

<script>
export default {
  name: 'PhotoCover',
  props: ['imgs', 'column', 'width', 'info', 'fadeOverView'],
  data () {
    return {
      // scroll container ref
      ref: `photo-cover-${(new Date()).getTime()}`,
      // scroll container dom
      scrollContainer: '',
      // photo items dom
      photoItems: [],
      // columns index array
      columns: [],
      //  turn to top btn status
      turnToTopBtn: false
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { column, columns, $nextTick, calcVisibleCover } = this

      columns.push(...new Array(column).fill('').map((t, i) => i))

      $nextTick(calcVisibleCover)
    },
    /**
     * @description             calc visible cover in photo scroll container
     * @return     {undefined}  no return
     */
    calcVisibleCover () {
      const { fadeOverView } = this

      if (!this.scrollContainer) {
        const { ref, $refs, photoItems } = this

        this.scrollContainer = $refs[ref]

        photoItems.push(...Array.from(this.scrollContainer.getElementsByClassName('photo-item')))
      }

      if (fadeOverView === undefined || fadeOverView === false) return

      const { photoItems, scrollContainer: { scrollTop, clientHeight: containerHeight } } = this

      photoItems.forEach(p => {
        const { offsetTop, clientHeight } = p

        // overfolw
        if (scrollTop > offsetTop || offsetTop + clientHeight - scrollTop > containerHeight) {
          p.setAttribute('class', 'photo-item fade')
        } else {
          p.setAttribute('class', 'photo-item')
        }
      })
    },
    /**
     * @description             emit scroll event
     * @return     {undefined}  no return
     */
    emitScrollEvent () {
      const { scrollContainer: { scrollTop } } = this

      scrollTop === 0 ? this.turnToTopBtn = false : this.turnToTopBtn = true

      this.$emit('scroll', scrollTop)
    },
    /**
     * @description             get scroll status
     * @return     {undefined}  no return
     */
    getScrollStatus () {
      const { calcVisibleCover, emitScrollEvent } = this

      calcVisibleCover()

      emitScrollEvent()
    },
    /**
     * @description             debounce version of get scroll status
     * @return     {undefined}  no return
     */
    getScrollStatusDebounce () {
      const { getScrollStatusDebounceFun, debounce } = this

      if (!getScrollStatusDebounceFun) {
        this.getScrollStatusDebounceFun = debounce(100, this.getScrollStatus)

        this.getScrollStatusDebounceFun()
      } else {
        getScrollStatusDebounceFun()
      }
    },
    /**
     * @description             turn to top
     * @return     {undefined}  no return
     */
    turnToTop () {
      const { scrollContainer, turnToTop } = this

      const currentScrollTop = scrollContainer.scrollTop * 0.8

      scrollContainer.scrollTo(0, currentScrollTop < 5 ? 0 : currentScrollTop)

      if (currentScrollTop < 5) return

      requestAnimationFrame(turnToTop)
    }
  },
  mounted () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.photo-cover {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 100px;

  &.one-row {
    margin-top: -120px;
    align-items: center;
  }

  .photo-column {
    margin: 0px 5px;
    padding-top: 100px;

    .photo-item {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 15px;
      overflow: hidden;
      transition: opacity 1s;
      opacity: 0.9;
      cursor: pointer;
      .SBS(fade(@BSC, 60));

      &.fade {
        opacity: 0.2;
      }

      &:hover {
        opacity: 1;
        .SBS(fade(@BSC, 80));

        img {
          transform: scale(1.1);
        }

        .info {
          .border {
            border: 3px solid #fff;
            transform: scale(0.9);
          }

          .info-container {
            transform: scale(1.1);
          }
        }
      }

      img {
        width: 100%;
        border-radius: 15px;
        transform: scale(1);
        transition: all 0.3s;
      }

      .info {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;

        .border, .info-container {
          position: absolute;
          box-sizing: border-box;
          transition: all 0.3s;
        }

        .border {
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          border: 0px solid #fff;
          transform: scale(1);
        }

        .info-container {
          width: 100%;
          bottom: 40px;
          text-indent: 50px;
          color: #fff;
          font-family: ffSero;
          transform: scale(1);
          transition: all 0.3s;

          .title {
            height: 30px;
            line-height: 30px;
            font-size: @PCITFS;
          }

          .describe {
            height: 20px;
            line-height: 20px;
            font-size: @PCIDFS;
          }
        }
      }
    }
  }

  .turn-to-top {
    position: fixed;
    right: 30px;
    bottom: 20%;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    color: @TC;
    cursor: pointer;
    .SBS(fade(@BSC, 60));
    .STS(@TC);

    .hover {
      .SBS(fade(@BSC, 80));
    }
  }
}
</style>

<template>
  <div class="progress" :ref="pgsRef">
    <div class="current-progress" :style="`width: ${progress * 100}%;`" />
    <div class="change-progress-btn" :style="`left: ${progress * 100}%;`" @mousedown="changeProgressStart" />
  </div>
</template>

<script>
export default {
  name: 'Progress',
  data () {
    return {
      // progresser container ref
      pgsRef: `progresser-${(new Date()).getTime()}`,
      // progresser dom
      progresser: '',
      // progresser width
      allWidth: 0,
      // current progress
      // last drag x pos
      lastDragXPos: false
    }
  },
  props: ['progress'],
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no retrun
     */
    init () {
      const { pgsRef, $refs } = this

      this.progresser = $refs[pgsRef]

      this.allWidth = this.progresser.clientWidth
    },
    /**
     * @description             change progress start
     * @return     {undefined}  no return
     */
    changeProgressStart ({ pageX }) {
      this.lastDragXPos = pageX

      const { changeProgress, changeProgressEnd } = this

      document.addEventListener('mousemove', changeProgress)

      document.addEventListener('mouseup', changeProgressEnd)
    },
    /**
     * @description             change progress
     * @return     {undefined}  no return
     */
    changeProgress ({ pageX }) {
      if (!pageX) return

      const { lastDragXPos, allWidth, progress } = this

      const addValue = (pageX - lastDragXPos) / allWidth

      const currentProgress = progress + addValue

      currentProgress > 1 && (this.progress = 1)
      currentProgress < 0 && (this.progress = 0)

      this.lastDragXPos = pageX

      this.$emit('change', currentProgress)
    },
    changeProgressEnd () {
      this.lastDragXPos = false

      const { changeProgress, changeProgressEnd } = this

      document.removeEventListener('mousemove', changeProgress)

      document.removeEventListener('mouseup', changeProgressEnd)
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

.progress {
  position: relative;
  width: 100%;
  height: 3px;
  .SBS(fade(@BSC, 60));

  .current-progress {
    position: absolute;
    width: 300px;
    height: 3px;
    top: 0px;
    left: 0px;
    background: linear-gradient(to right, #6ed4d3, #f5738f, #4bb7e4);
  }

  .change-progress-btn {
    position: absolute;
    box-sizing: border-box;
    height: 17px;
    width: 17px;
    top: -7px;
    left: 300px;
    border-radius: 50%;
    background-color: @STHC;
    border: 3px solid @STC;
    cursor: pointer;
    transform: translate(-50%);
  }
}
</style>

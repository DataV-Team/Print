<template>
  <div :class="`video-cover ${covers.length <= 3 && 'one-line'}`" :ref="ref" @scroll="emitScrollEventDebounce">
    <div :class="`cover-container ${covers.length <= 3 && 'one-line'}`">
      <div class="cover-item" v-for="(cover, index) in covers" :key="`cover.coverSrc${index}`" @click="$emit('click', index)">
        <div class="img-container"><img :src="cover.coverSrc"></div>
        <div class="info">{{ cover.album }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCover',
  props: ['covers'],
  data () {
    return {
      // video cover ref
      ref: `video-cover-${(new Date()).getTime()}`,
      // video cover dom
      videoCover: ''
    }
  },
  methods: {
    /**
     * @description             emit scroll event
     * @return     {undefined}  no return
     */
    emitScrollEvent () {
      if (!this.videoCover) {
        const { $refs, ref } = this

        this.videoCover = $refs[ref]
      }

      const { videoCover: { scrollTop } } = this

      this.$emit('scroll', scrollTop)
    },
    /**
     * @description             debounce version of emit scroll event
     * @return     {undefined}  no return
     */
    emitScrollEventDebounce () {
      const { debounce, emitScrollEvent, emitScrollEventDebounceFun } = this

      if (!emitScrollEventDebounceFun) {
        this.emitScrollEventDebounceFun = debounce(100, emitScrollEvent)

        this.emitScrollEventDebounceFun()
      } else {
        emitScrollEventDebounceFun()
      }
    }
  }
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.video-cover {
  width: 100%;
  height: 100%;
  overflow: scroll;

  &.one-line {
    display: flex;
    align-items: center;

    .cover-container {
      margin-top: -100px;
    }
  }

  .cover-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 100px calc(~"(100% - 1230px) / 2");

    &.one-line {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: auto;
    }

    .cover-item {
      width: 400px;
      height: 255px;
      float: left;
      cursor: pointer;
      overflow: hidden;
      margin: 0px 5px 10px 5px;
      .SBS(fade(@BSC, 60));

      &:hover {
        img {
          transform: scale(1.1);
        }
      }

      .img-container {
        overflow: hidden;
        width: 400px;
        height: 225px;
      }

      img {
        width: 100%;
        height: 100%;
        transform: scale(1);
        transition: all 0.3s;
      }

      .info {
        height: 30px;
        line-height: 30px;
        text-indent: 20px;
        line-height: 30px;
        color: @TC;
        .STS(@TC);
      }
    }
  }
}
</style>

<template>
  <div class="video-cover">
    <div :class="`cover-container ${covers.length <= 3 && 'one-line'}`">
      <div class="cover-item" v-for="cover in covers" :key="cover.coverSrc">
        <div class="img-container"><img src="/API/assets/temp/videoCover/1.jpg"></div>
        <div class="info">Cover ZH</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoCover',
  props: ['covers'],
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.video-cover {
  width: 100%;
  height: 100%;
  overflow: scroll;

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

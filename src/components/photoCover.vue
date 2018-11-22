<template>
  <div :class="`photo-cover ${column >= imgs.length && 'one-row'}`">
    <div class="photo-column" :style="`max-width: ${width}px`" v-for="(col) in columns" :key="col">

      <div class="photo-item" v-for="(img, index) in imgs" :key="img.src" v-if="index % column === col">
        <img :src="img.src" />
        <div class="info">
          <div class="border" />
          <div class="info-container">
            <div class="title">Title title</div>
            <div class="describe">describe describe</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PhotoCover',
  props: ['imgs', 'column', 'width'],
  data () {
    return {
      columns: []
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { column, columns } = this

      columns.push(...new Array(column).fill('').map((t, i) => i))
    }
  },
  created () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
@import url('../assets/style/index.less');

.photo-cover {
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
      cursor: pointer;
      .SBS(fade(@BSC, 60));

      &:hover {
        img {
          transform: scale(1.1);
        }

        .info {
          .border {
            border: 3px solid #fff;
            transform: scale(0.9);
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
          bottom: 30px;
          text-indent: 40px;
          background-color: #fff;

          .title {
            font-size: @PCITFS;
          }
        }
      }
    }
  }
}
</style>

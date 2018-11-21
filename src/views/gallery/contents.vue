<template>
  <div id="gallery-contents">
    <div :class="`gallery-scroll-container ${contents.length <= 4 && 'less-four'}`" ref="gallery-scroll-container" @scroll="calcVisibleCoverDebounce">
      <div class="column" v-for="column in columns" :key="column">

        <div class="album" v-for="(album, index) in contents" :key="index" v-if="index % 4 === column">
          <img :src="album.coverSrc" />
          <div class="info">
            <div class="info-container">
              <div class="name">{{ album.name }}</div>
              <div class="describe">{{ album.describe }}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryContents',
  data () {
    return {
      // album contents
      contents: [
        {
          name: 'Album1',
          coverSrc: '/API/assets/temp/pcontents/1.jpg',
          describe: 'This is album 1'
        },
        {
          name: 'Album2',
          coverSrc: '/API/assets/temp/pcontents/2.jpg',
          describe: 'This is album 2'
        },
        {
          name: 'Album3',
          coverSrc: '/API/assets/temp/pcontents/3.jpg',
          describe: 'This is album 3'
        },
        {
          name: 'Album4',
          coverSrc: '/API/assets/temp/pcontents/4.jpg',
          describe: 'This is album 4'
        },
        {
          name: 'Album5',
          coverSrc: '/API/assets/temp/pcontents/5.jpg',
          describe: 'This is album 5'
        },
        {
          name: 'Album6',
          coverSrc: '/API/assets/temp/pcontents/6.jpg',
          describe: 'This is album 6'
        },
        {
          name: 'Album7',
          coverSrc: '/API/assets/temp/pcontents/7.jpg',
          describe: 'This is album 7'
        },
        {
          name: 'Album8',
          coverSrc: '/API/assets/temp/pcontents/8.jpg',
          describe: 'This is album 8'
        },
        {
          name: 'Album9',
          coverSrc: '/API/assets/temp/pcontents/9.jpg',
          describe: 'This is album 9'
        },
        {
          name: 'Album10',
          coverSrc: '/API/assets/temp/pcontents/10.jpg',
          describe: 'This is album 10'
        }
      ],
      // column
      columns: [],
      // calc visible cover debounce fun
      calcVisibleCoverDebounceFun: '',
      // all album dom
      albums: '',
      // gallery scroll container dom
      galleryScrollContainer: ''
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { contents: { length }, columns, calcVisibleCover } = this

      columns.push(...new Array(length < 4 ? length : 4).fill('').map((t, i) => i))

      calcVisibleCover()
    },
    /**
     * @description             calc visible cover in gallery scroll container
     * @return     {undefined}  no return
     */
    calcVisibleCover () {
      if (!this.albums) {
        this.albums = Array.from(document.getElementsByClassName('album'))
        this.galleryScrollContainer = this.$refs['gallery-scroll-container']
      }

      const { albums, galleryScrollContainer: { scrollTop, clientHeight: containerHeight } } = this

      albums.forEach(a => {
        const { offsetTop, clientHeight } = a

        // overfolw
        if (scrollTop > offsetTop || offsetTop + clientHeight - scrollTop > containerHeight) {
          a.setAttribute('class', 'album')
        } else {
          a.setAttribute('class', 'album current')
        }
      })
    },
    /**
     * @description             debounce version of calc visible cover fun
     * @return     {undefined}  no return
     */
    calcVisibleCoverDebounce () {
      const { calcVisibleCoverDebounceFun, debounce } = this

      if (!calcVisibleCoverDebounceFun) {
        this.calcVisibleCoverDebounceFun = debounce(200, this.calcVisibleCover)

        this.calcVisibleCoverDebounceFun()
      } else {
        calcVisibleCoverDebounceFun()
      }
    }
  },
  mounted () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#gallery-contents {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;

  .gallery-scroll-container {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: 0 100px 100px 100px;

    &.less-four {
      align-items: center;
    }
  }

  .column {
    position: relative;
    flex: 1;
    margin: 0 10px;
    max-width: 300px;
    padding: 100px 0px;
  }

  .album {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 15px;
    opacity: 0.15;
    transition: all 1s;
    overflow: hidden;
    cursor: pointer;
    .SBS(fade(@BSC, 60));

    &.current {
      opacity: 1;
    }

    &:hover {
      .SBS(fade(@BSC, 80));
      opacity: 1;

      img {
        opacity: 1;
        transform: scale(1.1);
      }

      .info {
        border: 3px solid #fff;
        transform: translate(-50%, -50%) scale(0.9);

        .info-container {
          background-color: @GCIBC;
        }
      }
    }

    img {
      width: 100%;
      border-radius: 15px;
      transform: scale(1);
      transition: all 0.3s;
      opacity: 0.8;
      cursor: pointer;
    }

    .info {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border: 1px solid #fff;
      transform: translate(-50%, -50%) scale(1);
      transition: all 0.3s;
      color: #fff;

      .info-container {
        position: absolute;
        width: 100%;
        bottom: 30px;
      }

      .name, .describe {
        text-indent: 40px;
      }

      .name {
        height: 40px;
        font-size: @GCNFS;
        line-height: 40px;
        font-weight: bold;
      }

      .describe {
        height: 30px;
        font-size: @GCDFS;
        line-height: 30px;
      }
    }
  }
}
</style>

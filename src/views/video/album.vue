<template>
  <div id="video-album">
    <video-cover :class="{ fade: palyVideoIndex !== false}" :covers="contents" @scroll="setFadeHeader" @click="turnToVideo" />

    <video-player
      :class="{ fade: palyVideoIndex === false }"
      :resource="contents[palyVideoIndex]"
      :autoplay="false"
      :volume="volume"
      :currentTime="videoCurrentTime"
      @volumeChange="setCurrentVolume"
      @playing="setCurrentTime" />

    <template v-if="palyVideoIndex !== false">
      <i class="jm-left video-player-control" v-if="contents.length > 1" @click="nextOrPrev(true)" />
      <i class="jm-right video-player-control" v-if="contents.length > 1" @click="nextOrPrev(false)" />
      <i class="jm-fork video-player-control" @click="$router.go(-1)" />
    </template>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'VideoAlbum',
  props: ['album'],
  data () {
    return {
      // all video contents
      contents: [
        {
          album: '第1集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第2集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第3集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第4集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第5集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第6集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第7集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第8集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第9集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第10集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          Album: '第11集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第12集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第13集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        }
      ],
      //  current play video index
      palyVideoIndex: false,
      // video current time
      videoCurrentTime: 100,
      // video volume
      volume: 0.5,
      // bgm status cach
      bgmStatusCache: {
        bgmStatus: '',
        musicAudio: ''
      },
      // video play's video
      video: ''
    }
  },
  watch: {
    '$route' ({ params: { album } }) {
      const { tryTurnToVideo } = this

      tryTurnToVideo(album)
    }
  },
  computed: {
    ...mapState(['bgmStatus', 'musicAudio'])
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    async init () {
      const { getAlbumData, tryTurnToVideo, cachBgmStatus, cacheVideo } = this

      cacheVideo()

      cachBgmStatus()

      await getAlbumData()

      tryTurnToVideo()
    },
    /**
     * @description             cache video play's video
     * @return     {undefined}  no return
     */
    cacheVideo () {
      const { $nextTick } = this

      $nextTick(e => {
        this.video = this.$children[1].video
      })
    },
    /**
     * @description             cache bgm status
     * @return     {undefined}  no return
     */
    cachBgmStatus () {
      const { $nextTick, bgmStatus, musicAudio, bgmStatusCache } = this

      $nextTick(e => {
        bgmStatusCache.bgmStatus = bgmStatus
        bgmStatusCache.musicAudio = musicAudio
      })
    },
    /**
     * @description             recover bgm status
     * @return     {undefined}  no return
     */
    recoverBgmStatus () {
      const { setMusicAudio, setBgmStatus, bgmStatusCache: { bgmStatus, musicAudio } } = this

      setMusicAudio(musicAudio)
      setBgmStatus(bgmStatus)
    },
    /**
     * @description           get album data
     * @return     {promise}  async promise
     */
    async getAlbumData () {
    },
    /**
     * @description             try turn to video when come in this route
     * @return     {undefined}  no return
     */
    tryTurnToVideo (album) {
      album = album || this.album

      const { contents: { length }, setVideoMedia, recoverBgmStatus } = this

      let currentVideo = album.split('-')

      if (!currentVideo[1]) {
        this.palyVideoIndex = false

        recoverBgmStatus()

        return
      }

      const index = parseInt(currentVideo[1]) - 1

      if (index < length) this.palyVideoIndex = index

      setVideoMedia()
    },
    /**
     * @description             set video media
     * @return     {undefined}  no return
     */
    setVideoMedia () {
      const { setBgmStatus, setMusicAudio, video } = this

      setBgmStatus(false)
      setMusicAudio(video)
    },
    /**
     * @description             turn to video
     * @return     {undefined}  no return
     */
    turnToVideo (index) {
      const { album, $router, setVideoMedia } = this

      this.palyVideoIndex = index

      $router.push(`/home/video/${album}-${index + 1}`)

      setVideoMedia()
    },
    /**
     * @description             set current video current time
     * @return     {undefined}  no return
     */
    setCurrentTime (time) {
      this.videoCurrentTime = time
    },
    /**
     * @description             set current volume
     * @return     {undefined}  no return
     */
    setCurrentVolume (volume) {
      this.volume = volume
    },
    /**
     * @description             next or prev video
     * @return     {undefined}  no return
     */
    nextOrPrev (prev = false) {
      const { contents: { length }, palyVideoIndex, $router } = this

      if (!length) return

      let index = palyVideoIndex

      prev && ((palyVideoIndex - 1) < 0 ? index = length - 1 : index--)
      !prev && ((palyVideoIndex + 1) === length ? index = 0 : index++)

      $router.replace(`/home/video/${this.album.split('-')[0]}-${++index}`)
    },
    ...mapMutations(['setFadeHeader', 'setMusicAudio', 'setBgmStatus'])
  },
  mounted () {
    const { init } = this

    init()
  },
  destroyed () {
    const { recoverBgmStatus } = this

    recoverBgmStatus()
  }
}
</script>

<style lang="less">
@import url('../../assets/style/index.less');

#video-album {
  position: relative;
  width: 100%;
  height: 100%;

  .fade {
    visibility: hidden;
    opacity: 0;
  }

  .video-player {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .video-cover {
    transition: all 0.3s;
  }

  .video-player-control {
    position: absolute;
    color: @TC;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .STS(@TC);
  }

  .jm-fork, .jm-left, .jm-right {
    cursor: pointer;
  }

  .jm-fork {
    margin-top: -310px;
    margin-left: 550px;
    font-size: @VAVCFFS;
  }

  .jm-left, .jm-right {
    font-size: @VAVCTIFS;
    margin-top: -50px;
  }

  .jm-left {
    margin-left: -550px;
  }

  .jm-right {
    margin-left: 550px;
  }
}
</style>

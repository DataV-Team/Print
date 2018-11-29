<template>
  <div id="video-album">
    <video-cover :class="{ fade: palyVideoIndex !== false}" :covers="contents" @scroll="setFadeHeader" @click="turnToVideo" />

    <video-player
      v-show="palyVideoIndex !== false"
      :resource="contents[palyVideoIndex]"
      :autoplay="false"
      :volume="volume"
      :currentTime="videoCurrentTime"
      @volumeChange="setCurrentVolume"
      @playing="setCurrentTime" />
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
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          Album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
          coverSrc: '/API/assets/temp/videoCover/2.jpg',
          videoSrc: '/API/assets/temp/video/1.mp4'
        },
        {
          album: '第一集',
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
    init () {
      const { cachBgmStatus, getAlbumData, tryTurnToVideo } = this

      cachBgmStatus()

      getAlbumData()

      tryTurnToVideo()
    },
    /**
     * @description             cache bgm status
     * @return     {undefined}  no return
     */
    cachBgmStatus () {
      const { bgmStatus, musicAudio, bgmStatusCache } = this

      bgmStatusCache.bgmStatus = bgmStatus
      bgmStatusCache.musicAudio = musicAudio
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
     * @description             try turn to video when come in this route
     * @return     {undefined}  no return
     */
    tryTurnToVideo (album) {
      album = album || this.album

      const { contents: { length } } = this

      let currentVideo = album.split('-')

      if (!currentVideo[1]) {
        this.palyVideoIndex = false

        return
      }

      const index = parseInt(currentVideo[1]) - 1

      if (index < length) this.palyVideoIndex = index
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
     * @description           get album data
     * @return     {promise}  async promise
     */
    async getAlbumData () {
    },
    /**
     * @description             turn to video
     * @return     {undefined}  no return
     */
    turnToVideo (index) {
      const { album, $router, setBgmStatus, setMusicAudio, video } = this

      this.palyVideoIndex = index

      this.videoCurrentTime = 0

      $router.push(`/home/video/${album}-${index + 1}`)

      setBgmStatus(false)
      setMusicAudio(video)
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
    ...mapMutations(['setFadeHeader', 'setMusicAudio', 'setBgmStatus'])
  },
  created () {
    const { init } = this

    init()
  },
  mounted () {
    const { cacheVideo } = this

    cacheVideo()
  },
  destroyed () {
    const { recoverBgmStatus } = this

    recoverBgmStatus()
  }
}
</script>

<style lang="less">
#video-album {
  width: 100%;
  height: 100%;

  .fade {
    opacity: 0;
  }

  .video-cover {
    transition: all 0.3s;
  }
}
</style>

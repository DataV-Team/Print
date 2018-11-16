<template>
  <div id="song-ctl">
    <audio class="song-audio" ref="song-audio" :src="songList[currentSongIndex] && songList[currentSongIndex].src"
      :loop="playType[playTypeIndex]['typeName'] === 'singleLoop'" :autoplay="playStatus" @ended="autoNextSong" />

    <div class="control">
      <i class="jm-prev" @click="playType[playTypeIndex]['typeName'] === 'random' ? randomSong(true) : nextOrPrev(true)" />
      <i :class="playStatus ? 'jm-pause' : 'jm-play'" @click="songList[currentSongIndex] && playOrPause()" />
      <i class="jm-next" @click="playType[playTypeIndex]['typeName'] === 'random' ? randomSong(true) : nextOrPrev()" />
    </div>

    <div :class="`current-song ${!songList.length && 'disabled'}`" @click="songList[currentSongIndex] && playOrPause()" :title="songList[currentSongIndex] && songList[currentSongIndex].artist">
      {{ songList[currentSongIndex] ? songList[currentSongIndex].name : 'No Song' }}
    </div>

    <div class="action-container">
      <div class="volume">
        <div class="progress" ref="volume-progress">
          <span :class="`jm-${volume < 0.05 ? 'mute' : (volume < 0.3 ? 'volume-low' : (volume > 0.7 ? 'volume-hight' : 'volume-middle'))}`" ref="volume-btn" :style="`left: calc(${volume * 100}% - 15px)`" />
        </div>
      </div>

      <div class="song-list">
        <template v-if="songList.length">
          <div :class="`song-item ${currentSongIndex === index && 'current'}`"
            v-for="(song, index) in songList"
            :key="`${song.name}-${song.artist}`"
            :title="song.artist"
            @click="(playStatus = true) && (currentSongIndex = index)">
            <i class="jm-music" v-if="currentSongIndex === index" />{{ song.name }}
          </div>

          <div class="song-item"
            @click="changePlayType"
            :title="playType[playTypeIndex]['title']">
            <i :class="playType[playTypeIndex]['class']" />
          </div>
        </template>

        <template v-else>
          <div class="song-item disabled">No Song List</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SongCtl',
  data () {
    return {
      // song audio dom
      songAudio: '',
      // volume btn dom
      volumeBtn: '',
      // play status
      playStatus: true,
      // song list
      songList: [
        {
          name: '一生有你',
          artist: 'Remix',
          src: '/API/assets/1.MP3'
        },
        {
          name: '追光者',
          artist: '岑宁儿',
          src: '/API/assets/3.mp3'
        },
        {
          name: '马冬梅',
          artist: 'unkown',
          src: '/API/assets/2.mp3'
        }
      ],
      // current song
      currentSongIndex: '',
      // play type    loop | singleLoop | random
      playType: [
        {
          typeName: 'loop',
          class: 'jm-loop',
          title: 'All Loop'
        },
        {
          typeName: 'singleLoop',
          class: 'jm-singleLoop',
          title: 'Single Loop'
        },
        {
          typeName: 'random',
          class: 'jm-random',
          title: 'random'
        }
      ],
      //  current play type index
      playTypeIndex: 0,
      // song volume
      volume: 0.3,
      // volume progress width
      volumeProgressWidth: ''
    }
  },
  watch: {
    playStatus () {
      const { setLocalSongConfig } = this

      setLocalSongConfig()
    }
  },
  methods: {
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { getLocalSongConfig, initDom, initVolumeSetExtend, initCurrentSong } = this

      getLocalSongConfig()

      initDom()

      initVolumeSetExtend()

      initCurrentSong()
    },
    /**
     * @description             init dom
     * @return     {undefined}  no return
     */
    initDom () {
      const { $refs, volume, setMusicAudio } = this

      this.songAudio = $refs['song-audio']

      this.volumeBtn = $refs['volume-btn']

      this.volumeProgressWidth = $refs['volume-progress'].clientWidth

      this.songAudio.volume = volume

      setMusicAudio(this.songAudio)
    },
    /**
     * @description             init volume set extend
     * @return     {undefined}  no return
     */
    initVolumeSetExtend () {
      const { volumeBtn, setVolume, endSetVolume } = this

      volumeBtn.addEventListener('mousedown', e => {
        document.addEventListener('mousemove', setVolume)

        document.addEventListener('mouseup', endSetVolume)
      })
    },
    /**
     * @description             play or pause song
     * @return     {undefined}  no retrun
     */
    playOrPause () {
      const { playStatus, songAudio } = this

      playStatus && songAudio.pause()
      !playStatus && songAudio.play()

      this.playStatus = !playStatus
    },
    /**
     * @description             set volume
     * @return     {undefined}  no retrun
     */
    setVolume ({ movementX }) {
      const { volumeProgressWidth, volume, songAudio } = this

      const percent = movementX / volumeProgressWidth

      const currentVolume = volume + percent

      currentVolume > 0 && currentVolume < 1 && (this.volume += percent)

      songAudio.volume = this.volume
    },
    /**
     * @description             end set volume
     * @return     {undefined}  no return
     */
    endSetVolume () {
      const { setVolume, endSetVolume, setLocalSongConfig } = this

      document.removeEventListener('mousemove', setVolume)
      document.removeEventListener('mouseup', endSetVolume)

      setLocalSongConfig()
    },
    /**
     * @description             init current song
     * @return     {undefined}  no return
     */
    initCurrentSong () {
      const { playTypeIndex, playType, songList, randomSong } = this

      if (!songList.length) {
        this.playStatus = false

        return
      }

      playType[playTypeIndex]['typeName'] === 'random' ? randomSong() : (this.currentSongIndex = 0)
    },
    /**
     * @description             random song
     * @return     {undefined}  no return
     */
    randomSong (forcePlay = false) {
      const { currentSongIndex, songList, randomSong } = this

      this.currentSongIndex = parseInt(Math.random() * songList.length)

      currentSongIndex === this.currentSongIndex && randomSong()

      forcePlay && (this.playStatus = true)
    },
    /**
     * @description             change song play type
     * @return     {undefined}  no return
     */
    changePlayType () {
      const { playTypeIndex, playType, setLocalSongConfig } = this

      ;(playTypeIndex + 1) === playType.length ? this.playTypeIndex = 0 : this.playTypeIndex++

      setLocalSongConfig()
    },
    /**
     * @description             set next song
     * @return     {undefined}  no return
     */
    autoNextSong () {
      const { songList, playType, playTypeIndex, randomSong, nextOrPrev } = this

      this.playStatus = false

      if (!songList.length) return

      const currentPlayType = playType[playTypeIndex]['typeName']

      currentPlayType === 'random' && randomSong()

      currentPlayType === 'loop' && nextOrPrev()

      this.playStatus = true
    },
    /**
     * @description             next or prev song
     * @return     {undefined}  no return
     */
    nextOrPrev (prev = false) {
      const { currentSongIndex, songList } = this

      this.playStatus = false

      if (!songList.length) return

      prev && ((currentSongIndex - 1) < 0 ? this.currentSongIndex = songList.length - 1 : this.currentSongIndex--)
      !prev && ((currentSongIndex + 1) === songList.length ? this.currentSongIndex = 0 : this.currentSongIndex++)

      this.playStatus = true
    },
    /**
     * @description             get local song config, volume play status
     * @return     {undefined}  no return
     */
    getLocalSongConfig () {
      const volume = localStorage.getItem('volume')
      const playTypeIndex = localStorage.getItem('playTypeIndex')
      const playStatus = localStorage.getItem('playStatus')

      volume && (this.volume = parseFloat(volume))
      playTypeIndex && (this.playTypeIndex = parseInt(playTypeIndex))
      playStatus === 'false' && (this.playStatus = false)
    },
    /**
     * @description             set local song config, volume play status
     * @return     {undefined}  no return
     */
    setLocalSongConfig () {
      const { volume, playTypeIndex, playStatus } = this

      localStorage.setItem('volume', volume)
      localStorage.setItem('playTypeIndex', playTypeIndex)
      localStorage.setItem('playStatus', playStatus)
    },
    ...mapMutations(['setMusicAudio'])
  },
  mounted () {
    const { init } = this

    init()
  }
}
</script>

<style lang="less">
@import url('../../../assets/style/index.less');

#song-ctl {
  width: 150px;
  height: 70px;
  color: @TC;
  font-size: @SCTLFS;

  &:hover {
    .current-song, .action-container .song-list {
      .hover;
    }

    .action-container {
      visibility: visible;
    }
  }

  .hover {
    .SBS(fade(@BSC, 80));
  }

  .active (@color: @TC) {
    &:active {
      color: @color;
    }
  }

  .disabled {
    color: fade(@TC, 30);
    text-shadow: 0 0 0px !important;
    cursor: default !important;

    &:hover {
      color: fade(@TC, 30) !important;
    }

    &:active {
      color: fade(@TC, 30) !important;
    }
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .song-audio {
    position: absolute;
    visibility: hidden;
  }

  .control {
    width: 150px;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    line-height: 30px;

    i {
      font-size: @SCTLIFS;
      cursor: pointer;
      .STS(@TC);
      .active;
    }
  }

  .current-song {
    height: 25px;
    line-height: 25px;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 0 3px red;
    cursor: pointer;
    .STS(@TC);
    .SBS(fade(@BSC, 60));
    .active;
    .ellipsis;
  }

  .action-container {
    position: relative;
    visibility: hidden;
    .volume {
      height: 30px;
      display: flex;
      align-items: center;

      .progress {
        flex: 1;
        height: 4px;
        border-radius: 2px;
        background-color: fade(@TC, 60);
        position: relative;
        .SBS(@TC);

        span {
          position: absolute;
          display: block;
          width: 15px;
          height: 15px;
          top: -6px;
          text-align: center;
          cursor: pointer;
          .STS(@TC);
        }
      }
    }

    .song-list {
      border-radius: 15px;
      overflow: hidden;
      .SBS(fade(@BSC, 60));

      .song-item {
        position: relative;
        height: 25px;
        text-align: center;
        line-height: 25px;
        cursor: pointer;
        .ellipsis;
        .active(#fff);

        &:hover {
          .hover;
        }

        &.current {
          .SBS(fade(@BSC, 80));
        }

        .jm-music {
          position: absolute;
          left: 5px;
          color: #fff;
          .STS(@TC);
        }
      }
    }
  }
}
</style>

<template>
  <div id="song-ctl">
    <audio class="song-audio" ref="song-audio" :src="currentSong && currentSong.src"
      :loop="playType[playTypeIndex] === 'singleLoop'" autoplay />

    <div class="control">
      <i class="jm-prev" />
      <i :class="playStatus ? 'jm-pause' : 'jm-play'" @click="playStatus = !playStatus" />
      <i class="jm-next" />
    </div>

    <div class="current-song" @click="playStatus = !playStatus" :title="currentSong && currentSong.artist">
      {{ currentSong ? currentSong.name : 'No Song' }}
    </div>

    <div class="action-container">
      <div class="volume">
        <div class="progress" ref="volume-progress">
          <span class="jm-music" ref="volume-btn" :style="`left: calc(${volume * 100}% - 15px)`" />
        </div>
      </div>

      <div class="song-list">
        <template v-if="songList.length">
          <div class="song-item"
            v-for="song in songList"
            :key="`${song.name}-${song.artist}`"
            :title="song.artist"
            @click="currentSong = song">
            {{ song.name }}
          </div>

          <div class="song-item"
            @click="(playTypeIndex + 1) === playType.length ? (playTypeIndex = 0) : (playTypeIndex++)">
            <i :class="playType[playTypeIndex]['class']" />
          </div>
        </template>

        <template v-else>
          <div class="song-item">No Song List</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongCtl',
  data () {
    return {
      // song audio dom
      songAudio: '',
      // volume btn dom
      volumeBtn: '',
      // play status
      playStatus: false,
      // song list
      songList: [
        {
          name: 'Good Life',
          artist: 'WeiZKliF',
          src: 'http://test.jiaminghi.com/songs/good life.mp3'
        },
        {
          name: '追光者',
          artist: '岑宁儿',
          src: 'http://test.jiaminghi.com/songs/追光者.mp3'
        },
        {
          name: 'I wanted you',
          artist: 'starts',
          src: 'http://test.jiaminghi.com/songs/I wanted you.mp3'
        }
      ],
      // current song
      currentSong: '',
      // play type    loop | singleLoop | random
      playType: [
        {
          typeName: 'loop',
          class: 'jm-loop',
          title: 'All Loop'
        },
        {
          typeName: 'SingleLoop',
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
  methods: {
    /**
     * @description             start play music
     * @return     {undefined}  no return
     */
    start () {
      const { init } = this

      init()
    },
    /**
     * @description             init
     * @return     {undefined}  no return
     */
    init () {
      const { $refs, volume } = this

      const { initVolumeSetExtend } = this

      this.songAudio = $refs['song-audio']

      this.volumeBtn = $refs['volume-btn']

      this.volumeProgressWidth = $refs['volume-progress'].clientWidth

      // init volume
      this.songAudio.volume = volume

      initVolumeSetExtend()
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
      const { setVolume, endSetVolume } = this

      document.removeEventListener('mousemove', setVolume)
      document.removeEventListener('mouseup', endSetVolume)
    }
  },
  mounted () {
    const { start } = this

    start()
  }
}
</script>

<style lang="less">
@import url('../../../assets/style/index.less');

#song-ctl {
  color: @TC;

  &:hover {
    .current-song {
      .SBS(fade(@BSC, 80));
    }

    .action-container {
      display: block;

      .song-list {
        .SBS(fade(@BSC, 80));
      }
    }
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
      font-size: @SCTLFS;
      cursor: pointer;
      .STS(@TC);

      &:active {
        color: @TC;
      }
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

    &:active {
      color: @TC;
    }
  }

  .action-container {
    position: relative;
    // display: none;
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
        height: 25px;
        text-align: center;
        line-height: 25px;
        cursor: pointer;

        &:hover {
          .SBS(fade(@BSC, 80));
        }

        &:active {
          color: #fff;
        }
      }
    }
  }
}
</style>

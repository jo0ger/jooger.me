<template>
  <div class="music-pane" :class="{ show: showMusic }">
    <div class="wrapper" v-if="song">
      <div class="music">
        <div class="cover">
          <img :src="cover" alt="">
        </div>
        <div class="info">
          <div class="title">
            <a :href="`https://music.163.com/#/song?id=${song.id}`" target="_blank" class="song-name">
              {{ song.name }}
            </a>
            <span> - </span>
            <template v-for="(at, index) in song.artists">
              <span :key="at.id" v-if="index !== 0"> / </span>
              <a :href="`https://music.163.com/#/artist?id=${at.id}`" target="_blank" class="artist-name" :key="at.id">
                {{ at.name }}
              </a>
            </template>
          </div>
          <div class="length">
            <div class="position">02:55</div>
            <div class="progress">
              <div class="bar">
                <div class="played">
                  <div class="dot"></div>
                </div>
              </div>
            </div>
            <div class="duration">04:52</div>
          </div>
        </div>
      </div>
      <div class="controls">
        <a class="control-item prev">
          <i class="iconfont icon-prev-song"></i>
        </a>
        <a class="control-item play">
          <i class="iconfont icon-play"></i>
        </a>
        <a class="control-item next">
          <i class="iconfont icon-next-song"></i>
        </a>
      </div>
      <div class="extra">
        <a class="extra-item" @click.prevent.stop="handleToggleSingleCycle" :title="singleCycle ? '单曲循环' : '列表循环'">
          <i class="iconfont" :class="[`icon${singleCycle ? '-single' : ''}-cycle`]"></i>
        </a>
        <div class="extra-item volume">
          <a class="trigger" @click.prevent.stop="handleToggleVolume">
            <i class="iconfont" :class="[`icon-volume-${volume === 0 ? 'off' : 'on'}`]"></i>
          </a>
          <div class="volume-control">
            <div class="value">
              <div class="dot"></div>
            </div>
          </div>
        </div>
        <a class="extra-item song-list">
          <i class="iconfont icon-song-list"></i>
          <span class="count">{{ musicList.length }}</span>
        </a>
      </div>
    </div>
    <div class="fixed-bar">
      <div class="played"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Howl, Howler } from 'howler'
  import { requestAnimationFrame } from '~/utils'

  export default {
    name: 'Layout-Music',
    data () {
      return {
        sound: null,
        playlist: [],
        index: 0,
        ready: false,
        playing: false,
        volume: 0.6,
        progress: 0,
        wave: false,
        showLyric: false,
        activeLyricIndex: -1,
        singleCycle: false,
        coverStyle: null
      }
    },
    computed: {
      ...mapGetters({
        showMusic: 'app/showMusic',
        option: 'option/option',
        musicList: 'music/list'
      }),
      song () {
        return this.playlist[this.index] || null
      },
      cover () {
        return this.song ? this.song.album.cover + '?param=300y300' : ''
      },
      lyrics () {
        if (!this.song || !this.song.lyric) {
          return []
        }
        return this.song.lyric.split('\n').filter(ly => !!ly).map(ly => {
          const tmp = lyReg.exec(ly)
          const time = this.parseTime(tmp[1])
          if (time) {
            return {
              time: this.parseTime(tmp[1]),
              text: tmp[2]
            }
          }
          return null
        }).filter(lyric => !!lyric)
      },
      playedTimeFromSeconds () {
        return this.song.duration / 1000 * (this.progress / 100)
      },
      playedTime () {
        return this.formatTime(Math.floor(this.usedTimeFromSeconds))
      },
      duration () {
        return this.formatTime(Math.floor(this.song.duration / 1000))
      }
    },
    mounted () {
      this.fetchMusicList().then(() => {
        this.$nextTick(() => {
          this.initPlaylist()
          this.play()
          this.initCoverStyle()
        })
      })
    },
    methods: {
      fetchMusicList () {
        return this.$store.dispatch('music/fetchList')
      },
      initPlaylist () {
        this.playlist = this.musicList.map(song => {
          if (!song || !song.src) {
            return null
          }
          return {
            howl: null,
            ...song
          }
        }).filter(song => !!song)
      },
      initCoverStyle () {
        const $cover = this.$refs.cover
        if (!$cover) {
          return
        }
        const w = $cover.clientWidth
        const h = $cover.clientHeight
        const min = Math.min(w, h)
        this.coverStyle = {
          width: `${min * .9}px`,
          height: `${min * .9}px`,
        }
      },
      getHowl (song) {
        return new Howl({
          loop: false,
          html5: true,
          autoplay: false,
          volume: this.volume,
          src: [song.src],
          onload: () => {
            console.log(song.name + ' --- load')
            this.ready = true
            this.wave = false
            this.progress = 0
            this._setPlaying(false)
          },
          onloaderror: (id, err) => {
            console.log(song.name + ' --- load error')
            // this._error(song)
          },
          onplay: () => {
            console.log(song.name + ' --- play')
            this.wave = true
            this.progress = 0
            this.ready = true
            this._setPlaying(true)
            // QU: volume 构造参数不管用
            Howler.volume(this.volume)
            requestAnimationFrame(this.step.bind(this))
          },
          onplayerror: (id, err) => {
            console.log(song.name + ' --- play error')
            this.next()
          },
          onpause: () => {
            console.log(song.name + ' --- pause')
            this._setPlaying(false)
            this.wave = false
          },
          onstop: () => {
            console.log(song.name + ' --- stop')
            this._setPlaying(false)
            this.wave = false
            this.progress = 100
          },
          onend: () => {
            console.log(song.name + ' --- end')
            this._setPlaying(true)
            this.wave = false
            if (this.singleCycle) {
              console.log(song.name + ' --- single cycle')
              this.play()
            } else {
              this.next()
            }
          },
          onvolume: () => {
            this.volume = Howler.volume()
          },
          onseek: () => {
            console.log(song.name + ' --- seek')
          }
        })
      },
      checkIndex (index) {
        const len = this.playlist.length
        if (index >= len) {
          index = 0
        } else if (index < 0) {
          index = len - 1
        }
        return index
      },
      play (index) {
        index = this.checkIndex(typeof index === 'number' ? index : this.index)
        this.index = index
        const song = this.playlist[index] || null

        if (!song) {
          return
        }

        this.sound = null
        this.ready = false
        
        if (song.howl) {
          this.sound = song.howl
        } else {
          this.sound = song.howl = this.getHowl(song)
        }
        
        this.$set(this.playlist[index], 'howlId', this.sound.play())
        this.sound.fade(0, this.volume, 1000, song.howlId)
      },
      pause () {
        if (this.sound && this.sound.playing()) {
          this.sound.pause()
        }
      },
      stop () {
        if (this.sound && this.sound.playing()) {
          this.sound.stop()
        }
      },
      prev () {
        this.skipTo(this.index - 1)
      },
      next () {
        this.skipTo(this.index + 1)
      },
      skipTo (index) {
        if (this.sound) {
          this.sound.stop()
        }
        this.progress = 0
        this.play(index)
      },
      setVolume (val) {
        Howler.volume(val)
        this.volume = val
      },
      seek (per) {
        if (this.ready && this.sound && this.sound.playing()) {
          this.sound.seek(this.sound.duration() * per)
        }
      },
      step () {
        if (this.sound) {
          const seek = this.sound.seek() || 0
          this.progress = (100 * seek / this.sound.duration()) || 0
          if (this.sound.playing()) {
            requestAnimationFrame(this.step.bind(this))
          }
        }
      },
      formatTime (secs = 0) {
        const minutes = Math.floor(secs / 60) || 0
        const seconds = (secs - minutes * 60) || 0
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      },
      parseTime (time) {
        time = time.split(':')
        if (time.length !== 2) {
          return 0
        }
        const minutes = parseInt(time[0])
        const seconds = parseFloat(time[1])
        return minutes * 60 + seconds
      },
      _setPlaying (state) {
        this.playing = state
        this.$store.commit('app/SET_MUSIC_PLAY', state)
      },
      _error (song) {
        if (this.sound) {
          this.sound.stop()
          this.sound.unload()
        }

        this.sound = song.howl = null
        this.wave = false
        this.playing = true
        this.ready = true
        this.next()
      },
      lyricIsActive (time, index) {
        if (time <= this.usedTimeFromSeconds) {
          const nextLyric = this.lyrics[index + 1]
          if (!nextLyric || nextLyric.time > this.usedTimeFromSeconds) {
            this.activeLyricIndex = index
            return true
          }
        }
        return false
      },
      handleSkip (e) {
        this.seek(e.layerX / this.$refs.progressBar.clientWidth)
      },
      handleToggleMusic () {
        if (this.ready) {
          this[this.playing ? 'pause' : 'play']()
        }
      },
      handleToggleLyric () {
        this.showLyric = !this.showLyric
      },
      handleToggleVolume () {
        this.setVolume(this.volume === 0 ? 0.6 : 0)
      },
      handleToggleSingleCycle () {
        this.singleCycle = !this.singleCycle
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .music-pane {
    position fixed
    right 0
    bottom 0
    left 0
    width 100%
    background alpha($black, .6)
    transform translate3d(0, 100%, 0)
    transition transform .8s $fuck

    .wrapper {
      position relative
      width 100%
      height 80px
      // max-width $content-max-width
      // margin 0 auto
      padding 0 300px
      // z-index 1

      // @media (max-width: 1366px) and (min-width: 769px) {
      //   padding 0 65px
      // }

      // @media (max-width: 768px) and (min-width: 480px) {
      //   padding 0 40px
      // }

      // @media (max-width: 479px) {
      //   padding 0 15px
      // }
    }

    .controls
    .extra {
      flexLayout(, flex-end)
      position absolute
      top 0
      width 300px
      height 100%
    }

    .controls {
      left 0

      .control-item {
        display block
        // width 30px
        // height @width
        margin 0 15px
        line-height 1

        .iconfont {
          font-size 20px
        }

        &.play
        &.pause {
          .iconfont {
            font-size 32px
          }
        }
      }
    }
    
    .extra {
      flexLayout(, flex-start)
      right 0

      &-item {
        margin 0 10px
      }

      .song-list {
        .count {
          margin-left 5px
          font-size 14px
        }
      }

      .volume {
        flexLayout(, space-between)
        &-control {
          width 80px
          height 2px
          margin-left 10px
          background alpha($white, .2)
          cursor pointer
          .value {
            position relative
            width 50%
            height 100%
            background $white
            opacity .8

            .dot {
              position absolute
              width 8px
              height @width
              right (-@width / 2)px
              margin-top -3px
              border-radius 100%
              background $white
            }
          }
        }
      }
    }

    .music {
      flexLayout(, flex-start)
      position relative
      height 100%
      margin 0 20px
      user-select none

      .cover {
        flex 0 0 50px
        width 50px
        height @width
        margin-right 15px
        overflow hidden

        img {
          width 100%
          height 100%
        }
      }

      .info {
        flex 1 0
        height 50px
        flexLayout(column, space-around, flex-start)
        .title {
          flex 1 0
          font-size 14px
        }

        .length {
          flex 0 0 20px
          flexLayout(, space-between)
          width 100%
          height 20px
          font-size 12px

          .played {
          }

          .duratiion {

          }

          .progress {
            flex 1 0
            margin 0 10px
          }

          .bar {
            width 100%
            height 2px
            background alpha($white, .2)
            cursor pointer
            .played {
              position relative
              width 50%
              height 100%
              background $base-color

              .dot {
                position absolute
                width 10px
                height @width
                right (-@width / 2)px
                margin-top -4px
                border-radius 100%
                background $white

                &:after {
                  content ''
                  position absolute
                  top 50%
                  left 50%
                  transform translate(-50%, -50%)
                  display block
                  width 4px
                  height 4px
                  border-radius 100%
                  background $base-color
                }
              }
            }
          }
        }
      }
    }

    .fixed-bar {
      position absolute
      top -2px
      right 0
      left 0
      width 100%
      height 2px
      opacity 1
      transition all .8s $fuck

      .played {
        width 50%
        height 100%
        background alpha($base-color, .5)
      }
    }

    &.show {
      transform translate3d(0, 0, 0)

      .fixed-bar {
        opacity 0
      }
    }

    a {
      opacity .6

      &:hover {
        opacity 1
      }
    }
  }
</style>

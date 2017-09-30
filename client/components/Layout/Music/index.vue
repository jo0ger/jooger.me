<template>
  <div class="music-pane" :class="{ playing, show: showMusic }">
    <div class="bg" :style="bgStyle"></div>
    <div class="overlay"></div>
    <div class="container" v-if="song">
      <div class="title">
        <h1 class="song-name">{{ song.name }}</h1>
        <div class="meta">
          <span class="artists">
            <span class="text">歌手：</span>
            <a :href="`http://music.163.com/#/artist?id=${at.id}`" target="_blank" class="name" v-for="at in song.artists" :key="at.id">
              {{ at.name }}
            </a>
          </span>
          <span class="album">
            <span class="text">所属专辑：</span>
            <a :href="`http://music.163.com/#/album?id=${song.album.id}`" target="_blank" class="name">{{ song.album.name }}</a>
          </span>
        </div>
      </div>
      <div class="content" :class="{ 'show-lyric': showLyric}">
        <div class="cover">
          <img :src="cover" class="cover-source" alt="" @click.prevent.stop="handleToggleLyric" v-if="cover">
          <img src="~static/image/album.jpg" alt="" @click.prevent.stop="handleToggleLyric" v-else>
        </div>
        <div class="lyric">
          <div class="wrapper" ref="lyList" @click.prevent.stop="handleToggleLyric">
            <ul class="ly-list" :style="lyListStyle">
              <li class="item" :class="{ active: lyricIsActive(ly.time, index) }" v-for="(ly, index) in lyrics" :key="ly.time">
                <p>{{ ly.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="tool">
          <a @click.prevent.stop="handleToggleSingleCycle">
            <i class="iconfont" :class="[`icon${singleCycle ? '-single' : ''}-cycle`]"></i>
          </a>
          <a @click.prevent.stop="handleToggleVolume">
            <i class="iconfont" :class="[`icon-volume-${volume === 0 ? 'off' : 'on'}`]"></i>
          </a>
        </div>
        <div class="progress">
          <span class="time used-time">{{ usedTime }}</span>
          <div class="bar">
            <span class="rate" :style="rateStyle"></span>
            <div class="ball" :style="ballStyle"></div>
          </div>
          <span class="time total-time">{{ totalTime }}</span>
        </div>
        <div class="action">
          <a class="prev" @click.prevent.stop="prev">
            <i class="iconfont icon-prev-song"></i>
          </a>
          <a class="toggle" @click.prevent.stop="handleToggleMusic">
            <i class="iconfont" :class="[playing ? 'icon-pause' : 'icon-play']"></i>
          </a>
          <a class="next" @click.prevent.stop="next">
            <i class="iconfont icon-next-song"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="loading" v-else>
      <span class="spinner">
        <span class="col"></span>
        <span class="col"></span>
        <span class="col"></span>
        <span class="col"></span>
        <span class="col"></span>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Howl, Howler } from 'howler'
  import { requestAnimationFrame } from '~/utils'

  const lyReg = /\[(.*?)\](.*)/

  export default {
    name: 'Layout-Music',
    data () {
      return {
        sound: null,
        playlist: [],
        index: 0,
        loading: false,
        ready: false,
        playing: false,
        volume: 0.6,
        progress: 0,
        wave: false,
        showLyric: false,
        activeLyricIndex: -1,
        singleCycle: false
      }
    },
    computed: {
      ...mapGetters({
        showMusic: 'app/showMusic',
        option: 'option/option',
        musicList: 'music/list'
      }),
      song () {
        return this.playlist[this.index]
      },
      cover () {
        return this.song ? this.song.album.picUrl + '?param=300y300' : ''
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
      coverStyle () {
        if (this.cover) {
          return {
            background: `url(${this.cover}) no-repeat center center`
          }
        } 
      },
      bgStyle () {
        if (this.song && this.song.album.picUrl) {
          return {
            backgroundImage: `url(${this.song.album.picUrl})`
          }
        }
      },
      rateStyle () {
        return {
          transform: `scaleX(${this.progress / 100})`
        }
      },
      ballStyle () {
        return {
          left: `${this.progress}%`
        }
      },
      lyListStyle () {
        const $list = this.$refs.lyList
        const index = this.activeLyricIndex + 1
        let target = 0
        if ($list) {
          const activeElem = $list.querySelector(`.item:nth-child(${index})`)
          if (activeElem) {
            const listHeight = $list.clientHeight
            const offsetTop = activeElem.offsetTop
            const elemHeight = activeElem.clientHeight
            target = offsetTop - listHeight / 2 + elemHeight / 2
            if (target < 0) {
              target = 0
            }
          }
        }
        return {
          transform: `translate3d(0, ${-target}px, 0)`
        }
      },
      usedTimeFromSeconds () {
        return this.song.duration / 1000 * (this.progress / 100)
      },
      usedTime () {
        return this.formatTime(Math.floor(this.usedTimeFromSeconds))
      },
      totalTime () {
        return this.formatTime(Math.floor(this.song.duration / 1000))
      }
    },
    watch: {
      'musicList.length' () {
        this.initPlaylist()
      }
    },
    mounted () {
      this.fetchMusicList().then(() => {
        this.$nextTick(() => {
          this.initPlaylist()
        })
      })
      // this.play()
    },
    methods: {
      fetchMusicList () {
        return this.$store.dispatch('music/fetchList', this.option.musicId)
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
            this._error(song)
          },
          onplay: () => {
            console.log(song.name + ' --- play')
            this.wave = true
            this.progress = 0
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
            console.log(song.name + ' --- volumn change')
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
        const song = this.playlist[index]
        this.sound = null
        this.ready = false
        
        if (song.howl) {
          this.sound = song.howl
        } else {
          this.sound = song.howl = this.getHowl(song)
        }
        
        this.$set(this.playlist[index], 'howlId', this.sound.play())
        this.sound.fade(0, this.volume, 2000, song.howlId)
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
        if (this.sound && this.sound.playing()) {
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

        // 这里先不从源列表里去除了
        // this.playlist.splice(this.playlist.findIndex(item => item.id === song.id), 1)
        this.sound = song.howl = null
        this.wave = false
        this.playing = true
        this.next()
        this.ready = true
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
      handleToggleMusic () {
        this[this.playing ? 'pause' : 'play']()
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
    top 0
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    background $white
    z-index 9997
    overflow hidden
    color $white
    transform translate3d(100%, 0, 0)
    transition transform .8s $fuck

    &.show {
      transform translate3d(0, 0, 0)
    }

    .bg {
      position absolute
      top -10%
      left -10%
      width 120%
      height 120%
      filter blur(30px)
      // IOS 9+
      // backdrop-filter blur(15px)
      background-color $white
      background-repeat no-repeat
      background-size cover
      background-position center center
      transition background 1s $ease
    }

    .overlay {
      position absolute
      top -10%
      left -10%
      width 120%
      height 120%
      background alpha($black, .7)
    }

    .loading {
      position absolute
      top 0
      left 0
      width 100%
      height 100%

      .spinner {
        flexLayout(, space-around)
        position absolute
        top 50%
        left 50%
        width 80px
        height @width
        transform translate(-50%, -50%)
        .col {
          display inline-block
          width 4px
          height 40px
          border-radius 2px
          background $base-color
          animation wavy 1.5s $ease infinite forwards
                
          for n in 1...6 {
            &:nth-child({n}) {
              animation-delay (0.25s * (n - 1))
            }
          }
        }
      }

    }

    .container {
      flexLayout(column, space-between)
      position relative
      width 100%
      max-width $content-max-width
      height 100%
      margin 0 auto
      padding 150px 100px 100px
      padding-top 150px
      overflow-y auto

      @media (max-width: 1366px) and (min-width: 769px) {
        padding 120px 65px
      }

      @media (max-width: 768px) and (min-width: 480px) {
        padding 90px 40px 30px
      }

      @media (max-width: 479px) {
        padding 70px 15px 20px
      }

      .title {
        margin-bottom 60px
        text-align center

        .meta {
          color alpha($white, .5)
          font-size .9rem

          .album {
            margin-left 30px
          }

          .name {
            &:hover {
              color $base-color
            }
          }
        }

        @media (max-width: 1366px) and (min-width: 769px) {
          margin-bottom 50px
          .song-name {
            font-size 1.8rem
          }
        }

        @media (max-width: 768px) and (min-width: 480px) {
          margin-bottom 40px
          .song-name {
            font-size 1.6rem
          }
        }

        @media (max-width: 479px) {
          margin-bottom 30px
          .song-name {
            font-size 1.4rem
          }

          .meta {
            font-size .8rem
            & > span {
              display block
              margin 0 !important
            }
          }
        }

      }

      .content {
        position relative
        width 100%
        height @width
        text-align center
        overflow hidden
        .cover {
          position absolute
          top 0
          left 0
          width 100%
          height @width
          img {
            max-width 100%
            height 100%
            max-height 100%
            border 8px solid alpha($white, .2)
            border-radius 100%
            cursor pointer
            animation rotate 20s linear infinite
            animation-play-state paused
          }
        }

        .lyric {
          position absolute
          top 0
          left 0
          width 100%
          height @width
          overflow hidden
          visibility hidden

          .wrapper {
            position relative
            height 100%
            margin 0 -15px
            padding 0 15px
            overflow hidden
          }

          .ly-list {
            transition transform .3s $ease

            .item {
              color alpha($white, .3)
              padding 10px 0
              transform all .5s $ease

              &.active {
                color $base-color
              }
            }
          }
        }

        &.show-lyric {
          .cover {
            visibility hidden
          }
          .lyric {
            visibility visible
          }
        }
      }

      .control {
        width 100%
        max-width 500px
        margin 60px auto 0

        @media (max-width: 1366px) and (min-width: 769px) {
          margin-top 45px
        }

        @media (max-width: 768px) and (min-width: 480px) {
          margin-top 30px
        }

        @media (max-width: 479px) {
          margin-top 30px
        }

        .tool {
          flexLayout()
          margin-bottom 15px

          & > a {
            margin 0 20px
            color alpha($white, .6)
            &:hover {
              color alpha($white, .8)
            }
          }
        }

        .progress {
          flexLayout(, space-around)
          margin-bottom 30px

          .time {
            color alpha($white, .6)

            &.used-time {
              margin-right 30px
            }

            &.total-time {
              margin-left 30px
            }

            @media (max-width: 1366px) and (min-width: 769px) {
              &.used-time {
                margin-right 30px
              }

              &.total-time {
                margin-left 30px
              }
            }

            @media (max-width: 768px) and (min-width: 480px) {
              &.used-time {
                margin-right 25px
              }

              &.total-time {
                margin-left 25px
              }
            }

            @media (max-width: 479px) {
              &.used-time {
                margin-right 20px
              }

              &.total-time {
                margin-left 20px
              }
            }
          }

          .bar {
            flex 1
            position relative
            height 4px
            background alpha($white, .2)
            border-radius 2px
            cursor pointer

            .ball {
              position absolute
              left 0
              width 16px
              height @width
              margin-top -6px
              border-radius 100%
              background $white
              cursor pointer
              transform translateX(-50%)

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

            .rate {
              position absolute
              left 0
              width 100%
              height 100%
              background $base-color
              border-radius 2px
              transform scaleX(0)
              transform-origin 0
            }
          }
        }

        .action {
          flexLayout(, space-around)
          max-width 500px
          margin 0 auto
          
          & > a {
            display inline-block
            line-height 1

            .iconfont {
              font-size 28px
              color alpha($white, .6)
              transition color .3s $ease
            }

            &.toggle {
              .iconfont {
                font-size 72px
              }
            }

            &:hover
            &:active {
              .iconfont {
                color alpha($white, .8)
              }
            }
          }

           @media (max-width: 1366px) and (min-width: 769px) {
              & > a {
                .iconfont {
                  font-size 26px
                }
              }
            }

            @media (max-width: 768px) and (min-width: 480px) {
              & > a {
                .iconfont {
                  font-size 24px
                }
              }
            }

            @media (max-width: 479px) {
              & > a {
                .iconfont {
                  font-size 20px
                }

                &.toggle {
                  .iconfont {
                    font-size 56px
                  }
                }
              }
            }
        }
      }

    }

    &.playing {
      .cover {
        img {
          animation-play-state running !important
        }
      }
    }

  }

  @keyframes rotate {
    0% {
      transform rotateZ(0deg)
    }
    100% {
      transform rotateZ(360deg)
    }
  }
</style>

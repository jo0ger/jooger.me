<template>
  <div class="music-pane" ref="music" :class="{ show: showMusic || (!showMusic && mouseTriggerShowMusic) }">
    <div class="wrapper" v-if="song">
      <div class="controls">
        <a class="control-item prev" @click.prevent.stop="handlePrevSong">
          <i class="iconfont icon-prev-song"></i>
        </a>
        <a class="control-item play" @click.prevent.stop="handleTogglePlayMusic">
          <i class="iconfont" :class="[playing ? 'icon-pause' : 'icon-play']"></i>
        </a>
        <a class="control-item next" @click.prevent.stop="handleNextSong">
          <i class="iconfont icon-next-song"></i>
        </a>
      </div>
      <div class="music">
        <div class="cover">
          <img :src="cover" alt="" @click="handleViewCover">
        </div>
        <div class="info">
          <div class="title">
            <a :href="`https://music.163.com/#/song?id=${song.id}`" target="_blank" class="song-name">
              {{ song.name }}
            </a>
            <span class="at-list">
              <span> - </span>
              <template v-for="(at, index) in song.artists">
                <span :key="at.id" v-if="index !== 0"> / </span>
                <a :href="`https://music.163.com/#/artist?id=${at.id}`" target="_blank" class="artist-name" :key="at.id">
                  {{ at.name }}
                </a>
              </template>
            </span>
          </div>
          <div class="length">
            <div class="position">{{ playedTime }}</div>
            <CommonSlider class="progress"
              :value="progress"
              @change="handleProgressChange">
              <i></i>
            </CommonSlider>
            <div class="duration">{{ duration }}</div>
          </div>
        </div>
      </div>
      <div class="extra">
        <a class="extra-item mode" @click.prevent.stop="handleChangeMode" :title="modeTitle">
          <i class="iconfont" :class="modeClass"></i>
        </a>
        <div class="extra-item volume">
          <a class="trigger" @click.prevent.stop="handleToggleVolume">
            <i class="iconfont" :class="volumeClass"></i>
          </a>
          <CommonSlider class="volume-control"
            :height="2"
            :color="false"
            :value="volume * 100"
            @change="handleVolumeChange">
          </CommonSlider>
        </div>
        <a class="extra-item song-list" @click.prevent.stop="handleToggleShowPlaylist">
          <i class="iconfont icon-song-list"></i>
          <span class="count">{{ musicList.length }}</span>
        </a>
      </div>
      <transition name="fade">
        <div class="playlist" v-show="showPlayList">
          <div class="song-list">
            <div class="hd">
              <span>歌单({{ musicList.length }})</span>
              <a style="float: right;" :href="`https://music.163.com/#/playlist?id=${option.musicId}`" target="_blank">
                <i class="iconfont icon-links"></i>
              </a>
            </div>
            <div class="bd" ref="songList">
              <ul class="list">
                <li class="item" :class="{ select: song.id === item.id }" v-for="(item, index) in musicList"
                  :key="item.id"
                  @dblclick.prevent.stop="handleSkipSong(index)">
                  <div class="cover">
                    <img :src="item.album.cover + '?param=50y50'" alt="" v-if="showPlayList">
                  </div>
                  <div class="name">{{ item.name }}</div>
                  <div class="flag" v-if="song.id === item.id">
                    <template name="fade" mode="out-in">
                      <template v-if="playing">
                        <i v-for="n in 5" :key="n"></i>
                      </template>
                      <div class="spinner" v-else></div>
                    </template>
                  </div>
                  <div class="duration">{{ formatTime(Math.floor(item.duration / 1000)) }}</div>
                  <div class="artist">
                    <template v-for="(at, index) in item.artists">
                      <span :key="at.id" v-if="index !== 0"> / </span>
                      <a :href="`https://music.163.com/#/artist?id=${at.id}`" target="_blank" class="artist-name" :key="at.id">
                        {{ at.name }}
                      </a>
                    </template>
                  </div>
                  <!-- <div class="album">
                    <a :href="`https://music.163.com/#/album?id=${item.album.id}`" target="_blank" class="name">
                      <span class="name">{{ item.album.name }}</span>
                      <span class="alias" v-if="item.album.tns && item.album.tns.length">
                        <span> ( </span>
                        <span class="alias-name" v-for="(alias, index) in item.album.tns" :key="index">
                          {{ alias }}
                        </span>
                        <span> ) </span>
                      </span>
                    </a>
                  </div> -->
                  <a :href="`https://music.163.com/#/song?id=${song.id}`" class="song-link" target="_blank">
                    <i class="iconfont icon-links"></i>                  
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="lyric-list">
            <div class="hd">
              <span>{{ song.name }}</span>
            </div>
            <div class="bd">
                <div class="box" ref="lyList">
                  <ul class="list" :style="lyListStyle" v-if="lyrics.length">
                    <li class="item" :class="{ now: lyricIsActive(ly.time, index) }" v-for="(ly, index) in lyrics" :key="ly.time">
                      <p>{{ ly.text }}</p>
                      <p v-if="ly.t">{{ ly.t }}</p>
                    </li>
                  </ul>
                  <span class="no-lyric" v-else>
                    {{ !ready ? '歌词准备中...' : '纯音乐，无歌词，请静心欣赏'}}
                  </span>
                </div>
              </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="fixed-bar">
      <div class="played" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Howl, Howler } from 'howler'
  import { requestAnimationFrame, isType } from '~/utils'
  import Service from '~/service'
  import { CommonSlider } from '@/components/Common'

  const lyTimeReg = /\[(.*?)\]/g

  export default {
    name: 'Layout-Music',
    components: {
      CommonSlider
    },
    data () {
      return {
        mouseTriggerShowMusic: false,
        sound: null,
        playlist: [],
        index: 0,
        ready: false,
        playing: false,
        volume: 0.6,
        progress: 0,
        wave: false,
        activeLyricIndex: -1,
        mode: 0,               // 0 顺序循环 | 1 单曲循环 | 2 随机播放
        showPlayList: false,
        lyListStyle: null
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
        return this.song ? this.song.album.cover + '?param=50y50' : ''
      },
      lyrics () {
        if (!this.song || !this.song.lyric || !this.ready) {
          return []
        }
        const list = []
        const tlrc = this.song.tlyric.split('\n').filter(tly => !!tly)
        this.song.lyric.split('\n').filter(ly => !!ly).map((ly, index) => {
          if (!ly) {
            return
          }
          const times = ly.match(lyTimeReg)
          if (!times || !times.length) {
            return
          }
          const l = ly.split(times[times.length - 1])
          let tl = ''
          if (tlrc.length) {
            tl = tlrc[index] && tlrc[index].split(times[times.length - 1])
          }
          if (!l || !l.length) {
            return
          }

          times.map(time => {
            const t = this.parseTime(time.slice(1, time.length - 1))
            if (t) {
              list.push({
                time: t,
                text: l[1] || '~ ~ ~',
                t: tl && tl[1] || ''
              })
            }
          })
        })
        return list.sort((a, b) => a.time - b.time)
      },
      playedTimeFromSeconds () {
        return this.song ? this.song.duration / 1000 * (this.progress / 100) : 0
      },
      playedTime () {
        return this.formatTime(Math.floor(this.playedTimeFromSeconds))
      },
      duration () {
        return this.song ? this.formatTime(Math.floor(this.song.duration / 1000)) : ''
      },
      volumeClass () {
        return {
          'icon-volume-0': this.volume === 0,
          'icon-volume-1': this.volume > 0 && this.volume < 0.6,
          'icon-volume-2': this.volume >= 0.6
        }
      },
      randomMode () {
        return this.mode === 2
      },
      singleCycleMode () {
        return this.mode === 1
      },
      cycleMode () {
        return this.mode === 0
      },
      modeTitle () {
        return ['顺序循环', '单曲循环', '随机播放'][this.mode] || ''
      },
      modeClass () {
        return {
          'icon-random': this.randomMode,
          'icon-single-cycle': this.singleCycleMode,
          'icon-cycle': this.cycleMode
        }
      }
    },
    watch: {
      activeLyricIndex (val) {
        if (this.showPlayList) {
          this.lyListStyle = this.getLrcListStyle()
        }
      },
      showMusic (val) {
        if (!val) {
          this.showPlayList = false
        }
      }
    },
    mounted () {
      this.$store.dispatch('music/fetchList').then(success => {
        if (success) {
          this.initPlaylist()
          this.play()
        }
      })

      // window.addEventListener('mousemove', e => {
      //   if (this.showMusic) {
      //     return
      //   }
      //   // music未打开时，阈值设成20px，否则设为music高度
      //   let show = false
      //   if (!this.mouseTriggerShowMusic) {
      //     show = e.clientY > (window.innerHeight - 20)
      //   } else {
      //     show = this.$refs.music.contains(e.target)
      //   }
      //   if (this.mouseTriggerShowMusic === show) {
      //     return
      //   }
      //   this.mouseTriggerShowMusic = show
      //   if (!show) {
      //     this.showPlayList = false
      //   }
      // })
    },
    methods: {
      log (msg = '') {
        if (msg && process.env.NODE_ENV !== 'production') {
          console.log(msg)
        }
      },
      getSongUrlAndLyric (id) {
        return Promise.all([
          Service.music.fetchUrl(id)().then(data => {
            if (!isType(data.data.data, 'Array')) {
              return null
            }
            const src = data.data.data[0]
            return src && src.url || null
          }),
          Service.music.fetchLyric(id)().then(data => {
            if (!data || !data.data) {
              return ''
            }
            const { lrc, tlyric } = data.data
            return {
              lyric: lrc && lrc.lyric || '',
              tlyric: tlyric && tlyric.lyric || ''
            }
          })
        ]).catch(err => (['', { lyric: '', tlyric: ''}]))
      },
      initPlaylist () {
        this.playlist = this.musicList.map(song => {
          if (!song) {
            return null
          }
          return {
            howl: null,
            ...song,
            src: '',
            lyric: '',
            tlyric: '', // 翻译的歌词
            loaderror: false
          }
        }).filter(song => !!song)
      },
      getRandomIndex () {
        const index = Math.floor(Math.random() * this.musicList.length)
        if (index === this.index) {
          return this.getRandomIndex()
        }
        return index
      },
      getLrcListStyle () {
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
      getHowl (song) {
        return new Howl({
          loop: false,
          html5: true,
          autoplay: false,
          volume: this.volume,
          src: [song.src],
          onload: () => {
            this.log(song.name + ' --- 加载成功')
            this.ready = true
            this.wave = false
            this.progress = 0
            this._setPlaying(false)
          },
          onloaderror: (id, err) => {
            this.log(song.name + ' --- 加载失败')
            this.$message(`【${song.name}】加载失败`)
            this._error(song)
          },
          onplay: () => {
            this.log(song.name + ' --- 播放')
            this.$message(`${song.name} - 播放中`)
            this.wave = true
            this.progress = 0
            this.ready = true
            this._setPlaying(true)
            // QU: volume 构造参数不管用
            Howler.volume(this.volume)
            requestAnimationFrame(this.step.bind(this))
            this.$nextTick(() => {
              this.setSongListScroll()
            })
          },
          onplayerror: (id, err) => {
            this.log(song.name + ' --- 播放失败')
            this.$message(`【${song.name}】播放失败`)
            this.handleNextSong()
          },
          onpause: () => {
            this.log(song.name + ' --- 暂停')
            this._setPlaying(false)
            this.wave = false
          },
          onstop: () => {
            this.log(song.name + ' --- 停止')
            this._setPlaying(false)
            this.wave = false
            this.progress = 100
          },
          onend: () => {
            this.log(song.name + ' --- 结束')
            this._setPlaying(true)
            this.wave = false
            if (this.singleCycleMode) {
              // 单曲循环
              this.log(song.name + ' --- 单曲循环')
              this.play()
            } else if (this.randomMode) {
              // TODO: 随机播放
              this.log(' --- 随机播放')
              this.play(this.getRandomIndex())
            } else if (this.cycleMode) {
              // 顺序循环
              this.next()
            }
          },
          onvolume: () => {
            this.volume = Howler.volume()
          },
          onseek: () => {
            this.log(song.name + ' --- seek')
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
      async play (index) {
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
          if (!song.src) {
            const [url, { lyric, tlyric }] = await this.getSongUrlAndLyric(song.id)
            song.src = url
            song.lyric = lyric
            song.tlyric = tlyric
          }
          this.sound = song.howl = this.getHowl(song)
        }
        song.playerror = false
        song.howlId = this.sound.play()
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
          this.sound.unload()
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
          this.sound.seek(this.sound.duration() * per / 100)
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
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
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
        song.loaderror = true
        this.sound = song.howl = null
        this.wave = false
        this.playing = false
        this.ready = true
        if (this.index === this.musicList.length - 1) {
          if (this.playlist.some(item => !item.loaderror)) {
            this.handleNextSong()
          }
        } else {
          this.handleNextSong()
        }
      },
      lyricIsActive (time, index) {
        if (time <= this.playedTimeFromSeconds) {
          const nextLyric = this.lyrics[index + 1]
          if (!nextLyric || nextLyric.time > this.playedTimeFromSeconds) {
            this.activeLyricIndex = index
            return true
          }
        }
        return false
      },
      handleNextSong () {
        if (this.randomMode) {
          this.play(this.getRandomIndex())
        } else {
          this.next()
        }
      },
      handlePrevSong () {
        if (this.randomMode) {
          this.play(this.getRandomIndex())
        } else {
          this.prev()
        }
      },
      handleProgressChange (per) {
        this.seek(per)
      },
      handleTogglePlayMusic () {
        this[this.playing ? 'pause' : 'play']()
      },
      handleSkipSong (index) {
        this.skipTo(index)
      },
      setSongListScroll () {
        // 设置窗口滚动到当前播放的歌曲处
        const songListElem = this.$refs.songList
        const selectSongElem = songListElem.querySelector('.select')
        if (selectSongElem) {
          const top = selectSongElem.offsetTop
          songListElem.scrollTo(0, top - songListElem.clientHeight / 2 + selectSongElem.clientHeight / 2)
        }
      },
      handleToggleShowPlaylist () {
        this.showPlayList = !this.showPlayList
        if (this.showPlayList) {
          this.$nextTick(() => {
            // 设置歌词的样式
            this.lyListStyle = this.getLrcListStyle()
            this.setSongListScroll()
          })
        }
      },
      handleViewCover () {
        console.log(this.song.album.cover)
        this.$imgPop.open(this.song.album.cover)
      },
      handleToggleVolume () {
        if (this.volume === 0) {
          this.setVolume(this._oldVolume)
        } else {
          this._oldVolume = this.volume
          this.setVolume(0)
        }
      },
      handleVolumeChange (per) {
        this.setVolume(per / 100)
      },
      handleChangeMode () {
        this.mode++
        if (this.mode > 2) {
          this.mode = 0
        }
        this.$message(['顺序循环模式','单曲循环模式','随机播放模式'].find((item, index) => index === this.mode))
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
    color $text-color-secondary-dark
    z-index 1000
    background alpha($black, .9)
    transform translate3d(0, 100%, 0)
    transition transform .8s $fuck

    .wrapper {
      flexLayout()
      position relative
      width 100%
      height 80px
      max-width $content-max-width
      margin 0 auto
      layout-wrapper()

      +respond-below($screen-xs-max) {
        .controls
        .extra {
          flex-basis 50px
        }

        .controls {
          .prev
          .next {
            display none
          }

          .play {
            margin-right 0
          }
        }

        .extra {
          .mode
          .volume {
            display none
          }

          .song-list {
            margin-left 0
          }
        }

        .music {
          margin 0 10px

          .cover {
            display none
          }

          .info {
            .at-list {
              display none
            }
          }
        }

        .playlist {
          height 200px

          .song-list {
            display none
          }

          .lyric-list {
            flex 1 0 100%
          }
        }
      }
    }

    .controls
    .extra {
      flex 0 0
      height 100%
    }

    .controls {
      flexLayout(, flex-start)
      width 180px
    }

    .controls {
      .control-item {
        display block
        margin-right 30px
        line-height 1

        &:last-child {
          margin-right 0
        }

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
      flex 0 0 200px
      flexLayout(, flex-end)

      &-item {
        margin-left 20px

        &:first-child {
          margin-left 0
        }
      }

      .song-list {
        .count {
          margin-left 5px
          font-size 14px
        }
      }

      .volume {
        flex 1 0
        flexLayout(, space-between)
        &-control {
          flex 1 0
          margin-left 10px
        }
        .iconfont {
          font-size 20px
        }
      }
    }

    .music {
      flex 1 0
      flexLayout(, flex-start)
      position relative
      height 100%
      margin 0 30px
      user-select none

      .cover {
        flex 0 0 50px
        width 50px
        height @width
        margin-right 15px
        cursor pointer
        overflow hidden

        img {
          width 100%
          height 100%
          border-radius 2px
        }
      }

      .info {
        flex 1 0
        flexLayout(column, space-around, flex-start)
        width 100%
        height 50px
        overflow hidden

        .title {
          flex 1 0
          width 100%
          font-size 14px
          textOverflow()
        }

        .length {
          flex 0 0 20px
          flexLayout(, space-between)
          width 100%
          height 20px
          font-size 12px

          .progress {
            flex 1 0
            margin 0 10px
            i {
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

    .playlist {
      flexLayout()
      position absolute
      bottom 80px
      height 300px
      margin 0 auto
      font-size 12px
      border-top-left-radius 10px
      border-top-right-radius 10px
      overflow hidden
      background-color alpha($black, .8)

      +xxs() {
        left 30px
        width calc(100% - 30px * 2)
      }

      +xs() {
        left 40px
        width calc(100% - 40px * 2)
      }

      +sm() {
        left 50px
        width calc(100% - 50px * 2)
      }

      +md() {
        left 65px
        width calc(100% - 65px * 2)
      }

      +lg() {
        left 80px
        width calc(100% - 80px * 2)
      }

      +xl() {
        left 100px
        width calc(100% - 100px * 2)
      }

      & > div {
        flexLayout(column, flex-start, flex-start)
        position relative
        height 100%
        overflow hidden
      }

      .song-list {
        flex 1 0
        border-right 1px solid alpha($black, .4)

        .list {
          width 100%
          .item {
            flexLayout(, flex-start)
            width 100%
            line-height 28px
            padding 5px 10px
            cursor pointer
            text-align left
            transition all .3s $ease

            .cover {
              flex 0 0 30px
              flexLayout()

              img {
                width 25px
                height @width
                border-radius 2px
              }
            }

            .name {
              flex 1 0
              margin 0 10px
              textOverflow()
            }

            .flag {
              flex 0 0 50px
              flexLayout()
              i {
                display block
                width 2px
                height 10px
                margin 0 1px
                background-color $base-color
                border-radius 1px
                transform-origin 50% 100%
                animation wavy .8s linear infinite forwards

                for n in 1..5 {
                  &:nth-child({n}) {
                    animation-delay (0.25s * (n - 1))
                  }
                }
              }

              .spinner {
                width 16px
                height @width
                margin 0 auto
                border 1px solid alpha($black, .1)
                border-left-color $base-color
                border-radius 50%
                animation loading .6s infinite linear
              }
            }

            .duration {
              flex 0 0 50px
            }

            .artist {
              flex 0 0 200px
            }

            // .album {
            //   flex 0 0 200px
            // }

            .song-link {
              flex 0 0 16px
            }

            &:hover {
              background-color alpha($black, .4)
              color $white
            }

            &.select {
              color $base-color 
            }
          }
        }
      }

      .lyric-list {
        flex 0 0 400px

        .bd {
          .box {
            position relative
            width 100%
            height 100%
            padding 20px 80px
            overflow hidden
            text-align center
          }

          .list {
            color alpha($white, .3)
            transition transform .8s $ease
            .item {
              min-height 32px
              padding 5px 0
              transition all .8s $ease

              & > p {
                line-height 1.5
              }
              &.now {
                color $white
                transform scale(1.2)
              }
            }
          }

          .no-lyric {
            position absolute
            top 50%
            left 50%
            transform translate3d(-50%, -50%, 0)
          }
        }
      }

      .hd {
        flex 0 0 40px
        width 100%
        height 40px
        line-height @height - 10px
        padding 5px 10px
        background alpha($black, .6)
        text-align center
        textOverflow()
      }

      .bd {
        flex 1 0
        position relative
        width 100%
        overflow-x hidden
        overflow-y auto
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
        border-radius 2px
        background alpha($base-color, .8)
        box-shadow 0 0 5px 0 $base-color
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


  @keyframes loading {
    0% {
      transform rotate(0deg)
    }

    100% {
      transform rotate(1turn)
    }
  }
</style>

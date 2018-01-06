/**
 * @desc Music player
 * @author Jooger <iamjooger@gmail.com>
 * @date 2 Jan 2018
 */

'use strict'

import { Howl, Howler } from 'howler'
import { api } from '@/services'
import { isType } from '@/utils'

const isProd = process.env.NODE_ENV === 'production'

export default {
  data () {
    return {
      player: {
        sound: null,
        playlist: [],
        index: 0,
        ready: false,
        playing: false,
        loading: false,
        volume: 0.6,
        progress: 0,
        wave: false,
        mode: 0               // 0 顺序循环 | 1 单曲循环 | 2 随机播放
      },
      list: {
        data: [],
        fetching: false
      },
      info: null
    }
  },
  computed: {
    song () {
      return this.player.playlist[this.player.index] || null
    },
    cover () {
      return this.player.song ? this.player.song.album.cover + '?param=50y50' : ''
    },
    randomMode () {
      return this.player.mode === 2
    },
    singleCycleMode () {
      return this.player.mode === 1
    },
    cycleMode () {
      return this.player.mode === 0
    },
    modeTitle () {
      return ['顺序循环', '单曲循环', '随机播放'][this.player.mode] || ''
    },
    modeClass () {
      return {
        'icon-random': this.randomMode,
        'icon-single-cycle': this.singleCycleMode,
        'icon-cycle': this.cycleMode
      }
    }
  },
  methods: {
    log (msg = '') {
      if (msg && !isProd) {
        console.log(msg)
      }
    },
    initMusic () {
      this.fetchMusicList().then(success => {
        if (success) {
          this.initPlaylist()
          this.$emit('on-music-init')
          setTimeout(() => {
            // 3秒后播放
            this.play()
          }, isProd ? 3000 : 500)
        }
      })
    },
    async fetchMusicList () {
      if (this.list.fetching) {
        return
      }
      this.list.fetching = true
      const { success, data } = await api.music.fetchList().catch(err => {
        console.error(err)
        return {}
      })
      this.list.fetching = false
      if (success) {
        this.list.data = data.tracks
        delete data.tracks
        this.info = data
      }
      return success
    },
    getSongUrl (id) {
      return api.music.fetchUrl(id)().then(data => {
        if (!isType(data.data, 'Array')) {
          return null
        }
        const src = data.data[0]
        return src ? src.url : null
      })
    },
    getSongLyric (id) {
      return api.music.fetchLyric(id)().then(data => {
        if (!data || !data.data) {
          return {
            lyric: '',
            tlyric: ''
          }
        }
        const { lrc, tlyric, nolyric } = data.data
        return {
          nolyric: !!nolyric,
          lyric: lrc ? lrc.lyric : '',
          tlyric: tlyric ? tlyric.lyric : ''
        }
      })
    },
    getSongUrlAndLyric (id) {
      return Promise.all([
        this.getSongUrl(id),
        this.getSongLyric(id)
      ]).catch(() => ([null, { nolyric: false, lyric: '', tlyric: '' }]))
    },
    initPlaylist () {
      this.player.playlist = this.list.data.reduce((sum, song) => {
        if (song) {
          sum.push({
            howl: null,
            ...song,
            src: '',
            nolyric: false,
            lyric: '',
            tlyric: '', // 翻译的歌词
            loaderror: false  // 是否曾经加载失败过
          })
        }
        return sum
      }, [])
    },
    getRandomIndex () {
      const index = Math.floor(Math.random() * this.musicList.length)
      if (index === this.index) {
        return this.getRandomIndex()
      }
      return index
    },
    getHowl (song) {
      return new Howl({
        loop: false,
        html5: true,
        autoplay: false,
        volume: this.player.volume,
        src: [song.src],
        onload: () => {
          this.log(song.name + ' --- 加载成功')
          song.loaderror = false
          this.player.ready = true
          this.player.loading = false
          this.player.wave = false
          this.player.progress = 0
          this.player.playing = false
        },
        onloaderror: (id, err) => {
          this.log(song.name + ' --- 加载失败')
          this.$message({
            message: `【${song.name}】加载失败`,
            duration: 2000
          })
          this._loadError(song)
        },
        onplay: () => {
          this.log(song.name + ' --- 播放')
          // this.$message(`${song.name} - 播放中`)
          song.loaderror = false
          this.player.wave = true
          this.player.progress = 0
          this.player.ready = true
          this.player.loading = false
          this.player.playing = true
          // QU: volume 构造参数不管用
          Howler.volume(this.volume)
          requestAnimationFrame(this.step.bind(this))
        },
        onplayerror: (id, err) => {
          this.log(song.name + ' --- 播放失败')
          this.$message({
            message: `【${song.name}】播放失败`,
            duration: 2000
          })
          this.player.loading = false
          this.handleNextSong()
        },
        onpause: () => {
          this.log(song.name + ' --- 暂停')
          this.player.playing = false
          this.player.wave = false
        },
        onstop: () => {
          this.log(song.name + ' --- 停止')
          this.player.playing = false
          this.player.wave = false
          this.player.progress = 100
        },
        onend: () => {
          this.log(song.name + ' --- 结束')
          this.player.playing = true
          this.player.wave = false
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
          this.player.volume = Howler.volume()
        },
        onseek: () => {
          this.log(song.name + ' --- seek')
        }
      })
    },
    checkIndex (index) {
      const len = this.player.playlist.length
      if (index >= len) {
        index = 0
      } else if (index < 0) {
        index = len - 1
      }
      return index
    },
    async play (index) {
      index = this.checkIndex(typeof index === 'number' ? index : this.player.index)
      this.player.index = index
      const song = this.player.playlist[index] || null

      if (!song) {
        return
      }

      this.player.sound = null
      this.player.ready = false
      this.player.loading = true
      if (!song.loaderror && song.howl) {
        this.player.sound = song.howl
      } else {
        if (!song.src && !song.lyric) {
          const [url, { nolyric, lyric, tlyric }] = await this.getSongUrlAndLyric(song.id)
          if (!url) {
            this.player.playlist.splice(index, 1)
            this.list.data.splice(index, 1)
            this.$message({
              message: `【${song.name}】播放地址失效`,
              duration: 2000
            })
            return this.play(index)
          }
          song.src = url
          song.nolyric = nolyric
          song.lyric = lyric
          song.tlyric = tlyric
        } else if (!song.nolyric && !song.lyric) {
          const { nolyric, lyric, tlyric } = await this.getSongLyric(song.id)
          song.nolyric = nolyric
          song.lyric = lyric
          song.tlyric = tlyric
        } else if (song.loaderror || !song.src) {
          // 如果加载出错或者未找到url，重新获取url
          song.src = await this.getSongUrl(song.id)
        }
        this.player.sound = song.howl = this.getHowl(song)
      }
      song.playerror = false
      song.howlId = this.player.sound.play()
      this.player.sound.fade(0, this.player.volume, 1000, song.howlId)
    },
    pause () {
      if (this.player.sound && this.player.sound.playing()) {
        this.player.sound.pause()
      }
    },
    stop () {
      if (this.player.sound && this.player.sound.playing()) {
        this.player.sound.stop()
        this.player.sound.unload()
      }
    },
    prev () {
      this.skipTo(this.player.index - 1)
    },
    next () {
      this.skipTo(this.player.index + 1)
    },
    skipTo (index) {
      if (this.player.sound) {
        this.player.sound.stop()
        this.player.sound.unload()
        this.player.sound = null
      }
      this.player.progress = 0
      this.play(index)
    },
    setVolume (val) {
      Howler.volume(val)
      this.player.volume = val
    },
    seek (per) {
      if (!this.player.loading && this.player.sound && this.player.sound.playing()) {
        this.player.sound.seek(this.player.sound.duration() * per / 100)
      }
    },
    step () {
      if (this.player.sound) {
        const seek = this.player.sound.seek() || 0
        this.player.progress = (100 * seek / this.player.sound.duration()) || 0
        if (this.player.sound.playing()) {
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
    _loadError (song) {
      if (this.player.sound) {
        this.player.sound.stop()
        this.player.sound.unload()
        this.player.sound = null
      }
      song.loaderror = true
      this.player.sound = song.howl = null
      song.howlId = ''
      this.player.wave = false
      this.player.playing = false
      this.player.ready = true
      this.player.loading = false
      setTimeout(() => this.handleNextSong(), 2000)
    },
    handleNextSong () {
      if (this.randomMode) {
        this.skipTo(this.getRandomIndex())
      } else {
        this.next()
      }
    },
    handlePrevSong () {
      if (this.randomMode) {
        this.skipTo(this.getRandomIndex())
      } else {
        this.prev()
      }
    },
    handleProgressChange (per) {
      this.seek(per)
    },
    handleTogglePlayMusic () {
      if (!this.player.loading) {
        this[this.player.playing ? 'pause' : 'play']()
      }
    },
    handleSkipSong (index) {
      this.skipTo(index)
    }
  }
}

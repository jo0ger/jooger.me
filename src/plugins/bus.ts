import Vue from 'vue'
import { mixins } from 'vue-class-component'
import { Component } from 'nuxt-property-decorator'
import { IS_PROD } from '@/config'
import api from '@/api'
import { Howl, Howler } from 'howler'

export default ({ store }) => {
  const mobileLayout = store.getters['app/mobileLayout']

  @Component
  class Bus extends (!mobileLayout ? mixins(PlayerMixin) : Vue) {
    private mobileLayout = mobileLayout
  }

  Vue.prototype.$bus = new Bus()

  if (process.client && !IS_PROD) {
    (window as any).bus = Vue.prototype.$bus
  }
}

interface PlaySong extends WebApi.AgentModule.Song {
  howl: any
  howlId: any,
  loaderror: boolean
}

@Component
class PlayerMixin extends Vue {
  private songlist: WebApi.AgentModule.Song[] = []
  private loading = false
  private control = {
    sound: null as any,
    playlist: [] as PlaySong[],
    index: 0,
    ready: false,
    playing: false,
    loading: false,
    volume: 0.8,
    progress: 0,
    wave: false
  }

  private created () {
    this.$on('on-app-mounted', () => this.startMusic())
  }

  public async startMusic () {
    const interactivePs = new Promise(resolve => {
      const handler = () => {
        resolve(true)
        window.removeEventListener('click', handler)
      }
      window.addEventListener('click', handler)
    })
    await Promise.all([
      interactivePs,
      this.initMusic()
    ])
    this.play()
  }

  public async initMusic () {
    if (this.loading) return
    this.loading = true
    try {
      const res = await api.getPlayList()
      this.songlist = res.data
      this.initPlayList()
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  private log (...args: any[]) {
    if (!IS_PROD) {
      console.log.apply(console, Array.prototype.slice.call(arguments))
    }
  }

  private initPlayList () {
    this.control.playlist = this.songlist.reduce((prev, song) => {
      if (song) {
        prev.push({
          ...song,
          howl: null,
          howlId: '',
          loaderror: false
        })
      }
      return prev
    }, [] as PlaySong[])
  }

  private _loadError (song) {
    if (this.control.sound) {
      this.control.sound.stop()
      this.control.sound.unload()
      this.control.sound = null
    }
    song.loaderror = true
    this.control.sound = song.howl = null
    song.howlId = ''
    this.control.wave = false
    this.control.playing = false
    this.control.ready = true
    this.control.loading = false
    setTimeout(() => this.next(), 2000)
  }

  private getHowl (song: PlaySong) {
    return new Howl({
      loop: false,
      html5: true,
      autoplay: true,
      volume: this.control.volume,
      src: [song.url],
      preload: true,
      onload: () => {
        this.log(song.name + ' --- 加载成功')
        song.loaderror = false
        this.control.ready = true
        this.control.loading = false
        this.control.wave = false
        this.control.progress = 0
        this.control.playing = false
      },
      onloaderror: (id, err) => {
        this.log(song.name + ' --- 加载失败', id, err)
        this._loadError(song)
      },
      onplay: () => {
        this.log(song.name + ' --- 播放')
        song.loaderror = false
        this.control.wave = true
        this.control.progress = 0
        this.control.ready = true
        this.control.loading = false
        this.control.playing = true
        Howler.volume(this.control.volume)
        // 先不做进度条的
        // requestAnimationFrame(this.step.bind(this))
      },
      onplayerror: (id, err) => {
        this.log(song.name + ' --- 播放失败', err)
        this.control.loading = false
        this.next()
      },
      onpause: () => {
        this.log(song.name + ' --- 暂停')
        this.control.playing = false
        this.control.wave = false
      },
      onstop: () => {
        this.log(song.name + ' --- 停止')
        this.control.playing = false
        this.control.wave = false
        this.control.progress = 100
      },
      onend: () => {
        this.log(song.name + ' --- 结束')
        this.control.playing = true
        this.control.wave = false
        this.next()
      },
      onvolume: () => {
        this.control.volume = Howler.volume()
      },
      onseek: () => {
        this.log(song.name + ' --- seek')
      }
    })
  }

  private checkIndex (index: number) {
    const len = this.control.playlist.length
    if (index >= len) {
      index = 0
    } else if (index < 0) {
      index = len - 1
    }
    return index
  }

  private async play (index?: number) {
    index = this.checkIndex(typeof index === 'number' ? index : this.control.index)
    this.control.index = index
    const song = this.control.playlist[index] || null
    if (!song) {
      return this.log('歌曲未找到')
    }
    this.control.sound = null
    this.control.ready = false
    this.control.loading = true
    if (!song.loaderror && song.howl) {
      this.control.sound = song.howl
    } else {
      if (!song.url) {
        const res = await api.getSong(song.id)
        song.url = res.data.url
      }
      this.control.sound = song.howl = this.getHowl(song)
    }
    song.howlId = this.control.sound.play()
    this.control.sound.fade(0, this.control.volume, 1000, song.howlId)
  }

  public pause () {
    if (this.control.sound && this.control.sound.playing()) {
      this.control.sound.pause()
    }
  }

  public stop () {
    if (this.control.sound && this.control.sound.playing()) {
      this.control.sound.stop()
      this.control.sound.unload()
    }
  }

  public prev () {
    this.skipTo(this.control.index - 1)
  }

  public next () {
    this.skipTo(this.control.index + 1)
  }

  public skipTo (index) {
    if (this.control.sound) {
      this.control.sound.stop()
      this.control.sound.unload()
      this.control.sound = null
    }
    this.control.progress = 0
    this.play(index)
  }

  public setVolume (val) {
    Howler.volume(val)
    this.control.volume = val
  }

  public seek (per) {
    if (!this.control.loading && this.control.sound && this.control.sound.playing()) {
      this.control.sound.seek(this.control.sound.duration() * per / 100)
    }
  }

  private step () {
    if (this.control.sound) {
      const seek = this.control.sound.seek() || 0
      this.control.progress = (100 * seek / this.control.sound.duration()) || 0
      if (this.control.sound.playing()) {
        requestAnimationFrame(this.step.bind(this))
      }
    }
  }
}

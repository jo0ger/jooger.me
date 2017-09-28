/**
 * @desc Music audio control
 * @author Jooger <zzy1198258955@163.com>
 * @date 28 Sep 2017
 */

'use strict'

import Vue from 'vue'
import { Howl, Howler } from 'howler'

const requestAnimationFrame = window.requestAnimFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60)
  }

export default ({ store }) => {
  const playlist = getPlaylist(store.getters['music/list'])
  Vue.prototype.$music = new Player(playlist, store)
}

function storeCommitProxy (store) {
  return function (key, value) {
    let payload = null
    if (Object.prototype.toString.call(key) === '[object Object]') {
      payload = key
    } else if (typeof key === 'string') {
      payload = {
        [key]: value
      }
    }
    store.commit('app/SET_MUSIC_CONTROL', payload)
  }
}

class Player {
  constructor (playlist = [], store) {
    this.playlist = playlist
    this.sound = null
    this._proxy = storeCommitProxy(store)
    this._store = store
  }

  get _control () {
    return this._store.getters['app/musicControl']
  }

  checkIndex (index) {
    const len = this.playlist.length
    if (index >= len) {
      index = 0
    } else if (index < 0) {
      index = len - 1
    }
    return index
  }

  play (index) {
    index = this.checkIndex(typeof index === 'number' ? index : this._control.index)

    const song = this.playlist[index]
    this.sound = null
    this._proxy('ready', false)

    if (song.howl) {
      this.sound = song.howl
    } else {
      this.sound = song.howl = new Howl({
        loop: false,
        html5: true,
        autoplay: false,
        volume: this._control.volume,
        src: [song.src],
        onload: () => {
          console.log(song.name + ' --- load')
          this._proxy({
            ready: true,
            playing: false,
            wave: false,
            progress: 0
          })
        },
        onloaderror: () => {
          console.log(song.name + ' --- load error')
          // TODO: 下一首
        },
        onplay: () => {
          console.log(song.name + ' --- play')
          this._proxy({
            playing: true,
            wave: true,
            progress: 0
          })
          // QU: volume 构造参数不管用
          Howler.volume(this._control.volume)
          requestAnimationFrame(this.step.bind(this))
        },
        onplayerror: () => {
          console.log(song.name + ' --- play error')
        },
        onpause: () => {
          console.log(song.name + ' --- pause')
          this._proxy({
            playing: false,
            wave: false
          })
        },
        onstop: () => {
          console.log(song.name + ' --- stop')
          this._proxy({
            playing: false,
            wave: false,
            progress: 1
          })
        },
        onend: () => {
          console.log(song.name + ' --- end')
          this._proxy({
            playing: false,
            wave: false
          })
        },
        onvolume: () => {
          console.log(song.name + ' --- volumn change')
          this._proxy('volume', Howler.volume())
        },
        onseek: () => {
          console.log(song.name + ' --- seek')
        }
      })
    }

    song.howlId = this.sound.play()
    this._proxy('index', index)
  }

  pause () {
    if (this.sound && this._control.playing) {
      this.sound.pause()
    }
  }

  stop () {
    if (this.sound && this._control.playing) {
      this.sound.stop()
    }
  }

  prev () {
    this.skipTo(this.checkIndex(this._control.index - 1))
  }

  next () {
    this.skipTo(this.checkIndex(this._control.index + 1))
  }

  skipTo (index) {
    console.log(index)
    if (this.sound) {
      this.sound.stop()
    }
    this._proxy('progress', 0)
    this.play(index)
  }

  volume (val) {
    Howler.volume(val)
    this._proxy('volume', val)
  }

  seek (per) {
    if (this.sound && this._control.playing) {
      this.sound.seek(this.sound.duration() * per)
    }
  }

  step () {
    if (this.sound) {
      const seek = this.sound.seek() || 0
      this._proxy('progress', (seek / this.sound.duration()) || 0)
      if (this.sound.playing()) {
        requestAnimationFrame(this.step.bind(this))
      }
    }
  }
}

function getPlaylist (songs = []) {
  return songs.map(song => {
    if (!song) {
      return null
    }
    return {
      howl: null,
      ...song
    }
  }).filter(song => !!song)
}

/**
 * @desc Music audio control
 * @author Jooger <zzy1198258955@163.com>
 * @date 28 Sep 2017
 */

'use strict'

import Vue from 'vue'
import { Howl, Howler } from 'howler'

const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame

export default ({ store }) => {
  const playlist = getPlaylist(store.getters['music/list'])
  Vue.prototype.$music = new Player(playlist)
}

class Player {
  constructor (playlist = []) {
    this.playlist = playlist
    this.index = 0
    this.ready = false
    this.playing = false
    this.volume = 0.6
    this.progress = 0
    this.wave = false
    this.sound = null
  }

  init () {}

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
    index = this.checkIndex(typeof index === 'number' ? index : this.index)

    const song = this.playlist[index]
    this.sound = null
    this.ready = false

    if (song.howl) {
      this.sound = song.howl
    } else {
      this.sound = song.howl = new Howl({
        loop: false,
        html5: true,
        autoplay: false,
        volume: this.volume,
        src: [song.src],
        onload: () => {
          console.log(song.name + ' --- load')
          this.ready = true
        },
        onloaderror: () => {
          console.log(song.name + ' --- load error')
          console.log(song.howl._volumn)
          console.log(this.volume)
        },
        onplay: () => {
          console.log(song.name + ' --- play')
          this.playing = true
          this.wave = true
          this.progress = 0
          // QU: volume 构造参数不管用
          Howler.volume(this.volume)
          requestAnimationFrame(this.step.bind(this))
        },
        onplayerror: () => {
          console.log(song.name + ' --- play error')
        },
        onpause: () => {
          console.log(song.name + ' --- pause')
          this.playing = false
          this.wave = false
        },
        onstop: () => {
          console.log(song.name + ' --- stop')
          this.playing = false
          this.progress = 100
          this.wave = false
        },
        onend: () => {
          console.log(song.name + ' --- end')
          this.playing = false
          this.wave = false
        },
        onvolume: () => {
          console.log(song.name + ' --- volumn change')
          this.volume = Howler.volume()
        },
        onseek: () => {
          console.log(song.name + ' --- seek')
        }
      })
    }

    song.howlId = this.sound.play()
    this.index = index
  }

  pause () {
    if (this.sound && this.playing) {
      this.sound.pause()
    }
  }

  skip (direction) {
    let index = 0
    if (direction === 'prev') {
      index = this.index - 1
    } else {
      index = this.index + 1
    }

    index = this.checkIndex(index)

    this.skipTo(index)
  }

  skipTo (index) {
    if (this.sound) {
      this.sound.stop()
    }
    this.progress = 0
    this.play(index)
  }

  volume (val) {
    Howler.volume(val)
  }

  seek (per) {
    if (this.sound && this.playing) {
      this.sound.seek(this.sound.duration() * per)
    }
  }

  step () {
    if (this.sound) {

    }
    const seek = this.sound.seek() || 0
    this.progress = (seek / this.sound.duration()) * 100 || 0
    if (this.sound.playing) {
      requestAnimationFrame(this.step.bind(this))
    }
  }

  formatTime (secs = 0) {
    const minutes = Math.floor(secs / 60) || 0
    const seconds = (secs - minutes * 60) || 0
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
}

function getPlaylist (songs = []) {
  return songs.map(song => {
    if (!song) {
      return null
    }
    return {
      howl: null,
      id: song.id,
      name: song.name,
      duration: song.dt || 0,
      src: song.song.url
    }
  }).filter(song => !!song)
}

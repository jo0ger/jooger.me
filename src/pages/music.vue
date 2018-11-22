<template>
  <section class="music-page">
    <div class="player" :class="claz">
      <div class="info">
        <p class="name">{{ song.name || '---' }}</p>
        <p class="artist">{{ artists }}</p>
        <div class="bar">
          <div class="progress" :style="barStyle"></div>
        </div>
      </div>
      <div class="control-panel">
        <transition name="fade" mode="out-in">
          <div class="album" :key="coverStyle.backgroundImage">
            <div class="cover" :style="coverStyle"></div>
          </div>
        </transition>
        <div class="controls">
          <div class="prev" @click="$bus.prev"><i class="icon icon-prev-song"></i></div>
          <div class="pause" v-if="$bus.control.playing" @click="$bus.pause"><i class="icon icon-pause"></i></div>
          <div class="play" v-else @click="$bus.play"><i class="icon icon-play"></i></div>
          <div class="next" @click="$bus.next"><i class="icon icon-next-song"></i></div>
          <div class="volume" @click="setVolume">
            <i class="icon icon-volume" v-if="$bus.control.volume"></i>
            <i class="icon icon-volume-off" v-else></i>
          </div>
        </div>
      </div>
      <div class="lrc-list" ref="lrcList" v-if="song && song.lyric && song.lyric.length">
        <ul class="list" :style="lrcListStyle">
          <li class="line" :class="{ active: activeLyricIndex === index }" v-for="(lrc, index) in song.lyric" :key="lrc.time">
            <p>{{ lrc.lrc }}</p>
            <p v-if="lrc.tlrc">{{ lrc.tlrc }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component, Watch } from '@/utils/decorators'
import { namespace } from 'vuex-class'

const { Getter } = namespace('article')

@Component({
  name: 'Music',
  head () {
    return {
      title: '🎵 音乐'
    }
  },
  fetch ({ store }) {
    store.commit('app/SET_FULL_COLUMN', true)
    return Promise.resolve()
  }
})
export default class extends Base {
  private cacheVolume = 0

  private get song () {
    return (this.$bus as any).song as WebApi.AgentModule.Song
  }

  private get artists () {
    return this.song && this.song.artists ? this.song.artists.map(a => a.name).join('、') : '---'
  }

  private get displayedLyricList () {
    return this.song.lyric.slice()
  }

  private get claz () {
    const bus = this.$bus as any
    return {
      playing: bus.control.playing,
      pause: !bus.control.playing,
      loading: bus.control.loading,
      ready: bus.control.ready
    }
  }

  private get coverStyle () {
    return {
      backgroundImage: this.song && this.song.album ? `url(${this.song.album.cover})` : null
    }
  }

  private get barStyle () {
    const bus = this.$bus as any
    return {
      width: bus.control.progress + '%'
    }
  }

  private get playedTimeFromSeconds () {
    const bus = this.$bus as any
    return this.song ? this.song.duration / 1000 * (bus.control.progress / 100) : 0
  }

  // 当前播放处歌词的索引
  private get activeLyricIndex () {
    if (!this.song || !this.song.lyric || !this.song.lyric.length) return -1
    const playedTimeFromSeconds = this.playedTimeFromSeconds
    const lrcList = this.song.lyric
    return lrcList.findIndex((item, index) => {
      return item.time <= playedTimeFromSeconds && (!lrcList[index + 1] || lrcList[index + 1].time > playedTimeFromSeconds)
    })
  }

  private get lrcListStyle () {
    const $list = this.$refs.lrcList as HTMLElement
    let target = 0
    const index = this.activeLyricIndex + 1
    if ($list) {
      const activeElem = $list.querySelector(`.line:nth-child(${index})`) as HTMLElement
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
  }

  private setVolume () {
    const bus = this.$bus as any
    const cache = this.cacheVolume
    this.cacheVolume = bus.control.volume
    bus.setVolume(this.cacheVolume === 0 ? cache : 0)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

$player-height = 120px
$album-radius = $player-height * 0.9

.music-page {
  flexLayout(column)
  height calc(100vh - 60px - 112px - 16px - 100px)

  .player {
    position relative
    width 50%
    height $player-height

    .info {
      position absolute
      height 100%
      top 0
      opacity 0
      left $padding-md
      right $padding-md
      background-color var(--light-color-light)
      padding $padding-md $padding-md $padding-md ($padding-lg + $album-radius + $padding-md)
      border-radius $padding-sm
      transition all .5s $ease

      .name {
        margin-bottom $padding-xs
        font-size $font-size-lg
        textOverflow()
      }

      .artist {
        margin-bottom $padding-xs
        font-size $font-size-sm
        color var(--text-color-secondary)
        textOverflow()
      }

      .bar {
        position relative
        width 100%
        height 2px
        background-color var(--border-color-dark)

        .progress {
          position absolute
          top 0
          bottom 0
          left 0
          height 100%
          background-color var(--primary-color)
        }
      }
    }

    .control-panel {
      position relative
      background-color var(--light-color)
      border-radius $padding-sm
      width 100%
      height 100%
      box-shadow 0 30px 56px 6px var(--box-shadow-color)

      .album {
        position absolute
        left $padding-lg
        top (0 - $padding-lg)
        width $album-radius
        height @width
        border-radius 50%
        box-shadow 0 30px 56px 6px var(--box-shadow-color)
        transform scale(1)
        transition all .5s $ease

        .cover {
          position absolute
          top 0
          left 0
          right 0
          bottom 0
          border-radius 50%
          background-position center
          background-repeat no-repeat
          background-size cover
          animation rotate 3s linear infinite
          animation-fill-mode forwards
          animation-play-state paused
        }

        &::after {
          content ''
          position absolute
          top 50%
          left 50%
          width $padding-lg
          height @width
          background-color var(--light-color)
          border-radius 50%
          z-index 5
          transform translate(-50%, -50%)
        }
      }

      .controls {
        flexLayout(, flex-end)
        align-items unset
        height 100%
        margin-left ($padding-lg + $album-radius + $padding-sm)
        padding 0 $padding-md

        > div {
          flexLayout()
          width ($player-height - 2 * $padding-xs)
          height auto
          margin $padding-xs
          border-radius 8px
          background-color var(--light-color)
          transition background-color .3s $ease
          cursor pointer

          .icon {
            color var(--disabled-color)
            font-size $font-size-lger + 16px
          }

          &:hover {
            background-color var(--body-color)
          }
        }
      }
    }

    .lrc-list {
      position absolute
      top $player-height
      left 50%
      transform translateX(-50%)
      width 100%
      max-height 300px
      margin-top 30px
      overflow hidden
      text-align center

      .list {
        transition transform .6s $ease
      }

      .line {
        margin $padding-sm 0
        line-height 1.5
        color var(--text-color-secondary)
        text-shadow 0 5px 20px var(--box-shadow-color-dark)
        transition all .6s $ease

        &.active {
          color var(--keyword-color)
          transform scale(1.2)
        }
      }
    }

    &.playing {
      .info {
        top (0 - $player-height * 2 / 3)
        opacity 1
      }

      .control-panel {
        .album {
          box-shadow 0 30px 56px 6px var(--box-shadow-color-dark)
          transform scale(1.2) translateY(-10px)

          .cover {
            animation-play-state running
          }
        }
      }
    }
  }

}
</style>

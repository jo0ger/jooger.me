<template>
  <div class="page-music">
    <template v-if="musicList.length">
      <div class="player" :class="[player && player.playing ? 'playing' : 'pause']" v-show="player">
        <div class="cover-wrapper">
          <div class="cover" :style="coverStyle"></div>
          <div class="cover cover-blur" :style="coverStyle"></div>
        </div>
        <div class="control">
          <div class="control-item prev">
            <i class="icon icon-prev-song" @click="prev"></i>
          </div>
          <div class="control-item play">
            <svg viewBox="0 0 100 100">
              <path class="el-progress-circle__track" :d="trackPath" stroke="rgba(160, 160, 160, .3)" :stroke-width="relativeStrokeWidth" fill="none"></path>
              <path class="el-progress-circle__path" :d="trackPath" stroke-linecap="square" stroke="rgba(160, 160, 160, .4)" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
            </svg>
            <div class="cover" v-if="cover">
              <div class="cover-img" :style="coverStyle"></div>
            </div>
            <div class="song-info" v-if="song">
              <h3 class="name">{{song.name}}</h3>
              <p class="artist">
                <template v-for="(at, index) in song.artists">
                  <span :key="index" v-if="index !== 0"> / </span>
                  <a :href="`https://music.163.com/#/artist?id=${at.id}`" target="_blank" rel="noopener" class="artist-name" :key="at.id">
                    {{ at.name }}
                  </a>
                </template>
              </p>
            </div>
            <i class="icon" :class="[`icon-${player && player.playing ? 'pause' : 'play'}`]" @click="toggle"></i>
            <i class="icon volume" :class="[`icon-volume${songMute ? '-off' : ''}`]" @click="toggleVolume"></i>
          </div>
          <div class="control-item next">
            <i class="icon icon-next-song" @click="next"></i>
          </div>
        </div>
      </div>
      <div class="music-content">
        <Card class="music-list-widget" v-if="info">
          <div class="list-header" slot="header">
            <template v-if="info">
              <h3 class="name">
                {{ info.name }}
                <a :href="`https://music.163.com/#/playlist?id=${info.id}`" target="_blank" rel="noopener">[前往歌单]</a>
              </h3>
              <p class="description" v-if="info.description">{{ info.description }}</p>
              <div class="tags" v-if="info.tags.length">
                <Tag :name="tag" v-for="(tag, index) in info.tags" :key="index"></Tag>
              </div>
            </template>
          </div>
          <ul class="music-list">
            <li class="music-item"
              :class="{ active: song && song.id === item.id }"
              v-for="(item, index) in musicList"
              :key="index"
              @dblclick.prevent.stop="play(index)">
              <div class="cover">
                <img :src="item.album.cover" alt="">
              </div>
              <div class="info">
                <h4 class="name">{{ item.name }}</h4>
                <div class="extra">
                  <div class="artist">
                    <template v-for="(at, index) in item.artists">
                      <span :key="index" v-if="index !== 0"> / </span>
                      <a :href="`https://music.163.com/#/artist?id=${at.id}`" target="_blank" rel="noopener" class="artist-name" :key="at.id">
                        {{ at.name }}
                      </a>
                    </template>
                  </div>
                  <div class="duration">
                    {{ formatTime(Math.floor(item.duration / 1000)) }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </Card>
      </div>
    </template>
  </div>
</template>

<script>
  import { Card, Tag } from '@/components/common'

  export default {
    name: 'Music',
    components: {
      Card,
      Tag
    },
    head () {
      return {
        title: 'Music',
        bodyAttrs: {
          class: 'full-page'
        }
      }
    },
    data () {
      return {
        relativeStrokeWidth: 3
      }
    },
    computed: {
      musicList () {
        if (this.$eventBus) {
          return this.$eventBus.list.data
        }
        return []
      },
      player () {
        if (this.$eventBus) {
          return this.$eventBus.player
        }
        return null
      },
      info () {
        if (this.$eventBus) {
          return this.$eventBus.info
        }
        return null
      },
      song () {
        if (this.$eventBus) {
          return this.$eventBus.song
        }
        return null
      },
      songMute () {
        if (this.$eventBus) {
          return this.$eventBus.player.volume === 0
        }
        return true
      },
      progress () {
        if (this.player) {
          return this.player.progress
        }
        return 0
      },
      cover () {
        if (this.$eventBus && this.$eventBus.song) {
          return this.$eventBus.song.album.cover
        }
        return ''
      },
      coverStyle () {
        if (this.cover) {
          return {
            backgroundImage: `url(${this.cover})`
          }
        }
        return null
      },
      perimeter() {
        const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2
        return 2 * Math.PI * radius
      },
      trackPath() {
        var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
        return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`
      },
      circlePathStyle() {
        const perimeter = this.perimeter
        return {
          strokeDasharray: `${perimeter}px,${perimeter}px`,
          strokeDashoffset: (1 - this.progress / 100) * perimeter + 'px'
        }
      }
    },
    methods: {
      formatTime () {
        return this.$eventBus.formatTime.apply(this.$eventBus, arguments)
      },
      prev () {
        this.$eventBus.handlePrevSong()
      },
      next () {
        this.$eventBus.handleNextSong()
      },
      play (index) {
        this.$eventBus.skipTo(index)
      },
      toggle () {
        if (this.player) {
          if (this.player.playing) {
            this.$eventBus.pause()
          } else {
            this.$eventBus.play()
          }
        }
      },
      toggleVolume () {
        this.$eventBus.setVolume(this.songMute ? 0.6 : 0)
      }
    }
  }
</script>


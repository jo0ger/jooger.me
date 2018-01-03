<template>
  <div class="page-music">
    <div class="player" :class="[player && player.playing ? 'playing' : 'pause']" v-show="player">
      <div class="cover-wrapper">
        <div class="cover" :style="coverStyle"></div>
        <div class="cover cover-blur" :style="coverStyle"></div>
      </div>
      <div class="control">
        <div class="control-item prev">
          <i class="icon icon-music-prev" @click="prev"></i>
        </div>
        <div class="control-item play">
          <div class="cover" :style="coverStyle" v-if="cover">
            <!-- <img :src="`${cover}`" alt=""> -->
          </div>
          <i class="icon" :class="[`icon-music-${player && player.playing ? 'pause' : 'play'}`]" @click="toggle"></i>
        </div>
        <div class="control-item next">
          <i class="icon icon-music-next" @click="next"></i>
        </div>
      </div>
    </div>
    <div class="music-content">
      <Card class="music-list-widget" v-if="info">
        <div class="list-header" slot="header">
          <template v-if="info">
            <h3 class="name">{{ info.name }}</h3>
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
            :key="item.id"
            @dblclick.prevent.stop="play(index)">
            <div class="cover">
              <img :src="item.album.cover + '?param=50y50'" alt="">
            </div>
            <div class="info">
              <h4 class="name">{{ item.name }}</h4>
              <div class="extra">
                <div class="artist">
                  <template v-for="(at, index) in item.artists">
                    <span :key="at.id" v-if="index !== 0"> / </span>
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
        console.log(index)
        this.$eventBus.play(index)
      },
      toggle () {
        if (this.player) {
          if (this.player.playing) {
            this.$eventBus.pause()
          } else {
            this.$eventBus.play()
          }
        }
      }
    }
  }
</script>


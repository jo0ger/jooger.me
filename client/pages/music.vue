<template>
  <div class="page-music">
    <div class="music-header">
      <div class="cover">
        <img :src="cover" alt="" ref="coverImage">
        <canvas ref="coverCanvas"></canvas>
      </div>
    </div>
    <div class="music-content">
      <Card class="music-list-widget">
        <div slot="header">
          <i class="icon icon-music"></i>
        </div>
        <ul class="music-list">
          <li class="music-item"
            v-for="item in musicList"
            :key="item.id">
            {{ item.name }}
          </li>
        </ul>
      </Card>
    </div>
  </div>
</template>

<script>
  import StackBlur from 'stackblur-canvas'
  import { Card } from '@/components/common'

  export default {
    name: 'Music',
    components: {
      Card
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
      return {}
    },
    computed: {
      musicList () {
        if (this.$eventBus) {
          return this.$eventBus.list.data
        }
        return []
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
    }
  }
</script>


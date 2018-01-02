<template>
  <div class="page-music">
    <div class="music-header">
      <div class="cover" :style="coverStyle"></div>
      <div class="overlay"></div>
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
      coverStyle () {
        if (this.$eventBus && this.$eventBus.song) {
          return {
            backgroundImage: `url(${this.$eventBus.song.album.cover})`
          }
        }
        return null
      }
    }
  }
</script>


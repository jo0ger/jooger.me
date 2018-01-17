<style lang="stylus">
  @import 'index'
</style>

<template>
  <header class="app-header">
    <div class="container">
      <nuxt-link class="nav-logo" to="/">
        <!-- <i class="icon icon-logo"></i> -->
        <img :src="logo" alt="">
      </nuxt-link>
      <div class="nav-menus">
        <nuxt-link v-for="menu in menuSchema"
          ref="menu"
          class="menu-item"
          :key="menu.key"
          :to="{ name: menu.key }"
          exact>
          {{ menu.title }}
        </nuxt-link>
        <i class="corner" :style="cornerStyle"></i>
      </div>
      <div class="nav-action">
        <form class="action-item search" :class="{ opened: searchOpened }" role="search" @submit.stop.prevent="handleSearch">
          <input name="search" class="search-input"
            ref="searchInput"
            type="search"
            autocomplete="off"
            :autofocus="false"
            placeholder="搜索..."
            maxlength="200"
            v-model.trim="keyword"
            v-clickoutside="handleCloseSearch"
            @keyup.enter="handleSearch">
          <i class="icon icon-search" @click="handleToggleSearch"></i>
        </form>
        <transition name="fade">
          <div class="action-item music" v-if="song">
            <div class="control">
              <a class="control-item prev" @click="prev">
                <i class="icon icon-prev-song"></i>
              </a>
              <a class="control-item play">
                <i class="icon" :class="[`icon-${player && player.playing ? 'pause' : 'play'}`]" @click="toggleMusicPlay"></i>
              </a>
              <a class="control-item next" @click="next">
                <i class="icon icon-next-song"></i>
              </a>
              <a class="control-item volume" @click="toggleMusicVolume">
                <i class="icon" :class="[`icon-volume${songMute ? '-off' : ''}`]"></i>
              </a>
            </div>
            <nuxt-link class="name" to="/music" v-if="song">
              {{ song.name }} - 
              <span class="artist">
                <template v-for="(at, index) in song.artists">
                  <span :key="at.id" v-if="index !== 0"> / </span>
                  {{ at.name }}
                </template>
              </span>
            </nuxt-link>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>
  import config from '@@/app.config'
  import logo from '@/static/images/logo.svg'

  export default {
    name: 'AppHeader',
    data () {
      return {
        logo,
        menuSchema: config.constant.menus,
        keyword: '',
        cornerStyle: null,
        searchOpened: false
      }
    },
    computed: {
      menuIndex () {
        return this.menuSchema.findIndex(menu => menu.key === this.$route.name)
      },
      player () {
        if (this.$eventBus) {
          return this.$eventBus.player
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
      }
    },
    watch: {
      menuIndex () {
        this.setCornerStyle()
      }
    },
    mounted () {
      this.setCornerStyle()
    },
    methods: {
      setCornerStyle () {
        const el = this.$refs.menu && this.$refs.menu[this.menuIndex] ? this.$refs.menu[this.menuIndex].$el : null
        if (!el) {
          this.cornerStyle = null
        } else {
          this.cornerStyle = {
            left: el.offsetLeft + 'px',
            width: el.clientWidth + 'px'
          }
        }
      },
      handleToggleSearch () {
        this.searchOpened = !this.searchOpened
        this.$nextTick(() => {
          if (this.searchOpened) {
            this.$refs.searchInput.focus()
          } else {
            this.$refs.searchInput.blur()
          }
        })
      },
      handleCloseSearch () {
        if (this.searchOpened) {
          this.handleToggleSearch()
        }
      },
      handleSearch () {
        if (!this.keyword) {
          return
        }
        this.$router.push(`/search/${this.keyword}`)
        this.handleToggleSearch()
        this.keyword = ''
      },
      prev () {
        this.$eventBus.handlePrevSong()
      },
      next () {
        this.$eventBus.handleNextSong()
      },
      toggleMusicVolume () {
        this.$eventBus.setVolume(this.songMute ? 0.6 : 0)
      },
      toggleMusicPlay () {
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

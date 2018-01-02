<style lang="stylus">
  @import 'index'
</style>

<template>
  <header class="app-header">
    <div class="container">
      <nuxt-link class="nav-logo" to="/">
        <i class="icon icon-logo"></i>
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
        <div class="action-item music">
          <i class="icon icon-music"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        menuSchema: [
          { key: 'index', title: '首页' },
          { key: 'archive', title: '归档' },
          { key: 'music', title: '音乐' },
          { key: 'guestbook', title: '留言墙' },
          { key: 'about', title: '关于' }
        ],
        keyword: '',
        cornerStyle: null,
        searchOpened: false
      }
    },
    computed: {
      menuIndex () {
        return this.menuSchema.findIndex(menu => menu.key === this.$route.name)
      }
    },
    watch: {
      menuIndex () {
        this.setCornerStyle()
      }
    },
    mounted () {
      this.setCornerStyle()
      this.$eventBus.initMusic()
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
      }
    }
  }
</script>

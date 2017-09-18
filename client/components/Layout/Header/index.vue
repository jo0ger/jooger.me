<template>
  <header class="header">
    <div class="wrapper">
      <router-link class="logo" to="/">
        <span>JOOGER</span>
      </router-link>
      <nav class="navigation">
        <a class="search" v-if="isBlogPage" @click.prevent.stop="handleToggleSearch">
          <span class="icon"></span>
        </a>
        <a class="trigger" :class="{ active: showMenu }" @click.prevent.stop="handleToggleMenu">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </a>
      </nav>
    </div>
    <div class="menu" :class="{ active: showMenu }">
      <ul class="list">
        <li class="item" v-for="item in menus" :key="item.key">
          <a :to="item.path" @click.prevent.stop="handleGo(item)">{{ item.title }}</a>
        </li>
      </ul>
    </div>
    <div class="search-pane" :class="{ active: showSearch }">
      <form class="search-form" role="search" action=""
        @submit.stop.prevent="handleSearch">
        <input class="search-input"
          ref="searchInput"
          type="search"
          autocomplete="off"
          autofocus="true"
          placeholder="Search..."
          maxlength="200"
          v-model.trim="keyword"
          @keyup.enter="handleSearch">
        <a class="close" @click.prevent.stop="handleToggleSearch"></a>
      </form>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Layout-Header',
    data () {
      const menus = [
        { key: 'home', title: '首页', path: '/' },
        { key: 'blog', title: '博客', path: '/blog' },
        { key: 'about', title: '关于', path: '/about' }
      ]
      return {
        menus,
        showMenu: false,
        showSearch: false,
        keyword: ''
      }
    },
    computed: {
      isBlogPage () {
        return this.$route.name.includes('blog')
      }
    },
    methods: {
      handleToggleMenu () {
        this.showMenu = !this.showMenu
      },
      handleGo ({ path }) {
        this.$router.push(path)
        this.showMenu = false
      },
      handleSearch () {},
      handleToggleSearch () {
        this.showSearch = !this.showSearch
        this.$store.commit('app/SET_OVERLAY', this.showSearch)
        this.$refs.searchInput[this.showSearch ? 'focus' : 'blur']()
        if (!this.showSearch) {
          this.$nextTick(() => (this.keyword = ''))
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .header {
    position fixed
    z-index 9998
    top 0
    width 100%
    margin-bottom 80px
    padding 20px 0

    @media (max-width: 1366px) and (min-width: 769px) {
      margin-bottom 40px
    }

    @media (max-width: 768px){
      margin-bottom 0
    }

    .wrapper {
      flexLayout(, space-between)
      position relative
      width 100%
      max-width 1440px
      margin 0 auto
      z-index 1

      @media (max-width: 1640px) {
        padding 0 100px
      }

      @media (max-width: 1366px) and (min-width: 769px) {
        padding 0 65px
      }

      @media (max-width: 768px) and (min-width: 480px) {
        padding 0 40px
      }

      @media (max-width: 479px) {
        padding 0 30px
      }

      .logo {
        color $base-color
      }

      .navigation {
        flexLayout(, space-between)
        .search
        .trigger {
          width 26px
          height @width
          margin-left 20px
          padding 2px
        }

        .search {
          flexLayout()
          .icon {
            position relative
            display block
            width 16px
            height @width
            border 2px solid $base-color
            border-radius 100%
            transform rotate(-45deg)

            &::after {
              content ''
              position absolute
              top 12px
              left 5px
              width 2px
              height 7px
              background $base-color
            }
          }
        }

        .trigger {
          flexLayout(column, space-around, flex-start)
          .line {
            display block
            height 2px
            margin 0
            border-radius 1px
            background $base-color
            transition all .3s $ease

            &:nth-of-type(1) {
              width 22px
            }
            &:nth-of-type(2) {
              width 12px
            }
            &:nth-of-type(3) {
              width 17px
            }
          }

          &.active {
            .line {
              &:nth-of-type(1) {
                width 22px
                transform translateY(7px) rotate(45deg)
              }
              &:nth-of-type(2) {
                opacity 0
              }
              &:nth-of-type(3) {
                width 22px
                transform translateY(-7px) rotate(-45deg)
              }
            }
          }
        }
      }

    }
    .menu {
      position fixed
      top 0
      right 0
      bottom 0
      left 0
      width 100%
      height 100%
      background $white
      transform translate3d(0, -100%, 0)
      transition transform .8s cubic-bezier(.85,0,.15,1)

      .list {
        position absolute
        width auto
        top 50%
        left 50%
        transform translate(-50%, -50%)
        .item {
          margin 0 auto
          font-size 3.5rem
          color $text-color

          &:hover {
            color $base-color
          }
        }
      }

      &.active {
        transform translate3d(0, 0, 0)
      }
    }

    .search-pane {
      position fixed
      top 0
      right 0
      left 0
      background $white
      transform translateY(-100%)
      transition transform .8s cubic-bezier(.85,0,.15,1)

      .search-form {
        position relative
        width 100%
        max-width 1440px

        @media (max-width: 1640px) {
          padding 0 100px
        }

        @media (max-width: 1366px) and (min-width: 769px) {
          padding 0 65px
        }

        @media (max-width: 768px) and (min-width: 480px) {
          padding 0 40px
        }

        @media (max-width: 479px) {
          padding 0 30px
        }

        .search-input {
          width 100%
          height 60px
          margin-top 60px
          padding 15px 60px 15px 0
          font-size 1rem
          background transparent
          border 0
          outline none
          -webkit-appearance none
        }

        .close {
          position absolute
          right 75px
          bottom 10px
          width 20px
          height @width
          cursor pointer
          transform translateY(-50%)

          &::before
          &::after {
            content ''
            position absolute
            top 50%
            left 50%
            display block
            width 14px
            height 2px
            background $text-color-secondary
            opacity .6
            transform-origin center center
            transform translate(-50%, -50%) rotate(45deg)
            transition opacity .3s $ease 
          }

          &::after {
            transform translate(-50%, -50%) rotate(-45deg)
          }

          &:hover {
            &::before
            &::after {
              opacity 1
            }
          }
          
        }
      }

      &.active {
        transform translateY(0)
      }
    }
  }

</style>

<template>
  <header class="header">
    <div class="wrapper">
      <router-link class="logo" to="/">
        <span>JOOGER</span>
      </router-link>
      <nav class="navigation">
        <a class="search" v-if="isBlogPage">
          <span class="icon"></span>
        </a>
        <a class="trigger" :class="{ active: showMenu }" @click="handleToggleMenu">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </a>
      </nav>
    </div>
    <div class="menu" :class="{ active: showMenu }">
      <ul class="list">
        <li class="item" v-for="item in menus" :key="item.key">
          <a :to="item.path" @click="handleGo(item)">{{ item.title }}</a>
        </li>
      </ul>
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
        showMenu: false
      }
    },
    computed: {
      isBlogPage () {
        return this.$route.name === 'blog'
      }
    },
    methods: {
      handleToggleMenu () {
        this.showMenu = !this.showMenu
      },
      handleGo ({ path }) {
        this.$router.push(path)
        this.showMenu = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .header {
    position fixed
    z-index 9999
    top 0
    width 100%
    padding 20px 0

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
        color $blue
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
            border 2px solid $blue
            border-radius 100%
            transform rotate(-45deg)

            &::after {
              content ''
              position absolute
              top 12px
              left 5px
              width 2px
              height 7px
              background $blue
            }
          }
        }

        .trigger {
          flexLayout(column, space-around, flex-start)
          .line {
            display block
            height 2px
            margin 2px 0
            background $blue
            transition all .3s $ease

            &:nth-of-type(1) {
              width 24px
            }
            &:nth-of-type(2) {
              width 12px
            }
            &:nth-of-type(3) {
              width 18px
            }
          }

          &.active {
            .line {
              &:nth-of-type(1) {
                width 24px
                transform translateY(7px) rotate(45deg)
              }
              &:nth-of-type(2) {
                opacity 0
              }
              &:nth-of-type(3) {
                width 24px
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
            color $blue
          }
        }
      }

      &.active {
        transform translate3d(0, 0, 0)
      }
    }
  }

</style>

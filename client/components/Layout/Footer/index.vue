<template>
  <footer class="footer" :style="footerStyle">
    <div class="wrapper">
      <div class="contact-list" v-if="option.contact && option.contact.length">
        <a class="item" :name="item.title" :href="item.url" target="_blank" rel="noopener" v-for="item in option.contact" :key="item.title">
          <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
        </a>
      </div>
      <p>版权所有 © 2017 {{ me.name }}. 保留所有权利
        <a v-if="!mobileLayout" href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener" class="record">
          豫ICP备17040457号
        </a>
      </p>
      <p v-if="mobileLayout">
        <a href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener" class="record">
          豫ICP备17040457号
        </a>
      </p>
      <p>
        Powered by 
        <a class="link" target="_blank" rel="noopener" href="https://github.com/nuxt/nuxt.js">nuxt.js</a>、
        Developed by 
        <a class="link" target="_blank" rel="noopener" :href="'https://github.com/jo0ger'">{{ me.name }}</a>
      </p>
    </div>
  </footer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout-Footer',
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout',
        me: 'me/me',
        option: 'option/option'
      }),
      isAboutPage () {
        return this.$route.name === 'about'
      },
      footerStyle () {
        return this.isAboutPage ? {
          paddingBottom: '125px'
        } : null
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .footer {
    width 100%
    margin-top 7rem
    padding 3rem 0 8rem
    color $text-color-secondary

    .wrapper {
      position relative
      width 100%
      max-width $content-max-width
      margin 0 auto
      text-align center
      font-size .75rem
      layout-wrapper()

      .contact-list {
        margin-bottom 2rem
        .item {
          display inline-block
          margin 0 .5rem
          padding 5px

          .iconfont {
            font-size 1.3rem  
          }

          &:hover {
            color $text-color
          }
        }
      }
      

      p {
        margin-bottom 1rem
      }

      .record {
        margin-left .5rem
      }

    }
  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'
  
  .dark-page {
    .footer {
      color $text-color-secondary-dark

      .contact-list {
        .item {
          &:hover {
            color $text-color-dark
          }
        }
      }

      .link {
        color $text-color-secondary-dark
        border-color $text-color-secondary-dark
      }
    }
  }
</style>

<template>
  <div class="share-box" :class="{ show: sharebox }">
    <h3 class="title">分享至</h3>
    <div class="content">
      <div class="share-swiper" key="swiper">
        <div class="swiper-container" v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <a :title="item.title"
              rel="nofollow"
              class="swiper-slide share-item"
              :class="[item.key]"
              v-for="item in shareList"
              :key="item.key"
              :data-clipboard-text="item.key === 'links' ? url : ''"
              @click.prevent="handleClick(item)">
              <div class="icon">
                <i class="iconfont" :class="[`icon-${item.key}`]"></i>
              </div>
              <span class="text">{{ item.title }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <a class="cancel" @click.prevent.stop="handleCancel">
      取消
    </a>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout-Share',
    data () {
      const shareList = [
      { key: 'links', title: '复制链接' },
        { key: 'wechat', title: '微信' },
        { key: 'weibo', title: '微博' },
        { key: 'qzone', title: 'QQ空间' },
        { key: 'douban', title: '豆瓣' },
        { key: 'evernote', title: '映象笔记' },
        { key: 'twitter', title: 'Twitter' },
        { key: 'facebook', title: 'Facebook' },
        { key: 'mail', title: '邮箱' }
      ]
      return {
        swiperOption: {
          initialSlide: 0,
          slidesPerView: 'auto',
          spaceBetween: 14,
          setWrapperSize: true,
          grabCursor: true,
          autoplayDisableOnInteraction: false
        },
        shareList
      }
    },
    computed: {
      ...mapGetters({
        sharebox: 'app/sharebox'
      }),
      url () {
        return `https://jooger.me${this.$route.fullPath}`
      }
    },
    mounted () {
      this.initClipboard()
    },
    beforeDestroy () {
      this._clipboard.destroy()
    },
    methods: {
      initClipboard () {
        this._clipboard = new Clipboard('.share-box .share-item.links')
        this._clipboard.on('success', e => this.$message('复制链接成功'))
        this._clipboard.on('err', e => this.$message('复制链接失败'))
      },
      getTitle () {
        try {
          if (document) return document.title
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(err)
          }
          return 'Jooger.me'
        }
      },
      getDescription () {
        try {
          if (document) return document.getElementsByName('description')[0].getAttribute('content')
        } catch (err) {
          if (process.env.NODE_ENV !== 'production') {
            console.error(err)
          }
          return ''
        }
      },
      handleCancel () {
        this.$store.commit('app/SET_SHARE_BOX', false)
      },
      handleClick ({ key, title }) {
        if (key === 'links') {
          return
        }
        let link = ''
        const url = this.url
        switch (key) {
          case 'wechat':
            link = `http://qr.topscan.com/api.php?text=${url}&w=300&el=h&m=10`
            break
          case 'weibo':
            link = `http://service.weibo.com/share/share.php?url=${url}&title=${this.getTitle()}&source=${url}&sourceUrl=${url}&content=${this.getDescription()}`
            break
          case 'qzone':
            link = `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${this.getTitle()}&summary=${this.getDescription()}&site=${url}`
            break
          case 'douban':
            link = `https://www.douban.com/recommend/?url=${url}&title=${this.getTitle()}`
            break
          case 'evernote':
            link = `https://www.evernote.com/clip.action?url=${url}&title=${this.getTitle()}`
            break
          case 'twitter':
            link = `http://twitter.com/share?text=${this.getTitle()}&url=${url}`
            break
          case 'facebook':
            link = `https://www.facebook.com/sharer/sharer.php?u=${url}`
            break
          case 'mail':
            link = `mailto:?subject=${this.getTitle()}&body=${url}`
            break
          default:
            break
        }
        if (link.includes('mailto:')) {
          link = link.replace(/\s|\||Jooger.me/g, '')
        } else {
          link = encodeURI(link)
        }
        openWindow(link, title)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .share-box {
    position fixed
    right 0
    bottom 0
    left 0
    width 100%
    max-width 500px
    margin 0 auto
    overflow hidden
    z-index 9998
    background $white
    border-top-left-radius 2px
    border-top-right-radius @border-top-left-radius
    text-align center
    // box-shadow 0 0 40px -5px alpha($black, .05)
    transform translate3d(0, 100%, 0)
    transition transform .8s $fuck

    .title {
      padding 1rem 2rem
      font-size 1rem
      color $text-color-secondary
    }

    .content {
      margin 1rem 0

      .share-item {
        width 3.6rem
        margin 0 1rem
        padding .5rem 0
        opacity 0
        visibility hidden
        transform translateY(2rem)
        transition all .6s $ease-out

        .icon {
          width 3.5rem
          height @width
          line-height @width
          margin 0 auto
          color $white
          border-radius 100%
          font-size 0
          transition all .3s $ease
          .iconfont {
            font-size 1.5rem
          }

          &:hover
          &:active {
            box-shadow 0 0 10px 5px alpha($black, .1)
            transform scale(.9)
          }
        }

        .text {
          display inline-block
          margin-top .5rem
          font-size .75rem
        }

        &.wechat {
          .icon {
            background #9ddb62
          }
        }
        &.qzone {
          .icon {
            background #ffcd30
          }
        }
        &.weibo {
          .icon {
            background #ec0431
          }
        }
        &.douban {
          .icon {
            background #00b530
          }
        }
        &.evernote {
          .icon {
            background #1dbe65
          }
        }
        &.twitter {
          .icon {
            background #00a3ef
          }
        }
        &.facebook {
          .icon {
            background #3863a6
          }
        }
        &.mail {
          .icon {
            background #5ba0f8
          }
        }
        &.links {
          .icon {
            background #a0a0a0
          }
        }
      }
    }

    .cancel {
      display block
      width 100%
      border-top 1px solid $border-color-4
      padding 1rem 2rem

      &:hover {
        background $grey
      }
    }
    
    &.show {
      transform translate3d(0, 0, 0)

      .content {
        .share-item {
          opacity 1
          visibility visible
          transform translateY(0)

          for n in (1..9) {
            &:nth-child({n}) {
              transition-delay .4s + (.05 * (n - 1))s
            }
          }
        }
      }
    }
  }
</style>

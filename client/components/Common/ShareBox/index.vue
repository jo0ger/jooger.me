<template>
  <div class="share-box">
    <div class="wrapper">
      <a :title="item.title"
        rel="nofollow"
        class="share-item"
        :class="[item.key]"
        v-for="item in shareList"
        :key="item.key"
        :data-clipboard-text="item.key === 'links' ? url : ''"
        @click.prevent="handleClick(item)">
        <i class="iconfont" :class="[`icon-${item.key}`]"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ShareBox',
    data () {
      const shareList = [
        { key: 'wechat', title: '微信' },
        { key: 'weibo', title: '微博' },
        { key: 'qzone', title: 'QQ空间' },
        { key: 'douban', title: '豆瓣' },
        { key: 'evernote', title: '映象笔记' },
        { key: 'twitter', title: 'Twitter' },
        { key: 'facebook', title: 'Facebook' },
        { key: 'mail', title: '邮箱' },
        { key: 'links', title: '复制链接' }
      ]
      return {
        shareList
      }
    },
    computed: {
      ...mapGetters({
        mobileLayout: 'app/mobileLayout'
      }),
      url () {
        return `https://jooger.me${this.$route.fullPath}`
      }
    },
    mounted () {
      this._clipboard = new Clipboard('.share-box .share-item.links')
    },
    beforeDestroy () {
      this._clipboard.destroy()
    },
    methods: {
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
        this.openWindow(link, title)
      },
      openWindow (url, title) {
        const sw = screen.availWidth
        const sh = screen.availHeight
        const w = sw / 3
        const h = sh / 2
        const t = (sh - h) / 2
        const l = (sw - w) / 2
        const params = `top=${t},left=${l},width=${w},height=${h},scrollbars=0,status=0,menubar=0,resizable=2,location=0`
        // 打开新窗口
        const win = window.open(url, title, params)
        // 新窗口获得焦点
        win.focus()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'
  
  .share-box {
    text-align center

    .share-item {
      display inline-block
      padding 10px
      color $text-color-secondary

      .iconfont {
        font-size 20px
      }

      &:hover {
        transform scale(1.1)
        &.wechat {
          color #9ddb62
        }
        &.qzone {
          color #ffcd30
        }
        &.weibo {
          color #ec0431
        }
        &.douban {
          color #00b530
        }
        &.evernote {
          color #1dbe65
        }
        &.twitter {
          color #00a3ef
        }
        &.facebook {
          color #3863a6
        }
        &.mail {
          color $blue
        }
        &.links {
          color $base-color
        }
      }
    }
  }
</style>

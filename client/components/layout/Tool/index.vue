<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="app-tool">
    <transition name="fade">
      <div class="share-list" v-show="showShareList"
        v-clickoutside="handleHideShare">
        <a class="share-item"
          :class="[item.key]"
          v-for="item in shareList"
          :key="item.key"
          :title="item.title"
          rel="nofollow"
          @click="handleShare(item)">
          <i class="icon" :class="[`icon-${item.key}`]"></i>
        </a>
      </div>
    </transition>
    <div class="tool-list">
      <a class="tool-item" v-if="showShare" @click.stop.prevent="showShareList = !showShareList">
        <i class="icon icon-share"></i>
      </a>
      <a class="tool-item">
        <i class="icon icon-feedback"></i>
      </a>
      <a class="tool-item"
        @click="handleGoToTop"
        @mouseover="slowScroll(-3)"
        @mouseleave="stopSlowScroll()">
        <i class="icon icon-arrow-up"></i>
      </a>
      <a class="tool-item"
        @click="handleGoToBottom"
        @mouseover="slowScroll(3)"
        @mouseleave="stopSlowScroll()">
        <i class="icon icon-arrow-down"></i>
      </a>
    </div>
  </div>
</template>

<script>
  import config from '@@/app.config'
  import { scrollTo, easing, requestAnimationFrame, cancelAnimationFrame } from '@/utils'

  export default {
    name: 'AppTool',
    data () {
      return {
        showShareList: false,
        shareList: config.constant.shares
      }
    },
    computed: {
      showShare () {
        return !['article-id'].includes(this.$route.name)
      }
    },
    methods: {
      slowScroll (delta = 3) {
        const step = () => {
          const scrollTop = window.scrollY
          const targetScrollTop = scrollTop + delta
          const canScroll = targetScrollTop > 0 && targetScrollTop < (document.documentElement.scrollHeight - window.innerHeight)
          if (!canScroll) {
            return false
          }
          window.scrollTo(0, targetScrollTop)
          cancelAnimationFrame(this._afid)
          this._afid = requestAnimationFrame(step)
        }
        this._afid = requestAnimationFrame(step)
      },
      stopSlowScroll () {
        cancelAnimationFrame(this._afid)
      },
      handleGoToTop () {
        scrollTo(0, 500, { easing: easing['ease'] })
      },
      handleGoToBottom () {
        scrollTo(window.scrollY + window.innerHeight, 500, { easing: easing['ease'] })
      },
      handleHideShare () {
        if (this.showShareList) {
          this.showShareList = false
        }
      },
      handleShare ({ key }) {
        this.$share.share(key)
      }
    }
  }
</script>

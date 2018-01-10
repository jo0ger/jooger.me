<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="app-tool">
    <ul class="tool-list">
      <li class="tool-item">
        <i class="icon icon-share"></i>
      </li>
      <li class="tool-item"
        @click="handleGoToTop"
        @mouseover="slowScroll(-3)"
        @mouseleave="stopSlowScroll()">
        <i class="icon icon-arrow-up"></i>
      </li>
      <li class="tool-item"
        @click="handleGoToBottom"
        @mouseover="slowScroll(3)"
        @mouseleave="stopSlowScroll()">
        <i class="icon icon-arrow-down"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import { scrollTo, easing, requestAnimationFrame, cancelAnimationFrame } from '@/utils'

  export default {
    name: 'AppTool',
    data () {
      return {}
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
      }
    }
  }
</script>


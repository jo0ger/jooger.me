<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="affix" :class="{'is-fixed': fixed}" :style="style">
    <slot></slot>
  </div>
</template>

<script>
  import { getScroll, getOffset } from '@/utils'

  export default {
    name: 'Affix',
    data () {
      return {
        fixed: false,
        style: {},
        _initialOffset: 0
      }
    },
    props: {
      offsetTop: {
        tyle: [String, Number],
        default: 0
      },
      offsetBottom: Number
    },
    computed: {
      offsetType () {
        return this.offsetBottom !== undefined && this.offsetBottom !== null ? 'bottom' : 'top'
      }
    },
    watch: {
      'offsetTop' (newVal, oldVal) {
        if (newVal !== null && oldVal !== undefined && typeof newVal === 'number') {
          this.handleScroll()
          if (!this._resizeHandler) {
            // 只绑定一次
            this.bindEvent()
          }
        }
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      this.unbindEvent()
    },
    activated () {
      this.init()
    },
    // keep-alive动态组件缓存的话，不会销毁组件实例
    // 必须在这里解绑event
    // 缓存组件每次mounted时，都是不同的组件了
    deactivated () {
      this.unbindEvent()
    },
    methods: {
      init () {
        this._initialOffset = getOffset(this.$el)
        this.handleScroll()
        if (!this._resizeHandler) {
          this.bindEvent()
        }
      },
      bindEvent () {
        if (this.offsetTop === null) {
          return
        }
        window.addEventListener('scroll', this.handleScroll, false)
        // 这里得套一层，不然用bind的话，在unbindEvent中获取不到
        this._resizeHandler = e => this.handleScroll(e, true)
        window.addEventListener('resize', this._resizeHandler, false)
      },
      unbindEvent () {
        window.removeEventListener('scroll', this.handleScroll, false)
        window.removeEventListener('resize', this._resizeHandler, false)
        this._resizeHandler = null
        this.fixed = false
      },
      // isResize判定是否是window resize触发
      // window resize触发的话需要获取父元素的width和offsetLeft
      handleScroll (e, isResize = false) {
        const fixed = this.fixed
        const scrollTop = getScroll(window, true)
        const elOffset = getOffset(this.$el)
        const windowHeight = window.innerHeight
        const elHeight = this.$el.offsetHeight
        let parent = null
        let parentOffset = null
        
        // Fixed Top
        if (this.offsetType === 'top' && ((elOffset.top - this.offsetTop) < scrollTop && !fixed || (isResize && fixed))) {
          this.fixed = true
          if ((isResize && fixed)) {
            parent = this.$el.parentNode
            parentOffset = getOffset(parent)
          }
          this.style = {
            top: `${this.offsetTop}px`,
            left: `${(isResize && fixed) ? parentOffset.left : elOffset.left}px`,
            width: `${(isResize && fixed) ? parent.offsetWidth : this.$el.offsetWidth}px`
          }
          this.$emit('on-change', true)
        } else if ((this._initialOffset.top - this.offsetTop) > scrollTop && this.offsetType === 'top' && fixed) {
          this.fixed = false
          this.style = null
          this.$emit('on-change', false)
        }
        // Fixed Bottom
        if (this.offsetType === 'bottom' && ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && !fixed || (isResize && fixed))) {
          this.fixed = true
          if ((isResize && fixed)) {
            parent = this.$el.parentNode
            parentOffset = getOffset(parent)
          }
          this.style = {
            bottom: `${this.offsetBottom}px`,
            left: `${(isResize && fixed) ? parentOffset.left : elOffset.left}px`,
            width: `${(isResize && fixed) ? parent.offsetWidth : this.$el.offsetWidth}px`
          }
          this.$emit('on-change', true)
        } else if ((this._initialOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType === 'bottom' && fixed) {
          this.fixed = false
          this.style = null
          this.$emit('on-change', false)
        }
      }
    }
  }
</script>

<template>
  <transition name="message-fade">
    <div class="message" v-show="visible">
      <div class="wrapper">
        <p class="content">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import { isType } from '@/utils'

  export default {
    name: 'Message',
    data () {
      return {
        visible: false,
        message: '',
        duration: 3000,
        closed: false,
        onClose: null
      }
    },
    watch: {
      closed (val) {
        if (val) {
          this.visible = false
          this.$el.addEventListener('transitionend', this.destroy)
        }
      }
    },
    mounted () {
      this.startTimer()
    },
    methods: {
      startTimer () {
        if (this.duration > 0) {
          this._timer = setTimeout(() => {
            if (!this.closed) {
              this.close()
            }
          }, this.duration)
        }
      },
      close () {
        this.closed = true
        if (isType(this.onClose, 'Function')) {
          this.onClose(this)
        }
      },
      destroy () {
        this.$el.removeEventListener('transitionend', this.destroy)
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .message {
    position fixed
    top 0
    left 50%
    transform translate(-50%, 0)
    z-index 10001

    .wrapper {
      padding 10px 20px
      background $black
      color $white
      border-radius 2px
    }
  }
</style>

<style lang="stylus">
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  body.dark-page {
    .message {
      .wrapper {
        background $white
        color $text-color
      }
    }
  }
</style>

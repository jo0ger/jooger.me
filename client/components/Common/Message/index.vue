<template>
  <transition name="slide-down">
    <div class="message" v-show="visible">
      <div class="wrapper">
        <p class="content">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
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
          this.$el.addEventListener('transitionend', this.destroy, { passive: true })
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
    right 0
    left 0
    width auto
    max-width max-content
    margin 0 auto
    text-align center
    z-index 100001

    +xxs() {
      max-width none
    }

    .wrapper {
      padding .8rem 1.25rem
      background $black
      color $white
      border-bottom-left-radius 4px
      border-bottom-right-radius 4px
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

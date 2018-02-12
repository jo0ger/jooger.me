<style lang="stylus">
  @import 'index'
</style>

<template>
  <transition name="slide-up-message">
    <div class="message" v-show="visible">
      <div class="wrapper">
        <i class="icon" :class="[`icon-${type}`]" v-if="type"></i>
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
        type: '', // success | error | warning | info
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

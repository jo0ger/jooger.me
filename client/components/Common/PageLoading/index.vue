<template>
  <div class="page-loading" :class="classes">
    <div class="bar">
      <span class="progress" :style="progressStyle"></span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Common-PageLoading',
    data () {
      return {
        duration: 5000,
        loading: false,
        canSuccess: true,
        progress: 0,
        timer: null
      }
    },
    computed: {
      ...mapGetters({
        page: 'app/page'
      }),
      classes () {
        return {
          'is-loading': this.loading
        }
      },
      progressStyle () {
        const style = {
          width: this.progress + '%'
        }
        if (!this.canSuccess) {
          style.backgroundColor = '#f04134'
        }
        return style
      }
    },
    methods: {
      start () {
        this.loading = true
        this.canSuccess = true
        this._cut = 10000 / Math.floor(this.duration)
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
          this.progress = 0
        }
        if (this._delayTimer) {
          clearTimeout(this._delayTimer)
          this._delayTimer = null
        }
        this._delayTimer = setTimeout(() => {
          this.timer = setInterval(() => {
            this._increase(this._cut * Math.random())
            if (this.progress >= 95) {
              this.finish()
            }
          }, 100)
        }, 600)
        document.body.style.overflow = 'hidden'
      },
      finish () {
        this.progress = 100
        this.hide()
        document.body.style.overflow = 'auto'
      },
      fail () {
        this.canSuccess = false
      },
      _increase (num) {
        this.progress += Math.floor(num)
      },
      decrease (num) {
        this.progress -= Math.floor(num)
      },
      hide () {
        clearTimeout(this._delayTimer)
        clearInterval(this.timer)
        this.timer = null
        this._delayTimer = null
        setTimeout(() => {
          this.loading = false
          setTimeout(() => {
            this.progress = 0
          }, 200)
        }, 500)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .page-loading {
    position relative
    z-index 99999

    &::before,
    &::after {
      content ''
      position fixed
      left 0
      width 100%
      height 50%
      z-index 1
      background $black
      transform translateZ(0)
      transition transform .2s .2s
    }

    &::before {
      top 0
      transform translateY(-101%)
    }

    &::after {
      bottom 0
      transform translateY(101%)
    }

    .bar {
      position fixed
      top 50%
      left 50%
      width calc(100% - 64px)
      height 2px
      z-index 2
      background alpha($white, .4)
      border-radius 1px
      transform translate(-50%, -50%)
      visibility hidden
      overflow hidden
      transition visibility 0s .2s, transform .2s 0s ease-in

      .progress {
        display block
        width 0
        height 100%
        background $white
        transition width .2s, opacity .2s
      }
    }

    &.is-loading {

      &::before,
      &::after {
        transform translateY(0)
        transition-delay 0s
      }

      .bar {
        visibility visible
        transform translate(-50%, -50%) scaleX(.3)
        transition visibility 0s .2s, transform .2s .2s ease-in
      }
    }
  }
</style>

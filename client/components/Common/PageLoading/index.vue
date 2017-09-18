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
    name: 'PageLoading',
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
        return {
          width: this.progress + '%'
        }
      }
    },
    methods: {
      start () {
        this.loading = true
        this._cut = 10000 / Math.floor(this.duration)
        if (this.timer) {
          clearInterval(this.timer)
          this.progress = 0
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
            this.timer = setInterval(() => {
              this._increase(this._cut * Math.random())
              if (this.progress >= 95) {
                this.finish()
              }
            }, 100)
          }, 600)
        })
      },
      finish () {
        if (this.timer) {
          this.hide()
        } else {
          const timerWatcher = this.$watch('timer', () => {
            setTimeout(() => {
              this.hide()
            }, 100)
          })
        }
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
        this.progress = 100
        clearInterval(this.timer)
        this.timer = null
        setTimeout(() => {
          this.loading = false
          this.$nextTick(() => {
            setTimeout(() => {
              this.progress = 0
              this.$store.commit('app/PAGE_LOADED')
            }, 200)
          })
        }, 500)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .page-loading {

    &::before,
    &::after {
      content ''
      position fixed
      left 0
      width 100%
      height 50%
      z-index 2017
      background $white
      transform translateZ(0)
      transition transform .2s .2s
    }

    &::before {
      top 0
      transform translateY(-100%)
    }

    &::after {
      bottom 0
      transform translateY(100%)
    }

    .bar {
      position fixed
      top 50%
      left 50%
      width calc(100% - 64px)
      height 2px
      z-index 2018
      background $grey
      border-radius 1px
      transform translate(-50%, -50%)
      visibility hidden
      overflow hidden
      transition visibility 0s .2s, transform .2s 0s ease-in

      .progress {
        display block
        height 100%
        width 0
        background $blue
        // background #ff3b30
        transition width .2s, opacity .2s
        // transform-origin left center
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

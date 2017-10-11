<template>
  <div class="hero">
    <div class="fly-bird">
      <div class="sky">
        <div class="wind" v-for="n in windNum" :key="n"></div>
        <div class="bird">
          <div class="head"></div>
          <div class="wing-left">
            <div class="wing-left-top"></div>
          </div>
          <div class="wing-right">
            <div class="wing-right-top"></div>
          </div>
          <div class="tail-left"></div>
          <div class="tail-right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Common-Hero',
    props: {
      type: {
        type: String,
        validator (val) {
          return ['fly-bird'].includes(val)
        }
      }
    },
    data () {
      return {
        windNum: 20
      }
    }
  }

</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  randomColor() {
    return rgba(
      random(, 255 - red($base-color)) + red($base-color),
      random(, 255 - blue($base-color)) + blue($base-color),
      random(, 255 - green($base-color)) + green($base-color),
    .6)
  }

  .hero {
    width 100%
    height @width
    flexLayout()
  }

  .fly-bird {
    perspective 400px

    .sky {
      will-change auto
      transform-style preserve-3d
      animation fly 10000ms linear infinite

      .wind {
        position absolute
        left 50%
        width 10px
        height 200px
        margin-left -2px
        border-radius 9999px
        overflow hidden
        will-change auto

        for n in 1..20 {
          &:nth-child({n}) {
            transform translate3d(
              random(-400, 400) - 0px,
              random(-300, 300) - 150px,
              random(-200, 200) - 100px
            ) rotateY(90deg)

            &::before {
              content ''
              position absolute
              width 10px
              height 300px
              background rgba(red($base-color), green($base-color), random(,255), .3)
              border-radius 999px
              transform translateY(-300px)
              animation wind (random(,2000) + 1000ms) (random(,4000) + 1000ms) linear infinite
            }
          }
        }
      }

      .bird {
        position relative
        width 30px
        height 40px
        background alpha($base-color, .8)

        .head {
          position absolute
          top -30px
          border-right 15px solid transparent
          border-bottom 30px solid alpha($base-color, .8)
          border-left 15px solid transparent
          transform-origin 50% 100%
          transform rotateX(-20deg)
        }

        .wing-left {
          position absolute
          left -30px
          height 100%
          border-right 30px solid alpha($base-color, .8)
          border-bottom 10px solid transparent
          transform-origin 100% 0
          animation wing-left 1000ms cubic-bezier(.36, .10, .16, 1) infinite alternate

          &-top {
            position absolute
            left -30px
            border-right 30px solid alpha($base-color, .8)
            border-bottom 30px solid transparent
            transform-origin 100% 0
            animation wing-left 1000ms cubic-bezier(.545, .08, .52, .975) infinite alternate
          }
        }

        .wing-right {
          position absolute
          left 30px
          height 100%
          border-left 30px solid alpha($base-color, .8)
          border-bottom 10px solid transparent
          transform-origin 0 0
          animation wing-right 1000ms cubic-bezier(.36, .10, .16, 1) infinite alternate

          &-top {
            position absolute
            border-left 30px solid alpha($base-color, .8)
            border-bottom 30px solid transparent
            transform-origin 0 0
            animation wing-right 1000ms cubic-bezier(.545, .08, .52, .975) infinite alternate
          }
        }

        .tail-left {
          position absolute
          top 40px
          border-right 30px solid transparent
          border-top 40px solid alpha($base-color, .8)
          transform-origin 50% 0
          transform rotateX(-20deg)
        }

        .tail-right {
          position absolute
          top 40px
          border-left 30px solid transparent
          border-top 40px solid alpha($base-color, .8)
          transform-origin 50% 0
          transform rotateX(-20deg)
        }
      }
    }
  }


  @keyframes fly {
    0% {
      transform: rotateX(-120deg) rotateZ(0deg) rotateX(10deg);
    }
    100% {
      transform: rotateX(-120deg) rotateZ(360deg) rotateX(10deg);
    }
  }
  @keyframes wing-left {
    0% {
      transform: rotateY(-40deg);
    }
    100% {
      transform: rotateY(40deg);
    }
  }
  @keyframes wing-right {
    0% {
      transform: rotateY(40deg);
    }
    100% {
      transform: rotateY(-40deg);
    }
  }
  @keyframes wind {
    0% {
      transform: translateY(-300px);
    }
    100% {
      transform: translateY(200px);
    }
  }
  
</style>

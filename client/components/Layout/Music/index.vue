<template>
  <div class="music-pane" :class="{ playing: musicControl.playing }">
    <div class="bg" :style="bgStyle"></div>
    <div class="overlay"></div>
    <div class="container" v-if="song">
      <div class="title">
        <h1 class="name">{{ song.name }}</h1>
      </div>
      <div class="cover">
        <img :src="cover" alt="">
      </div>
      <div class="lyric"></div>
      <div class="control">
        <div class="progress">
          <span class="time used-time">{{ usedTime }}</span>
          <div class="bar">
            <span class="rate" :style="rateStyle"></span>
            <div class="ball" :style="ballStyle"></div>
          </div>
          <span class="time total-time">{{ totalTime }}</span>
        </div>
        <div class="action">
          <a class="prev" @click.prevent.stop="handlePrevMusic"></a>
          <a class="toggle" @click.prevent.stop="handleToggleMusic">
            <transition name="fade" mode="out-in">
              <span class="state pause" v-if="musicControl.playing"></span>
              <span class="state play" v-else></span>
            </transition>
          </a>
          <a class="next" @click.prevent.stop="handleNextMusic"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: '',
    computed: {
      ...mapGetters({
        showMusic: 'app/showMusic',
        musicList: 'music/list',
        musicControl: 'app/musicControl'
      }),
      song () {
        return this.musicList[this.musicControl.index]
      },
      cover () {
        return this.song ? this.song.album.picUrl + '?param=300y300' : ''
      },
      bgStyle () {
        if (this.cover) {
          return {
            backgroundImage: `url(${this.cover})`
          }
        }
      },
      rateStyle () {
        return {
          transform: `scaleX(${this.musicControl.progress})`
        }
      },
      ballStyle () {
        return {
          left: `${this.musicControl.progress * 100}%`
        }
      },
      usedTime () {
        return this.formatTime(Math.floor(this.song.duration / 1000 * this.musicControl.progress))
      },
      totalTime () {
        return this.formatTime(Math.floor(this.song.duration / 1000))
      }
    },
    mounted () {
      // this.$music.play()
    },
    methods: {
      formatTime (secs = 0) {
        const minutes = Math.floor(secs / 60) || 0
        const seconds = (secs - minutes * 60) || 0
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
      },
      handleToggleMusic () {
        this.$music[this.musicControl.playing ? 'pause' : 'play']()
      },
      handlePrevMusic () {
        this.$music.prev()
      },
      handleNextMusic () {
        this.$music.next()
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .music-pane {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    width 100%
    height 100%
    background $white
    z-index 9997
    overflow hidden
    color $white

    .bg {
      position absolute
      top -10%
      left -10%
      width 120%
      height 120%
      filter blur(50px)
      // IOS 9+
      // backdrop-filter blur(15px)
      background-color $white
      background-repeat no-repeat
      background-size cover
      background-position center center
      transition background 1s $ease
    }

    .overlay {
      position absolute
      top -10%
      left -10%
      width 120%
      height 120%
      background alpha($black, .7)
    }

    .container {
      flexLayout(column, flex-start)
      position relative
      width 100%
      max-width $content-max-width
      height 100%
      margin 0 auto
      padding 150px 100px 100px
      padding-top 150px

      @media (max-width: 1366px) and (min-width: 769px) {
        padding 120px 65px
      }

      @media (max-width: 768px) and (min-width: 480px) {
        padding 90px 40px
      }

      @media (max-width: 479px) {
        padding 70px 15px
      }

      .title {
        margin-bottom 60px

        @media (max-width: 1366px) and (min-width: 769px) {
          margin-bottom 50px
        }

        @media (max-width: 768px) and (min-width: 480px) {
          margin-bottom 40px
        }

        @media (max-width: 479px) {
          margin-bottom 30px
        }

      }

      .cover {
        img {
          width 300px
          height @width
          border 8px solid alpha($white, .2)
          border-radius 100%
          animation rotate 20s linear infinite
          animation-play-state paused
        }
      }

      .lyric {}

      .control {
        flex 0 0 200px
        width 100%
        margin-top 60px
        padding 0 60px

        @media (max-width: 1366px) and (min-width: 769px) {
          margin-top 45px
          padding 0 50px
        }

        @media (max-width: 768px) and (min-width: 480px) {
          margin-top 30px
          padding 0 40px
        }

        @media (max-width: 479px) {
          margin-top 30px
          padding 0
        }

        .progress {
          flexLayout(, space-around)
          margin-bottom 30px

          .time {
            padding 0 30px
            color alpha($white, .6)

            @media (max-width: 1366px) and (min-width: 769px) {
              padding 0 25px
            }

            @media (max-width: 768px) and (min-width: 480px) {
              padding 0 20px
            }

            @media (max-width: 479px) {
              padding 0 15px
            }
          }

          .bar {
            flex 1
            position relative
            height 4px
            background alpha($white, .2)
            border-radius 2px
            cursor pointer

            .ball {
              position absolute
              left 0
              width 16px
              height @width
              margin-top -6px
              border-radius 100%
              background $white
              cursor pointer
              transform translateX(-50%)
            }

            .rate {
              position absolute
              left 0
              width 100%
              height 100%
              background $white
              border-radius 2px
              transform scaleX(0)
              transform-origin 0
            }
          }
        }

        .action {
          flexLayout(, space-around)
          
          & > a {
            display inline-block
          }

          .prev
          .next {
            &::before
            &::after {
              content ''
              display inline-block
              border-top 8px solid transparent
              border-right 16px solid alpha($white, .6)
              border-bottom 8px solid transparent
              transition border .3s $ease
            }

            &:hover {
              &::before
              &::after {
                border-right-color alpha($white, .8)
              }
            }
          }

          .next {
            &::before
            &::after {
              transform rotateZ(180deg)
            }
          }

          .toggle {
            flexLayout()
            width 80px
            height @width
            border 2px solid alpha($white, .6)
            border-radius 100%

            .state {
              position relative
              display block

              &.play {
                border-top 12px solid transparent
                border-bottom 12px solid transparent
                border-left 24px solid alpha($white, .6)
                transform translateX(2px)
              }

              &.pause {
                &:before
                &::after {
                  content ''
                  position absolute
                  top -12px
                  left 6px
                  width 4px
                  height 24px
                  border-radius 2px
                  background alpha($white, .6)
                }

                &::before {
                  left -6px
                }
              }
            }

            &:hover {
              border-color alpha($white, .8)
              transition border-color .3s $ease

              .play {
                border-left-color alpha($white, .8)
                transition border-color .3s $ease
              }

              .pause {
                &:before
                &::after {
                  background alpha($white, .8)
                  transition background .3s $ease
                }
              }
            }
          }
        }
      }

    }

    &.playing {
      .cover {
        img {
          animation-play-state running
        }
      }
    }
  }

  @keyframes rotate {
    0% {
      transform rotateZ(0deg)
    }
    100% {
      transform rotateZ(360deg)
    }
  }
</style>

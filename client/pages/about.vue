<template>
  <section class="about-page">
    <div class="block">
      <h3>幸会</h3>
      <hr>
      <p>我是 Jooger，是一名 Web 前端开发工程师，我始终相信一句话 ”世间的所有相遇都是久别重逢“，所以很荣幸能够在这里认识你</p>
    </div>
    <div class="block">
      <h3>畅聊</h3>
      <hr>
      <p>
        热衷于新技术的学习和探讨，热衷页面布局。崇尚化繁为简理念 
        <br>
        对互联网发展趋势高兴趣关注，积极配合开发同事完成工作
      </p>
    </div>
    <div class="block">
      <h3>献丑</h3>
      <hr>
      <ul class="skill-list">
        <li class="skill-item" v-for="item in skills" :key="item.title">
          <a class="info">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
            <span class="per">{{ item.per }}</span>
          </a>
          <!-- <p class="title">{{ item.title }}</p> -->
        </li>
      </ul>
    </div>
    <div class="block">
      <h3>成就</h3>
      <hr>
      <p>
        热衷于新技术的学习和探讨，热衷页面布局。崇尚化繁为简理念 
        <br>
        对互联网发展趋势高兴趣关注，积极配合开发同事完成工作
      </p>
    </div>
    <div class="block">
      <h3>后会</h3>
      <hr>
      <ul class="skill-list">
        <li class="skill-item" v-for="item in skills" :key="item.title">
          <a class="info">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
            <span class="per">{{ item.per }}</span>
          </a>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'About',
    async fetch () {
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 500)
      })
    },
    data () {
      const skills = [
        { title: 'Javascript', per: '80%', icon: 'js' },
        { title: 'Vue', per: '80%', icon: 'vue' },
        { title: 'Html+Css3', per: '60%', icon: 'h5' },
        { title: 'Nodejs', per: '50%', icon: 'nodejs' },
        { title: 'React', per: '50%', icon: 'react' }
      ]
      return {
        skills
      }
    },
    created () {
      this._originSubtitle = this.option.subtitle
      this.option.subtitle = 'ABOUT ME'
    },
    beforeDestroy () {
      this.option.subtitle = this._originSubtitle
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .about-page {
    padding 80px 0
    text-align center
    font-family STHeiti,'Microsoft YaHei',Helvetica,Arial,sans-serif

    h1, h2, h3, h4, h5, p {
      color $white
    }

    h1, h2, h3, h4, h5 {
      margin-bottom 10px
    }

    p {
      margin-bottom 24px
    }

    .block {
      max-width 60%
      margin 0 auto 80px

      @media (max-width: 1366px) and (min-width: 769px) {
        max-width 70%
      }

      @media (max-width: 768px) and (min-width: 480px) {
        max-width 80%
      }

      @media (max-width: 479px) {
        max-width 90%
      }

      hr {
        display block
        height 2px
        border none
        width 45px
        background alpha($white, .4)
        margin 15px auto 30px
      }

      .skill-list {
        flexLayout()

        .skill-item {

          .info {
            position relative
            display inline-block
            width 100px
            height @width
            margin 0 20px
            background alpha($white, .1)
            border-radius 100%

            .cover {
              position absolute
              top 0
              right 0
              bottom 0
              left 0
              width 45px
              height @width
              line-height @width
              margin auto
            }

            .icon
            .per {
              position absolute
              top 50%
              left 50%
              opacity 1
              transform translate(-50%, -50%) scale(1)
              transition all .3s $ease 
            }

            .icon {
              font-size 2rem
            }

            .per {
              line-height 1
              opacity 0
              transform translate(-50%, -50%) scale(0)
            }

            &:hover {
              background alpha($white, .2)

              .icon {
                opacity 0
                transform translate(-50%, -50%) scale(0)
              }

              .per {
                opacity 1
                transform translate(-50%, -50%) scale(1)
              }
            }

            @media (max-width: 1366px) and (min-width: 769px) {
              width 80px
              height @width
              margin 0 15px
              .icon {
                font-size 1.8rem
              }
            }

            @media (max-width: 768px) and (min-width: 480px) {
              width 65px
              height @width
              margin 0 10px
              .icon {
                font-size 1.6rem
              }
            }

            @media (max-width: 479px) {
              width 50px
              height @width
              margin 0 5px
              .icon {
                font-size 1.4rem
              }
            }
          }

          .title {
            margin 10px 0 0
            line-height 1
          }
        }
        
      }
    }

  }

</style>

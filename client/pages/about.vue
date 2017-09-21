<template>
  <section class="about-page">
    <div class="block">
      <a class="avatar">
        <img :src="me.avatar_url" alt="">
      </a>
      <ul class="contact-list">
        <li class="contact-item" v-for="item in contacts" :key="item.title">
          <a class="info" :href="item.url" target="_blank">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="block">
      <h3>Welcome</h3>
      <hr>
      <p>我是 Jooger，是一名 Web 前端开发工程师，我始终相信一句话 “世间的所有相遇都是久别重逢”，所以很荣幸能够在这里认识你</p>
    </div>
    <div class="block">
      <h3>About</h3>
      <hr>
      <p>
        热衷于新技术的学习和探讨，热衷页面布局。崇尚化繁为简理念 
        <br>
        对互联网发展趋势高兴趣关注，积极配合开发同事完成工作
      </p>
    </div>
    <div class="block">
      <h3>Expericnce</h3>
      <hr>
      <ul class="expericnce-list">
        <li class="expericnce-item" v-for="item in expericnces" :key="item.time">
          <time class="time">{{ item.time }}</time>
          <div class="content">
            <p class="title">{{ item.title }}</p>
            <p class="subtitle" v-if="item.subtitle">{{ item.subtitle }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="block">
      <h3>Skills</h3>
      <hr>
      <ul class="skill-list">
        <li class="skill-item" v-for="item in skills" :key="item.title">
          <a class="info">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
            <span class="per">{{ item.per }}%</span>
            <div class="wave" :class="[`wave-${item.per}`]"></div>
          </a>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'About',
    async fetch () {
      await new Promise((resolve) => {
        setTimeout(() => resolve(), 500)
      })
    },
    data () {
      const expericnces = [
        { time: '2016.8', title: '北京桃谷科技有线公司', subtitle: 'Web前端开发工程师' },
        { time: '2015.7', title: '北京太极计算机股份有限公司', subtitle: 'Java开发工程师' },
        { time: '2015.6', title: '毕业 - 湖南大学', subtitle: '软件工程专业' }
      ]
      const skills = [
        { title: 'Javascript', per: '80', icon: 'js' },
        { title: 'Vue', per: '80', icon: 'vue' },
        { title: 'Html+Css3', per: '60', icon: 'h5' },
        { title: 'Nodejs', per: '50', icon: 'nodejs' },
        { title: 'React', per: '50', icon: 'react' }
      ]
      const contacts = [
        { title: 'Email', icon: 'email', url: 'mailto:zzy1198258955@163.com' },
        { title: 'GitHub', icon: 'github', url: 'https://github.com/jo0ger' },
        { title: '知乎', icon: 'zhihu', url: 'https://www.zhihu.com/people/bubblypoker' },
        { title: '微博', icon: 'weibo', url: 'http://weibo.com/jo0ger' },
        { title: '网易云音乐', icon: 'netease-music', url: 'http://music.163.com/#/user/home?id=36877861' }
      ]
      return {
        expericnces,
        skills,
        contacts
      }
    },
    computed: {
      ...mapGetters({
        me: 'me/me'
      })
    },
    methods: {
      getSkillWaveStyle ({ per }) {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .about-page {
    padding 80px 0
    text-align center

    h1, h2, h3, h4, h5, p {
      color $white
    }

    h1, h2, h3, h4, h5 {
      margin-bottom 10px
      text-transform uppercase
    }

    p {
      margin-bottom 24px
      letter-spacing .2px
    }

    .block {
      max-width 60%
      margin 0 auto 80px
      text-align center

      @media (max-width: 1366px) and (min-width: 769px) {
        max-width 70%
      }

      @media (max-width: 768px) and (min-width: 480px) {
        max-width 80%
      }

      @media (max-width: 479px) {
        max-width 90%
      }

      .avatar {
        display inline-block
        width 100px
        height @width
        border-radius 100%
        text-align center
        overflow hidden
        box-shadow 0 0 0 2px alpha($white, .5), 0px 2px 20px 3px alpha($black, .25)

        img {
          width 100%
          height @width
          transition transform .3s $ease
        }

        &:hover {
          img {
            transform scale(1.2)
          }
        }
      }

      hr {
        display block
        height 2px
        border none
        width 45px
        background alpha($white, .4)
        margin 15px auto 30px
      }

      .expericnce-list {
        padding-left 25%

        @media (max-width: 1366px) and (min-width: 769px) {
          padding-left 20%
        }

        @media (max-width: 768px) and (min-width: 480px) {
          padding-left 15%
        }

        @media (max-width: 479px) {
          padding-left 0
        }

        .expericnce-item {
          flexLayout(, flex-start, flex-start)
          margin-bottom 15px

          p {
            margin-bottom 0
          }

          .time {
            flex 0 0 100px
            width 100px
          }

          .content {
            text-align left
            
            .subtitle {
              font-size .8rem
              color $text-color-secondary-dark
            }
          }

        }
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
            border-radius 10px
            overflow hidden

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

            .wave {
              position absolute
              width 100%
              height @width
              transform translateY(100%)
              transition all .3s $ease

              &::before,
              &::after{
                content ""
                position absolute
                width 300px
                height @width
                top 0
                left 50%
                background-color alpha($white, .05)
                border-radius 45%
                transform translate(-50%, -100%) rotate(0)
                animation rotate 6s linear infinite
                z-index 10
                opacity 0
                transition all .3s $ease
              }
              
              &::after {
                border-radius 43%
                background-color alpha($white, .1)
                transform translate(-50%, -100%) rotate(0)
                animation rotate 10s linear -5s infinite
                z-index 20
              }

              for n in 50 60 80 {
                &.wave-{n} {
                  &::before
                  &::after {
                    transform translate(-50%, -(65 + 35 / 100 * n)%) rotate(0)
                  }

                  &::before {
                    animation 'rotate-%s 6s linear infinite' % n
                  }

                  &::after {
                    animation 'rotate-%s 10s linear -5s infinite' % n
                  }
                }
              }
            }

            &:hover
            &:active {
              background alpha($white, .2)

              .icon {
                opacity 0
                transform translate(-50%, -50%) scale(0)
              }

              .per {
                opacity 1
                transform translate(-50%, -50%) scale(1)
              }

              .wave {
                transform translateY(0)

                &::before
                &::after { 
                  opacity 1
                }
              }
            }
          }

          .title {
            margin 10px 0 0
            line-height 1
          }

          @media (max-width: 1366px) and (min-width: 769px) {

            .info {
              width 80px
              height @width
              margin 0 15px
              .icon {
                font-size 1.8rem
              }

              .wave {
                &::before,
                &::after{
                  width 240px
                  height @width
                }
              }
            }

            .title {
              font-size 1rem
            }
          }

          @media (max-width: 768px) and (min-width: 480px) {

            .info {
              width 65px
              height @width
              margin 0 10px
              .icon {
                font-size 1.6rem
              }

              .wave {
                &::before,
                &::after{
                  width 195px
                  height @width
                }
              }
            }

            .title {
              font-size 0.9rem
            }
          }

          @media (max-width: 479px) {

            .info {
              width 50px
              height @width
              margin 0 5px
              .icon {
                font-size 1.4rem
              }

              .wave {
                &::before,
                &::after{
                  width 150px
                  height @width
                }
              }
            }

            .title {
              font-size .8rem
            }
          }
        }
        
      }

      .contact-list {
        flexLayout()
        margin-top 30px

        .contact-item {

          .info {
            position relative
            display inline-block
            width 48px
            height @width
            margin 0 10px
            background alpha($white, .1)
            border-radius 100%
            overflow hidden

            .icon  {
              position absolute
              top 50%
              left 50%
              opacity 1
              font-size 1.3rem
              transform translate(-50%, -50%)
              transition all .3s $ease
            }


            &:hover
            &:active {
              background alpha($white, .2)
              transform scale(.9)
            }

            @media (max-width: 1366px) and (min-width: 769px) {
              width 44px
              height @width
              .icon {
                font-size 1.2rem
              }
            }

            @media (max-width: 768px) and (min-width: 480px) {
              width 40px
              height @width
              .icon {
                font-size 1.1rem
              }
            }

            @media (max-width: 479px) {
              width 36px
              height @width
              margin 0 5px
              .icon {
                font-size 1rem
              }
            }
          }
        }
        
      }
    }

  }

  for n in 50 60 80 {
    @keyframes rotate-{n} {
      50% {
        transform translate(-50%, -(3 + 65 + 35 / 100 * n)%) rotate(180deg)
      } 100% {
        transform translate(-50%, -(65 + 35 / 100 * n)%) rotate(360deg)
      }
    }
  }

</style>

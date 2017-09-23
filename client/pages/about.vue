  <template>
  <section class="about-page">
    <div class="block">
      <a class="avatar" v-if="me.avatar_url">
        <img :src="me.avatar_url" alt="">
      </a>
      <ul class="contact-list">
        <li class="contact-item" v-for="item in option.contact" :key="item.title">
          <a class="info" :href="item.url" target="_blank">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="block">
      <h3>Welcome</h3>
      <hr>
      <p>{{ option.welcome }}</p>
    </div>
    <div class="block">
      <h3>About</h3>
      <hr>
      <p v-for="item in option.description" :key="item">
        {{ item }}
        <br>
      </p>
    </div>
    <div class="block">
      <h3>Hobbies</h3>
      <hr>
      <ul class="hobby-list">
        <li class="hobby-item" v-for="item in option.hobby" :key="item.name">
          <a class="info" :title="item.name">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="block">
      <h3>Experiences</h3>
      <hr>
      <ul class="experience-list">
        <li class="experience-item" v-for="item in option.experience" :key="item.time">
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
        <li class="skill-item" v-for="item in option.skill" :key="item.title">
          <a class="info">
            <i class="icon iconfont" :class="[`icon-${item.icon}`]"></i>
            <span class="level">{{ item.level }}%</span>
            <div class="wave" :class="[`wave-${item.level}`]"></div>
          </a>
          <p class="title">{{ item.title }}</p>
        </li>
      </ul>
    </div>
    <div class="block">
      <h3>Friends</h3>
      <hr>
      <ul class="friend-list">
        <li class="friend-item" v-for="item in option.links" :key="item.name">
          <a class="info" :href="item.link" target="_blank">
            <div class="avatar">
              <img :src="item.avatar" :alt="item.name">
            </div>
            <div class="content">
              <h3 class="name">{{ item.name }}</h3>
              <p class="slogan">{{ item.slogan }}</p>
            </div>
          </span>
          </a>
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
    computed: {
      ...mapGetters({
        me: 'me/me',
        option: 'option/option'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .about-page {
    padding 80px 0 0
    text-align center

    h1, h2, h3, h4, h5, p {
      color $white
    }

    h1, h2, h3, h4, h5 {
      margin-bottom 10px
    }

    p {
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

      & > h3 {
        text-transform uppercase
      }

      .avatar {
        display inline-block
        width 100px
        height @width
        margin-bottom 30px
        border-radius 100%
        text-align center
        overflow hidden
        cursor default
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
        background alpha($white, .2)
        margin 15px auto 30px
      }

      .hobby-list {
        flexLayout()

        .hobby-item {

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

      .experience-list {
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

        .experience-item {
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
            .level {
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

            .level {
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

              for n in 50 60 70 80 90 {
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

              .level {
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

      .friend-list {
        flexLayout(,, flex-start, wrap)

        .friend-item {
          flex 0 0 auto
          display inline-block
          margin-bottom 30px

          .info {
            display block
            margin 0 20px

            .avatar {
              width 50px
              height @width
              cursor pointer
            }
            .content {
              .name {
                margin-bottom 5px
                font-size 1rem
              }

              .slogan {
                margin-bottom 0
                font-size .8rem
                color $text-color-secondary-dark
              }
            }
          }
        }
        @media (max-width: 479px) {
          padding 0 30px
          .friend-item {
            width 100%
            .info {
              flexLayout(, flex-start, flex-start)
              .avatar {
                flex 0 0 30px
                width 30px
                height @width
                margin-top 5px
              }
              .content {
                margin-left 15px
                text-align left

                .name {
                  font-size .9rem
                }
              }
            }
          }
        }
      }
    }

  }

  for n in 50 60 70 80 90 {
    @keyframes rotate-{n} {
      50% {
        transform translate(-50%, -(3 + 65 + 35 / 100 * n)%) rotate(180deg)
      } 100% {
        transform translate(-50%, -(65 + 35 / 100 * n)%) rotate(360deg)
      }
    }
  }

</style>

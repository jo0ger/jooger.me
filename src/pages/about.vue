<template>
  <section class="about-page">
    <div class="base-info">
      <img class="avatar" :src="mine.user.avatar" :alt="mine.user.name">
      <h1 class="name">{{ mine.user.name}}</h1>
      <p class="slogan">{{ mine.slogan}}</p>
    </div>
    <div class="block">
      <div class="column column-left">
        <Card class="detail">
          <h2 class="title">It's me</h2>
          <ul class="detail-list">
            <li class="detail-item description">
              <i class="icon icon-about"></i>
              <p class="content">{{ mine.description }}</p>
            </li>
            <li class="detail-item hobby">
              <i class="icon icon-like-fill"></i>
              <p class="content">{{ mine.hobby.join('，') }}</p>
            </li>
            <li class="detail-item skill">
              <i class="icon icon-skill"></i>
              <p class="content">{{ mine.skill.join('，') }}</p>
            </li>
            <li class="detail-item tag">
              <i class="icon icon-tag"></i>
              <p class="content">{{ mine.tag.join('，') }}</p>
            </li>
            <li class="detail-item location">
              <i class="icon icon-location"></i>
              <p class="content">{{ mine.location }}</p>
            </li>
            <li class="detail-item company">
              <i class="icon icon-company"></i>
              <p class="content">{{ mine.company }}</p>
            </li>
          </ul>
        </Card>
        <Card class="links">
          <h2 class="title">Friends</h2>
          <ul class="link-list">
            <li class="link-item" v-for="link in setting.site.links" :key="link._id">
              <a :href="link.site || 'javascript:;'" target="_blank">
                <img class="avatar" :src="link.avatar" :alt="link.name">
                <div class="info">
                  <h4 class="name">{{ link.name }}</h4>
                  <p class="slogan">{{ link.slogan }}</p>
                </div>
              </a>
            </li>
          </ul>
          <div class="link-apply">
            <router-link to="/guestbook?from=about">申请友链</router-link>
          </div>
        </Card>
      </div>
      <div class="column column-right">
        <Card class="github-follow" v-if="mine.github.login">
          <div class="status">
            <div class="follower">
              <CountTo :start-val="0" :end-val="mine.github.followers" :duration='2000' separator="," class="count"></CountTo>
              <div class="label">Follower</div>
            </div>
            <span class="divider"></span>
            <div class="following">
              <CountTo :start-val="0" :end-val="mine.github.following" :duration='2000' separator="," class="count"></CountTo>
              <div class="label">Following</div>
            </div>
          </div>
          <a class="follow-btn" :href="mine.github.html_url" target="_blank"><i class="icon icon-github"></i>Follow Me</a>
        </Card>
        <Card class="social" v-if="!mobileLayout">
          <h2 class="title">Contacts</h2>
          <ul class="social-list">
            <li class="social-item" v-for="social in config.SOCIALS" :key="social.icon">
              <a :href="social.icon === 'email' ? `mailto:${social.url}` : social.url" target="_blank" rel="noopener"
                :class="social.icon"
                :title="social.title">
                <i class="icon" :class="[`icon-${social.icon}`]"></i>
              </a>
            </li>
          </ul>
        </Card>
        <Card no-padding class="position" v-if="!mobileLayout">
          <h2 class="title">I'm Here</h2>
          <iframe src="https://jooger.me/location/" frameborder="0"></iframe>
        </Card>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'
import { Card } from '@/components/common'

@Component({
  name: 'About',
  components: {
    Card
  },
  head () {
    return {
      title: '关于'
    }
  },
  fetch ({ store }) {
    store.commit('app/SET_FULL_COLUMN', true)
    return Promise.resolve()
  }
})
export default class extends Base {
  private get mine () {
    return this.setting.personal
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.about-page {
  .base-info {
    margin $padding-lg 0 64px
    text-align center

    .avatar {
      width 100px
      height @width
      border-radius 50%
      border 4px solid var(--border-color)
    }

    .name {
      margin $padding-sm 0
      font-family $font-family-logo
    }
  }

  .block {
    flexLayout(, flex-start, flex-start)

    .column {
      flex 1 0

      &-right {
        flex 0 0 320px
        margin-left $padding-md
      }

      .title {
        margin-bottom $padding-md
        text-align center
        font-family $font-family-logo
        color var(--text-color-secondary)
      }
    }
  }

  .detail {
    .detail-item {
      flexLayout(, flex-start, flex-start)
      margin $padding-lg 0
      padding 0 $padding-sm

      .icon {
        margin-right $padding-md
        font-size $font-size-lger + 2px
        color var(--text-color-secondary)
      }

      p {
        flex 1 0
        padding 4px 0
      }

      &.description {
        .icon {
          color $blue-5
        }
      }

      &.hobby {
        .icon {
          color $red-5
        }
      }

      &.skill {
        .icon {
          color $cyan-5
        }
      }

      &.tag {
        .icon {
          color $green-5
        }
      }

      &.location {
        .icon {
          color $purple-5
        }
      }

      &.company {
        .icon {
          color $orange-5
        }
      }
    }
  }

  .links {
    .link-apply {
      margin $padding-md 0
      text-align center
    }

    .link-list {
      flexLayout(, flex-start, flex-start, wrap)
      margin 0 (0 - $padding-xs)
    }

    .link-item {
      flex 0 0 (100% / 3)
      width (100% / 3)
      padding $padding-xs

      a {
        flexLayout(, flex-start, flex-start)
        padding $padding-sm
        background var(--button-color)
        border-radius 2px

        &:hover {
          background var(--button-color-hover)
        }
      }

      .avatar {
        flex 0 0 40px
        width 40px
        border-radius 50%
        margin-right $padding-xs
      }

      .info {
        flex 1 0
        overflow hidden
      }

      .slogan {
        color var(--text-color-secondary)
        textOverflow()
      }
    }
  }

  .github-follow {
    position relative
    padding-bottom 32px

    .status {
      flexLayout(, space-between)

      .divider {
        display inline-block
        flex 0 0 1px
        width 1px
        height 36px
        background var(--border-color)
      }

      > div {
        flex 1
        margin $padding-xs 0
        text-align center

        .count {
          font italic 700 $font-size-lger + 4px $font-family-code
        }

        .label {
          margin $padding-sm 0
          color var(--disabled-color)
          text-transform uppercase
        }
      }
    }

    .follow-btn {
      position absolute
      right 0
      bottom 0
      left 0
      width 100%
      height 48px
      line-height @height
      background rgba($blue-6, .6)
      color var(--light-color)
      border none
      font-weight 700
      text-align center

      .icon {
        margin-right $padding-sm
        color var(--light-color)
      }

      &:hover {
        background rgba($blue-6, .8)
      }
    }
  }

  .social {
    .social-list {
      flexLayout(, flex-start, flex-start, wrap)
    }

    .social-item {
      flex 0 0 (100% / 5)
      width (100% / 5)
      text-align center

      a {
        flexLayout()
        width 100%
        height 100%
        border-radius 2px

        .icon {
          color inherit
          font-size $font-size-lger + 4px
          opacity .8
          transition()

          &:hover {
            opacity 1
          }
        }

        &.email {
          color $cyan-6
        }

        &.zhihu {
          color $blue-6
        }

        &.github {
          color $grey-8
        }

        &.netease-music {
          color $red-6
        }

        &.juejin {
          color $blue-6
        }
      }
    }
  }

  .position {
    position relative
    line-height 0

    .title {
      position absolute
      top 0
      right 0
      left 0
      padding $padding-xs 0
      background var(--card-color)
    }

    iframe {
      width 100%
      height 320px
    }
  }

  .app.mobile-layout & {
    padding 0 $padding-md

    .base-info {
      margin $padding-md 0 $padding-lg
    }

    .block {
      flex-direction column-reverse

      .column {
        &-right {
          flex 1 0
          width 100%
          margin-left 0
        }
      }
    }

    .detail {
      .detail-item {
        margin $padding-sm 0
      }
    }

    .links {
      .link-item {
        flex-basis 100%
      }
    }

    .github-follow {
      .follow-btn {
        background $blue
      }
    }

    .position {
      iframe {
        width 100%
        height auto
      }
    }
  }
}
</style>


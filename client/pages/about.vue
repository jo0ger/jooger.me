<template>
  <div class="page-about">
    <Card class="hero">
      <div class="hero-bg"></div>
      <div class="info">
        <img :src="blogger.avatar" alt="" class="avatar">
        <h2 class="name">{{ blogger.name }}</h2>
        <h4 class="slogan">{{ blogger.slogan }}</h4>
        <div class="social-list">
          <a :href="social.url" class="social-item" target="_blank" rel="noopener"
            :class="[`social-${social.icon}`]"
            v-for="social in socials"
            :key="social.icon"
            :title="social.title">
            <i class="icon" :class="[`icon-${social.icon}`]"></i>
          </a>
        </div>
      </div>
    </Card>
    <div class="content">
      <div class="wrapper">
        <Card class="info-widget">
          <ul class="info-list">
            <li class="info-item user">
              <div class="label">
                <i class="icon icon-logo"></i>
              </div>
              <p class="title">{{ option.welcome }}</p>
            </li>
            <li class="info-item about">
              <div class="label">
                <i class="icon icon-about-fill"></i>
              </div>
              <p class="title">{{ option.description }}</p>
            </li>
            <li class="info-item skill">
              <div class="label">
                <i class="icon icon-skill"></i>
              </div>
              <p class="title">{{ option.skill }}</p>
            </li>
            <li class="info-item like">
              <div class="label">
                <i class="icon icon-like-fill"></i>
              </div>
              <p class="title">{{ option.hobby }}</p>
            </li>
            <li class="info-item music">
              <div class="label">
                <i class="icon icon-music"></i>
              </div>
              <p class="title">{{ option.music }}</p>
            </li>
            <li class="info-item location">
              <div class="label">
                <i class="icon icon-location"></i>
              </div>
              <p class="title">{{ option.location }}</p>
            </li>
            <li class="info-item company">
              <div class="label">
                <i class="icon icon-company"></i>
              </div>
              <p class="title">{{ option.company }}</p>
            </li>
          </ul>
        </Card>
        <Card class="location-widget">
          <iframe src="https://jooger.me/location/" frameborder="0"></iframe>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Card, Comment } from '@/components/common'
  import config from '@@/app.config'

  export default {
    name: 'About',
    components: {
      Card,
      Comment
    },
    layout ({ store }) {
      return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
    },
    head () {
      return {
        title: 'About',
        bodyAttrs: {
          class: 'full-page'
        }
      }
    },
    data () {
      return {
        socials: config.constant.socials
      }
    },
    computed: {
      ...mapGetters({
        blogger: 'user/blogger',
        option: 'option/option'
      })
    }
  }
</script>

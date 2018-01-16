<template>
  <div class="page-about">
    <Card class="hero">
      <div class="hero-bg"></div>
      <div class="info">
        <img :src="blogger.avatar" alt="" class="avatar">
        <h2 class="name">{{ blogger.name }}</h2>
        <h4 class="slogan">{{ blogger.slogan }}</h4>
        <p class="description">A web front-end developer</p>
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
    <div class="content-widget">
      <Card class="info">
        我是 Jooger，是一名 Web 前端开发工程师，我始终相信一句话 “世间的所有相遇都是久别重逢”，所以很荣幸能够在这里认识你
      </Card>
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
        blogger: 'user/blogger'
      })
    }
  }
</script>

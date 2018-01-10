<template>
  <div class="page-about">
    <Card class="hero">
      <div class="hero-bg"></div>
      <div class="info">
        <img :src="me.avatar" alt="" class="avatar">
        <h2 class="name">{{ me.name }}</h2>
        <h4 class="slogan">{{ me.slogan }}</h4>
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
      <Card></Card>
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
        socials: config.socials
      }
    },
    computed: {
      ...mapGetters({
        me: 'me/me'
      })
    }
  }
</script>

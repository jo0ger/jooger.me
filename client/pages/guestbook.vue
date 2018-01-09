<template>
  <div class="page-guestbook">
    <Card class="hero">
      <div class="info">
        <h2 class="title">You are here, and we are here</h2>
        <h4 class="subtitle">留言墙</h4>
      </div>
    </Card>
    <Comment class="message-widget"></Comment>
  </div>
</template>

<script>
  import { Card, Comment } from '@/components/common'

  export default {
    name: 'Guestbook',
    components: {
      Card,
      Comment
    },
    head () {
      return {
        title: 'Guestbook',
        bodyAttrs: {
          class: 'full-page'
        }
      }
    },
    async fetch ({ store }) {
      store.commit('article/CLEAR_DETAIL')
      await store.dispatch('comment/fetchList', {
        type: 1,
        page: 1
      })
    },
    afterRouteLeave (to, from, next) {
      this.$store.commit('comment/CLEAR_LIST')
      next()
    }
  }
</script>


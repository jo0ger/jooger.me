<template>
  <div class="page-guestbook">
    <Card class="hero">
      <div class="hero-bg"></div>
      <div class="info">
        <h2 class="title">You are here, and we are here</h2>
        <h4 class="subtitle">
          人的平均寿命77岁
          一共28105天
          67w小时
          4047w分钟
          24亿秒左右
          这10秒你在读这段话，这10秒你属于我
          你好陌生人，我爱你 ❤️
        </h4>
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


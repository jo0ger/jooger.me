<style lang="stylus">
	@import 'index'
</style>

<template>
  <article class="article-item" :title="article.title">
    <nuxt-link class="article-link"
      :to="`/article/${article._id}`">
      <h2 class="title">{{ article.title }}</h2>
      <div class="summary">
        <div class="thumb" v-if="article.thumb">
          <img :src="article.thumb" alt="">
        </div>
        <p class="description">{{ article.description }}</p>
      </div>
    </nuxt-link>
    <div class="status">
      <div class="meta">
        <div class="meta-item comments">
          {{ article.meta.comments }}条评论
        </div>
        <div class="meta-item ups">
          {{ article.meta.ups }}人点赞
        </div>
        <div class="meta-item pvs">
          {{ article.meta.pvs }}次浏览
        </div>
      </div>
      <time class="time" :datatitme="article.createdAt">
        <i class="icon icon-time"></i>
        {{ article.createdAt | fmtDate('yyyy-MM-dd') }}
      </time>
    </div>
  </article>
</template>

<script>
  export default {
    name: 'ArticleItem',
    props: {
      article: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {}
    }
  }
</script>


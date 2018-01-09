<template>
  <div class="page-article">
    <Card class="article-widget">
      <article class="article-detail" v-if="articleDetail">
        <h2 class="article-title">{{ articleDetail.title }}</h2>
        <div class="meta">
          <div class="meta-item category">
            <i class="icon" v-if="articleDetail.category" :class="[`icon-${getExtendsItemByKey('icon', articleDetail.category.extends) || 'tag'}`]"></i>
            {{ articleDetail.category ? articleDetail.category.name : '暂未分类' }}
          </div>
          <div class="meta-item comments">
            {{ articleDetail.meta.comments }} 条评论
          </div>
          <div class="meta-item ups">
            {{ articleDetail.meta.ups }} 人喜欢
          </div>
          <div class="meta-item pvs">
            {{ articleDetail.meta.pvs }} 次阅读
          </div>
        </div>
        <div class="thumb" v-if="articleDetail.thumb">
          <img :src="articleDetail.thumb" alt="">
        </div>
        <div class="content md-body" v-html="articleDetail.renderedContent"></div>
        <div class="action">
          <a class="action-item like"
            :class="{ 'liked': isLiked, 'liking': articleDetailLiking }"
            :title="isLiked ? '已喜欢' : ''"
            @click="handleLike">
            <i class="icon" :class="[`icon-like${isLiked ? '-fill' : ''}`]"></i>
            <span class="count">{{ articleDetail.meta.ups }}</span>
          </a>
          <a class="action-item share">
            <i class="icon icon-share"></i>
            <span>分享</span>
            <ul class="share-list"></ul>
          </a>
        </div>
        <div class="tags">
          <Tag v-for="tag in articleDetail.tag"
            :key="tag._id"
            :name="tag.name"
            :icon="getExtendsItemByKey('icon', tag.extends) || 'tag'"
            link>
          </Tag>
        </div>
      </article>
    </Card>
    <Comment class="comment-widget"></Comment>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card, Tag, Comment } from '@/components/common'

  export default {
    name: 'ArticleDetail',
    components: {
      Card,
      Tag,
      Comment
    },
    validate ({ params }) {
      return !!params.id
    },
    fetch ({ params, store }) {
      store.commit('comment/CHANGE_SORT', {
        by: 'createdAt',
        order: -1
      })
      return Promise.all([
        store.dispatch('article/fetchDetail', params.id),
        store.dispatch('comment/fetchList', {
          article: params.id,
          type: 0,
          page: 1
        })
      ])
    },
    head () {
      const data = this.articleDetail || {}
      return {
        title: data.title || 'Article Not Found',
        meta: [
          { hid: 'keywords', name: 'keywords', content: data.keywords ? data.keywords.join(',') : data.title },
          { hid: 'description', name: 'description', content: data.description || data.title }
        ]
      }
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        articleDetail: 'article/detail',
        articleDetailFetching: 'article/detailFetching',
        articleDetailLiking: 'article/detailLiking',
        historyLikes: 'app/history',
        mobileLayout: 'app/mobileLayout'
      }),
      isLiked () {
        return !!this.historyLikes.articles.find(item => item === this.articleDetail._id)
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('article/CLEAR_DETAIL')
      this.$store.commit('comment/CLEAR_LIST')
      next()
    },
    methods: {
      async handleLike () {
        await this.$store.dispatch('article/like', {
          id: this.articleDetail._id,
          like: !this.isLiked
        })
      }
    }
  }
</script>


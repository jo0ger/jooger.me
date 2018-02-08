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
        <div class="action" v-if="!mobileLayout">
          <a class="action-item like"
            :class="{ 'liked': isLiked, 'liking': articleDetailLiking }"
            :title="isLiked ? '已点赞' : ''"
            @click="handleLike">
            <i class="icon" :class="[`icon-thumb-up${isLiked ? '-fill' : ''}`]"></i>
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
      <Affix class="article-action" offsetTop="80" v-if="!mobileLayout">
        <div class="action-list">
          <a class="action-item like"
            :class="{ 'liked': isLiked, 'liking': articleDetailLiking }"
            :title="isLiked ? '已点赞' : ''"
            :data-count="articleDetail.meta.ups"
            @click="handleLike">
            <i class="icon" :class="[`icon-thumb-up${isLiked ? '-fill' : ''}`]"></i>
            <span class="count" v-if="articleDetail.meta.ups">{{ articleDetail.meta.ups | countFilter }}</span>
          </a>
          <a class="action-item comment"
            :data-count="articleDetail.meta.comments"
            @click="handleGoToComment">
            <i class="icon icon-comment"></i>
            <span class="count" v-if="articleDetail.meta.comments">{{ articleDetail.meta.comments | countFilter }}</span>
          </a>
          <a class="action-item share"
            @click.stop.prevent="showShareList = !showShareList">
            <i class="icon icon-share"></i>
          </a>
        </div>
        <transition name="fade">
          <div class="share-list" v-show="showShareList"
            v-clickoutside="handleHideShare">
            <a class="share-item"
              :class="[item.key]"
              v-for="item in shareList"
              :key="item.key"
              :title="item.title"
              rel="nofollow"
              @click="handleShare(item)">
              <i class="icon" :class="[`icon-${item.key}`]"></i>
            </a>
          </div>
        </transition>
      </Affix>
    </Card>
    <Comment class="comment-widget"></Comment>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card, Tag, Comment, Affix } from '@/components/common'
  import { scrollTo, easing } from '@/utils'
  import config from '@@/app.config'

  export default {
    name: 'ArticleDetail',
    components: {
      Card,
      Tag,
      Comment,
      Affix
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
      return {
        showShareList: false,
        shareList: config.constant.shares
      }
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
    afterRouteLeave (to, from, next) {
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
      },
      handleGoToComment () {
        scrollTo('.comment-widget', 500, {
          offset: -80,
          easing: easing['ease']
        })
      },
      handleHideShare () {
        if (this.showShareList) {
          this.showShareList = false
        }
      },
      handleShare ({ key }) {
        this.$share.share(key)
      }
    }
  }
</script>

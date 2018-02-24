<template>
  <div class="page-home">
    <Moment v-if="!mobileLayout"/>
    <template v-if="mobileLayout">
      <div class="category-tabs">
<<<<<<< HEAD
        <div class="swiper-container" v-swiper:tabSwiper="tabSwiperOption" @tap="tabTap">
          <div class="swiper-wrapper">
            <span class="swiper-slide tab-item" :class="{ active: tab === index }" v-for="(item, index) in tabs" :key="index">{{ item.title }}</span>
            <div class="corner" :style="cornerStyle" ref="corner">
              <i class="bar"></i>
            </div>
=======
        <div class="swiper-container" v-swiper:tabSwiper="tabSwiperOption">
          <div class="swiper-wrapper">
            <span class="swiper-slide tab-item" v-for="(item, index) in tabs" :key="index">{{ item.title }}</span>
          </div>
        </div>
        <i class="corner" :style="cornerStyle"></i>
      </div>
      <div class="tab-pages swiper-container" v-swiper:pageSwiper="pageSwiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in tabs" :key="index">
            <Card>
              <div class="list-content">
                <ArticleList
                  :list="articleList"
                  :pagination="articlePagination"
                  :loading="articleListFetching"
                  @on-loadmore="handleLoadmore">
                </ArticleList>
              </div>
            </Card>
>>>>>>> 163249d6763113cb4460a745da3d039aca6d4f39
          </div>
        </div>
      </div>
    </template>
<<<<<<< HEAD
    <Card class="home-widget">
      <Tab class="category-tab" :list="tabs" v-model="tab" bordered v-if="!mobileLayout"></Tab>
=======
    <Card class="home-widget" v-if="!mobileLayout">
      <Tab class="category-tab" :list="tabs" v-model="tab" bordered></Tab>
>>>>>>> 163249d6763113cb4460a745da3d039aca6d4f39
      <div class="list-content">
        <ArticleList
          :list="articleList"
          :pagination="articlePagination"
          :loading="articleListFetching"
          @on-loadmore="handleLoadmore">
        </ArticleList>
      </div>
    </Card>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { Moment, Card, Tab, ArticleList, Loading } from '@/components/common'

  export default {
    name: 'Home',
    components: {
      Moment,
      Card,
      Tab,
      ArticleList,
      Loading
    },
    layout ({ store }) {
      return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
    },
    async fetch ({ store }) {
      store.commit('article/CLEAR_LIST')
      await store.dispatch('article/fetchList', {
        page: 1
      })
    },
    data () {
      return {
        tab: 0,
        cornerStyle: null,
        tabSwiperOption: {
          init: false,
          slidesPerView: 4,
          freeMode: true
        }
      }
    },
    computed: {
      ...mapGetters({
        articleList: 'article/list',
        articleListFetching: 'article/listFetching',
        articlePagination: 'article/pagination',
        categoryList: 'category/list',
        categoryFetching: 'category/fetching'
      }),
      tabs () {
        return [{
          key: 'all',
          icon: 'all',
          title: '全部'
        }].concat(this.categoryList.map(item => {
          const icon = this.getExtendsItemByKey('icon', item.extends) || 'tag'
          return {
            key: icon,
            icon,
            title: item.name
          }
        })).concat(new Array(10).fill({
          key: 'all',
          icon: 'all',
          title: '全部'
        }))
      }
    },
    watch: {
      tab () {
        if (this.mobileLayout) {
          this.setCornerStyle()
        }
        this.clearArticleList()
        this.fetchArticleListWrapper()
      }
    },
    mounted () {
      if (this.mobileLayout) {
        this.tabSwiper.on('init', this.tabInit.bind(this))
        this.tabSwiper.init()
      }
    },
    methods: {
      ...mapMutations({
        clearArticleList: 'article/CLEAR_LIST'
      }),
      ...mapActions({
        fetchArticleList: 'article/fetchList'
      }),
      async fetchArticleListWrapper (params = {}) {
        const tab = this.tabs[this.tab]
        if (tab.key !== 'all') {
          params.category = tab.title
        }
        await this.fetchArticleList(params)
      },
      getCategoryIconClass (key, item) {
        return `icon-${this.getExtendsItemByKey(key, item.extends) || 'tag'}`
      },
      handleLoadmore () {
        this.fetchArticleListWrapper()
      },
      setCornerStyle (style = {}) {
        const cur = this.tabSwiper.slides.eq(this.tab)
        this.cornerStyle = Object.assign({
          width: cur.css('width'),
          transform: `translate3d(${cur.offset().left}px, 0, 0)`
        }, style)
      },
      tabInit () {
        this.setCornerStyle()
      },
      tabTap () {
        this.tab = this.tabSwiper.clickedIndex
        this.pageSwiper.slideTo(this.tab, 0)
      }
    }
  }
</script>

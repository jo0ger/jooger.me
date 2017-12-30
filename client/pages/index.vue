<template>
  <div class="page-home">
    <Moment></Moment>
    <Card>
      <Tab class="category-tab" :list="tabs" v-model="tab" bordered></Tab>
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
    async fetch ({ store }) {
      await store.dispatch('article/fetchList', {
        page: 1
      })
    },
    data () {
      return {
        tab: 0,
        cornerStyle: null
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
          const icon = this.findExtendItemByKey('icon', item.extends)
          return {
            key: icon,
            icon,
            title: item.name
          }
        }))
      }
    },
    watch: {
      tab () {
        this.setCornerStyle()
        this.clearArticleList()
        this.fetchArticleListWrapper()
      }
    },
    mounted () {
      this.setCornerStyle()
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
        return `icon-${this.findExtendItemByKey(key, item.extends)}`
      },
      setCornerStyle () {
        const el = this.$refs.tab ? this.$refs.tab[this.tab] : null
        if (!el) {
          this.cornerStyle = null
        } else {
          this.cornerStyle = {
            left: el.offsetLeft + 'px',
            width: el.clientWidth + 'px'
          }
        }
      },
      handleLoadmore () {
        this.fetchArticleListWrapper()
      }
    }
  }
</script>

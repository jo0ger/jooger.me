<template>
  <div class="page-archive">
    <Card v-show="!archivesFetching">
      <div slot="header" class="info-header">
        <i class="icon icon-archive"></i>
        <div class="keyword">归档</div>
        <div class="count">
          目前共计
          <em class="num">{{ archivesCount }}</em>
          篇文章
        </div>
      </div>
      <div class="sitemap">
        <div class="block tags">
          <h3 class="title">标签</h3>
          <div class="list">
            <Tag v-for="item in tags"
              :key="item.name"
              :name="item.name"
              :icon="getExtendsItemByKey('icon', item.extends)"
              :count="item.count"
              link>
            </Tag>
          </div>
        </div>
        <div class="block articles">
          <h3 class="title">文章</h3>
          <ul class="list archive-list">
            <li class="year-item" v-for="archive in archives" :key="archive.year">
              <h3 class="year">{{ archive.year }}</h3>
              <ul class="list month-list">
                <li class="month-item"  v-for="month in archive.months" :key="month.month">
                  <h4 class="month">{{ month.monthStr }}</h4>
                  <ul class="list article-list">
                    <li class="article-item" v-for="article in month.articles" :key="article._id">
                      <article class="article">
                        <time class="time" :datatitme="article.createdAt">
                          {{ article.createdAt | fmtDate('MM-dd') }}
                        </time>
                        <nuxt-link class="link"
                          :to="`/article/${article._id}`">
                          {{ article.title }}
                        </nuxt-link>
                      </article>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Card, Tag } from '@/components/common'

  export default {
    name: 'Archive',
    components: {
      Card,
      Tag
    },
    layout ({ store }) {
      return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
    },
    head () {
      return {
        title: 'Archives'
      }
    },
    async fetch ({ store }) {
      await store.dispatch('article/fetchArchives')
    },
    computed: {
      ...mapGetters({
        articlePagination: 'article/pagination',
        archives: 'article/archives',
        archivesFetching: 'article/archivesFetching',
        archivesCount: 'article/archivesCount',
        tags: 'tag/list',
        categories: 'category/list'
      })
    }
  }
</script>

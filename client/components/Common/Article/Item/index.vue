<template>
  <article class="article-item">
    <router-link class="article-link" :to="`/blog/article/${data.number}`">
      <div class="cover">
        <img :src="thumb" alt="" class="thumb-cover">
      </div>
      <header class="caption">
        <div class="meta">
          <time class="time" :datatitme="data.created_at">{{ data.created_at | fmtDate('yyyy-MM-dd') }}</time>
        </div>
        <h3 class="title">{{ data.title }}</h3>
      </header>
    </router-link>
  </article>
</template>

<script>
  import defaultThumb from '~/static/image/pexels-photo-368893.jpeg'
  export default {
    name: 'Common-Article-Item',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        thumb: ''
      }
    },
    mounted () {
      this.loadThumb()
    },
    methods: {
      loadThumb () {
        return this.$imgLoad(this.data.body.thumb, {
          success: () => {
            this.thumb = this.data.body.thumb
          },
          load: () => {
            this.thumb = defaultThumb
          },
          fail: () => {
            this.thumb = defaultThumb
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .article-item {
    padding 20px
    transition transform .3s $ease
    .article-link {
      display block
      margin-bottom 20px
      background $white
      border-radius 10px
      overflow hidden

      .cover {
        height 180px
        overflow hidden

        & > img {
          width 100%
          min-height 100%
        }
      }

      .caption {
        padding 30px 10px
        text-align center
        font-size 14px

        .meta {
          opacity .5
        }

        .title {
          display inline
          line-height 1.8
          margin 5px auto 0
          font-weight 700
        }
      }
      &:hover {
        transform scale(.98)
      }
    }
  }
</style>

<template>
  <article class="article-item">
    <router-link class="article-link" :to="`/blog/article/${data._id}`">
      <div class="cover">
        <img :src="thumb" alt="" class="thumb-cover" v-if="thumb">
        <div class="placeholder" v-else>
          <i class="iconfont icon-logo"></i>
        </div>
      </div>
      <header class="caption">
        <div class="meta">
          <time class="time" :datatitme="data.publishedAt">{{ data.publishedAt | fmtDate('yyyy-MM-dd') }}</time>
          <template v-if="data.category">
            <span> - </span>
            <span class="category">{{ data.category.name }}</span>
          </template>
        </div>
        <h3 class="title">{{ data.title }}</h3>
      </header>
    </router-link>
  </article>
</template>

<script>
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
        if (!this.data.thumb) {
          return
        }
        const thumb = this.data.thumb
        return this.$imgLoad(thumb, {
          success: () => {
            this.thumb = thumb
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
    transition transform .3s $ease
    .article-link {
      display block
      overflow hidden

      .cover {
        height 180px
        overflow hidden
        transition opacity .3s $ease

        & > img {
          width 100%
          min-height 100%
          object-fit cover
        }

        .placeholder {
          flexLayout()
          width 100%
          height @width
          background $grey3

          .iconfont {
            font-size 56px
            color alpha($black, .05)
          }
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
          font-size 1rem
          background-image linear-gradient($text-color, $text-color)
          background-size 100% 2px
          background-position 0 calc(100% + 2px)
          background-repeat no-repeat
          transition all .3s $ease
        }
      }
      &:hover
      &:active {
        transform scale(.98)

        .cover {
          opacity .85
        }

        .caption {
          .title {
            background-position: 0 100%
          }
        }
      }
    }
  }
</style>

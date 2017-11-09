<template>
  <article class="article-item">
    <router-link class="article-link" :to="`/blog/article/${data._id}`">
      <div class="cover">
        <img :src="thumb" alt="" class="thumb-cover" v-if="thumb">
        <div class="placeholder" v-else>
          <i class="iconfont icon-logo"></i>
        </div>
        <div class="statistics">
          <span class="item pvs">
            <i class="iconfont icon-visit"></i>
            <span class="count">{{ data.meta.pvs }}</span>
          </span>
          <span class="item ups">
            <i class="iconfont icon-like"></i>
            <span class="count">{{ data.meta.ups }}</span>
          </span>
          <span class="item comments">
            <i class="iconfont icon-comments"></i>
            <span class="count">{{ data.meta.comments }}</span>
          </span>
        </div>
      </div>
      <header class="caption">
        <div class="meta">
          <time class="time" :datatitme="data.createdAt">{{ data.createdAt | fmtDate('yyyy-MM-dd') }}</time>
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
        position relative
        height 180px
        overflow hidden
        transition opacity .3s $ease

        & > img {
          width 100%
          min-height 100%
          border-radius 4px
          object-fit cover
          object-position center
        }

        .placeholder {
          flexLayout()
          width 100%
          height @width
          background $grey3

          .iconfont {
            font-size 1.5rem
            color alpha($black, .05)
          }
        }

        .statistics {
          flexLayout()
          position absolute
          bottom 0
          left 0
          width 100%
          padding 5px 0
          background alpha($black, .3)
          color $text-color-secondary-dark
          border-bottom-left-radius 4px
          border-bottom-right-radius @border-bottom-left-radius
          .item {
            margin 0 .5rem
            font-size .75rem

            .iconfont {
              margin-right .25rem
              font-size .75rem
            }
          }
        }
      }

      .caption {
        padding 30px 10px
        text-align center
        font-size .875rem

        .meta {
          color $text-color-secondary
        }

        .title {
          display inline
          line-height 1.8
          margin .25rem auto 0
          font-size 1rem
          background-image linear-gradient($text-color, $text-color)
          background-size 100% 2px
          background-position 0 calc(100% + 2px)
          background-repeat no-repeat
          transition all .3s $ease
        }

        .statistics {
          .item {
            margin 0 .5rem
            font-size .75rem
            color alpha($black, .3)

            .iconfont {
              margin-right .25rem
              font-size .75rem
            }
          }
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

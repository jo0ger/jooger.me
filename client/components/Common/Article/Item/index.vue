<template>
  <article class="article-item">
    <router-link class="article-link" :to="`/blog/article/${data._id}`">
      <div class="cover">
        <img :src="thumb" alt="" class="thumb-cover" v-if="thumb">
        <div class="placeholder">
          <i class="iconfont icon-logo"></i>
        </div>
      </div>
      <header class="caption">
        <div class="meta">
          <time class="time" :datatitme="data.createdAt">{{ data.createdAt | fmtDate('yyyy-MM-dd') }}</time>
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

        .placeholder {
          flexLayout()
          width 100%
          height @width
          background $grey3

          .iconfont {
            font-size 56px
            color alpha($black, .2)
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
        }
      }
      &:hover
      &:active {
        transform scale(.98)
      }
    }
  }
</style>

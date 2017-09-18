<template>
  <article class="article-item">
    <div class="wrapper">
      <router-link class="article-link" :to="`/article/${data.number}`">
        <div class="cover">
          <img :src="thumb" alt="" class="thumb-cover">
        </div>
      </router-link>
      <header class="caption">
        <div class="meta">
          <time class="time" :datatitme="data.created_at">{{ data.created_at | fmtDate('yyyy-MM-dd') }}</time>
        </div>
        <h3 class="title">{{ data.title }}</h3>
      </header>
    </div>
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
      this.setThumb()
    },
    methods: {
      setThumb () {
        return this.$imgLoad(this.data.body.thumb, {
          success: () => {
            console.log(111)
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
    .wrapper {
      margin-bottom 20px
      background $white
      border-radius 10px
      overflow hidden

      .article-link {

        .cover {
          height 180px
          overflow hidden

          & > img {
            width 100%
            min-height 100%
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
          font-weight 700
        }
      }
    }
  }

</style>

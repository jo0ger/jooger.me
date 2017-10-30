<template>
  <div class="moment-pane" v-if="momentList && momentList.length">
    <span class="title">个人动态</span>
    <div class="wrapper">
      <div class="swiper-container" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide moment-item" v-for="(moment, index) in momentList.slice(0, 10)"
            :key="moment._id">
            <p class="content">{{ moment.content }}</p>
            <p class="info">
              <template v-if="moment.location.city">
                <span class="location">{{ moment.location.city }}</span>
                <span> - </span>
              </template>
              <time class="time" :datatitme="moment.createdAt">{{ moment.createdAt | getDateFromNow }}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Layout-Moment',
    data () {
      return {
        swiperOption: {
          autoplay: 6000,
          direction: 'vertical',
          loop: true,
          initialSlide: 0,
          speed: 1500,
          height: 120,
          setWrapperSize: false,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          loop: true
        }
      }
    },
    computed: {
      ...mapGetters({
        momentList: 'moment/list'
      })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .moment-pane {
    .title {
      position relative
      display inline-block
      font-size 16px
      font-weight bold

      +respond-below($screen-xs-max) {
        display none
      }

      &::after {
        content ''
        position absolute
        bottom -5px
        left 50%
        width 24px
        height 2px
        background alpha($white, .1)
        transform translateX(-50%)
      }
    }
    .moment-item {
      flexLayout(column)
      color $text-color-dark
      opacity .6
      transition opacity .8s $ease

      &:hover {
        opacity 1
      }

      .content {
        lineLimit(3)
      }

      .info {
        margin-top 10px
        font-size 12px
        opacity .6
      }
    }
  }
</style>

<template>
  <div class="app-hero">
    <div class="wrapper">
      <!-- Swiper -->
      <div class="hero-swiper" key="swiper">
        <div class="swiper-container" v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <template v-for="item in hot">
              <video class="swiper-slide hot-item" :src="item" :key="item._id" autoplay v-if="isVideo(item.thumb)"></video>
              <div class="swiper-slide hot-item" :key="item._id" :style="getHotStyle(item)" v-else>
                <div class="content">
                  <span class="category" v-if="item.category && item.category.name">{{ item.category.name }}</span>
                  <h2 class="title">{{ item.title }}</h2>
                </div>
                <router-link :to="`/article/${item._id}`" class="permalink" :title="item.title"></router-link>
              </div>
            </template>
          </div>
          <div class="swiper-pagination swiper-pagination-bullets" v-if="hot && hot.length > 1"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { isVideo } from '@/utils'

  export default {
    name: 'Hero',
    data () {
      return {
        swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          speed: 1500,
          setWrapperSize: true,
          grabCursor: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          preloadImages: false,
          lazyLoading: true
        }
      }
    },
    computed: {
      ...mapGetters({
        hotFetching: 'article/hotFetching',
        hot: 'article/hot'
      })
    },
    methods: {
      isVideo,
      getHotStyle (hot) {
        return {
          // backgroundImage: `url(${hot.thumb})`
          backgroundImage: `url(http://oqtnezwt7.bkt.clouddn.com/black-and-white-coffee-cup-apple.jpg)`
        }
      }
    }
  }
</script>

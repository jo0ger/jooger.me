<template>
  <section class="page-index">
    <template v-if="mobileLayout">
      <div class="category-field">
        <Swiper ref="categorySwiper" class="category-swiper">
          <SwiperItem class="category-item" :class="{ active: activeIndex === index }" v-for="(category, index) in categoryList" :key="category.id">
            <div class="overlay"></div>
            <span>{{ category.name }}</span>
          </SwiperItem>
        </Swiper>
      </div>
      <div class="article-field">
        <Swiper class="page-swiper" ref="pageSwiper" :options="pageSwiperOpts">
          <SwiperItem v-for="category in categoryList" :key="category.id">
            <Swiper class="scroll-swiper" :options="scrollSwiperOpts">
              <SwiperItem class="scroll-item">
                {{ category.name }}
                <p>{{ category.description }}</p>
              </SwiperItem>
            </Swiper>
          </SwiperItem>
        </Swiper>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Swiper, SwiperItem, Message } from '../components/common'
import { Getter, namespace } from 'vuex-class'

const AppModuleGetter = namespace('app', Getter)
const CategoryModuleGetter = namespace('category', Getter)

@Component({
  name: 'PageIndex',
  layout ({ store }) {
    return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
  },
  components: {
    Swiper,
    SwiperItem
  }
})
export default class Index extends Vue {
  @AppModuleGetter('mobileLayout') mobileLayout

  @CategoryModuleGetter('list') categoryList

  pageSwiperOpts = {
    slidesPerView: 1,
    on: {
      transitionStart: this.onArticleSwiperTransitionStart
    }
  }

  scrollSwiperOpts = {
    slidesOffsetBefore: 138,
  	direction: 'vertical',
  	freeMode: true,
  	slidesPerView: 'auto'
  }

  activeIndex = 0

  onArticleSwiperTransitionStart () {
    const pageRef: any = this.$refs.pageSwiper
    const categoryRef: any = this.$refs.categorySwiper
    this.activeIndex = pageRef.swiper.activeIndex
    categoryRef.swiper.slideTo(this.activeIndex)
  }

  mounted () {
    console.dir(Message)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/vars/index'
@import '~@/assets/stylus/mixins/index'

.page-index {
  position relative
  .category-field {
    position fixed
    top 56px
    width 100%
    margin 0 -16px
    padding 8px 16px
    background $white
    box-shadow 0 20px 20px -12px rgba(0,0,0,.05)
    overflow hidden
    z-index 1000

    .category-swiper {
      overflow visible
    }

    .category-item {
      position relative
      height 50px
      line-height @height
      text-align center
      color $white
      border-radius 5px
      box-shadow 0 15px 35px rgba(50,50,93,.04), 0 5px 15px rgba(0,0,0,.08)
      background-image url('https://static.surmon.me/nodepress/image/FSPLFPQBCZ-1200x800.jpg?imageView2/1/w/350/h/238/format/webp/interlace/1/q/75|watermark/2/text/U3VybW9uLm1l/font/Y2FuZGFyYQ==/fontsize/460/fill/I0ZGRkZGRg==/dissolve/23/gravity/SouthWest/dx/15/dy/7|imageslim')
      background-size cover
      overflow hidden

      .overlay {
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        opacity .9
      }

      span {
        position relative
      }

      &:first-child {
        // margin-left 16px
      }

      &:nth-child(1) .overlay {
        background: linear-gradient(135deg, #FFFE9F 0%, #FCA180 100%)
      }
      &:nth-child(2) .overlay {
        background: linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)
      }
      &:nth-child(3) .overlay {
        background: linear-gradient(135deg, #90F7EC 0%, #32CCBC 100%)
      }
      &:nth-child(4) .overlay {
        background: linear-gradient(135deg, #FAD7A1 0%, #E96D71 100%)
      }
      &:nth-child(5) .overlay {
        background: linear-gradient(135deg, #92FFC0 0%, #002661 100%)
      }
      &:nth-child(6) .overlay {
        background: linear-gradient(135deg, #E8D07A 0%, #5312D6 100%)
      }

      &.active {
        font-weight bold
      }
    }
  }

  .article-field {
    height 100vh
    margin 0 -16px
    padding 0 16px
    overflow hidden

    .page-swiper {
      height 100%
      overflow visible
    }

    .scroll-swiper {
      height 100%

      .scroll-item {
        height auto
      }
    }
  }
}

</style>

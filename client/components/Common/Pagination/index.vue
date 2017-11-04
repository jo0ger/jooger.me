<template>
  <div class="pagination" v-if="totalPage > 1">
    <a class="prev" v-if="currentPage > 1" @click="prev">
      <span v-if="prevText">{{ prevText }}</span>
      <i class="iconfont icon-prev" v-else></i>
    </a>
    <a class="number" :class="{ active: currentPage === 1 }" v-if="pagerCount > 0" @click="skip(1)">
      <span>1</span>
    </a>
    <a class="quick-prev" v-if="showPrevMore"
      @mouseenter="quickPrevIconClass = 'icon-quick-prev'"
      @mouseleave="quickPrevIconClass = 'icon-more'"
      @click="jumpPrev">
      <i class="iconfont" :class="[quickPrevIconClass]"></i>
    </a>
    <a class="number" v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager }"
      @click="skip(pager)">
      <span>{{ pager }}</span>
    </a>
    <a class="quick-next" v-if="showNextMore"
      @mouseenter="quickNextIconClass = 'icon-quick-next'"
      @mouseleave="quickNextIconClass = 'icon-more'"
      @click="jumpNext">
      <i class="iconfont" :class="[quickNextIconClass]"></i>
    </a>
    <a class="number" :class="{ active: currentPage === totalPage }" v-if="pagerCount > 1" @click="skip(totalPage)">
      <span>{{ totalPage }}</span>
    </a>
    <a class="next" v-if="currentPage < totalPage" @click="next">
      <span v-if="nextText">{{ nextText }}</span>
      <i class="iconfont icon-next" v-else></i>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      totalPage: {
        type: Number,
        default: 0,
        validator (val) {
          return val >= 0
        }
      },
      currentPage: {
        type: Number,
        default: 1,
        validator (val) {
          return val > 0
        }
      },
      prevText: {
        type: String,
        default: ''
      },
      nextText: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showPrevMore: false,
        showNextMore: false,
        pagerCount: 5, // 总共需要显示的数字个数, 必须为奇数，1 ... 3 4 5 ... 7
        quickPrevIconClass: 'icon-more',
        quickNextIconClass: 'icon-more'
      }
    },
    computed: {
      radius () {
        return (this.pagerCount - 3) / 2
      },
      pagers () {
        let showPrevMore = false
        let showNextMore = false
        let radius = (this.pagerCount - 3) / 2
        if (this.totalPage > this.pagerCount) {
          if (this.currentPage > (2 + radius)) {
            showPrevMore = true
          }
          if (this.currentPage < (this.totalPage - 1 - radius)) {
            showNextMore = true
          }
        }

        const array = []
        let start = 2
        let end = this.totalPage - 1
        if (showPrevMore && !showNextMore) {
          start = this.totalPage - (this.pagerCount - 2)
          end = this.totalPage - 1
        } else if (!showPrevMore && showNextMore) {
          end = this.pagerCount - 1
        } else if (showPrevMore && showNextMore) {
          start = this.currentPage - radius
          end = this.currentPage + radius
        }
        for (let i = start; i <= end; i++) {
          array.push(i)
        }
        this.showPrevMore = showPrevMore
        this.showNextMore = showNextMore
        return array
      }
    },
    methods: {
      checkPage (page) {
        if (page < 1) {
          return 1
        } else if (page > this.totalPage) {
          return this.totalPage
        }
        return page
      },
      prev () {
        this.skip(
          this.checkPage(this.currentPage - 1)
        )
      },
      next () {
        this.skip(
          this.checkPage(this.currentPage + 1)
        )
      },
      jumpPrev () {
        this.skip(
          this.checkPage(this.currentPage - this.pagerCount + 2)
        )
      },
      jumpNext () {
        this.skip(
          this.checkPage(this.currentPage + this.pagerCount - 2)
        )
      },
      skip (page) {
        if (this.currentPage === page) {
          return
        }
        this.$emit('change', page)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .pagination {
    text-align center
    color $text-color-secondary

    & > a {
      margin 0 .1rem
      padding .3rem .5rem
      line-height 1
      text-align center

      &:hover {
        color $base-color
      }
    }

    .number {
      border-radius 2px
      &:hover {
        background $base-color
        color $white
      }

      &.active {
        background alpha($base-color, .1)
        color $base-color
        cursor default
      }
    }
  }
</style>

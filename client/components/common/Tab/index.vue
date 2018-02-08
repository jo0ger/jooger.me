<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="tab" :class="{
    'tab-bordered': bordered
  }">
    <a v-for="(item, index) in list"
      :key="item.key || index"
      class="tab-item"
      :class="{ active: checkActive(item, index) }"
      ref="tab"
      @click="handleChangeTab(item, index)">
      <i class="icon" :class="[`icon-${item.icon}`]"></i>
      <span class="title">{{ item.title }}</span>
    </a>
    <i class="corner" :style="cornerStyle"></i>
  </div>
</template>

<script>
  import { isType } from '@/utils'
  
  export default {
    name: 'Tab',
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      value: {
        type: [Number, String]
      },
      bordered: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        cornerStyle: null
      }
    },
    watch: {
      value () {
        this.setCornerStyle()
      }
    },
    mounted () {
      this.setCornerStyle()
    },
    methods: {
      setCornerStyle () {
        const index = isType(this.value, 'Number') ? this.value : this.list.findIndex(item => item.key === this.value)
        const el = this.$refs.tab ? this.$refs.tab[index] : null
        if (!el) {
          this.cornerStyle = null
        } else {
          this.cornerStyle = {
            left: el.offsetLeft + 'px',
            width: el.clientWidth + 'px'
          }
        }
      },
      checkActive (item, index) {
        if (isType(this.value, 'Number')) {
          return this.value === index
        } else {
          return this.value === item.key
        }
      },
      handleChangeTab (item, index) {
        const value = isType(this.value, 'Number') ? index : item.key
        this.$emit('input', value)
        this.$emit('on-change', {
          index,
          value: item
        })
      }
    }
  }
</script>

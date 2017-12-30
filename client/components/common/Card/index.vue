<style lang="stylus">
	@import 'index'
</style>

<template>
  <div class="card" :class="{
    'card-bordered': bordered
  }">
    <div class="card-header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="card-body" :style="borderStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: {
      header: {
        type: String,
        default: ''
      },
      borderStyle: {
        type: Object,
        default: null
      },
      bordered: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    }
  }
</script>


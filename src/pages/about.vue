<template>
    <section class="about-page"></section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'

@Component({
  name: 'About',
  head () {
    return {
      title: '关于'
    }
  }
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.about-page {}
</style>


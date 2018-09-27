<template>
    <section class="archive-page"></section>
</template>

<script lang="ts">
import Base from '@/base'
import { Component } from '@/utils/decorators'

@Component({
  name: 'Archive'
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.archive-page {}
</style>


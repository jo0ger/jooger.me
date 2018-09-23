<template>
    <section class="category-page"></section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"

@Component({
  name: 'Category'
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.category-page {}
</style>


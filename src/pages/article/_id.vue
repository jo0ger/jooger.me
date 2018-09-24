<template>
    <section class="article-page"></section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"

@Component({
  name: 'ArticleDetail'
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.article-page {}
</style>


<template>
    <section class="tag-page"></section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"

@Component({
  name: 'Tag'
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.tag-page {}
</style>


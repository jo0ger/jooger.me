<template>
    <section class="about-page"></section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"

@Component({
  name: 'About'
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.about-page {}
</style>


<template>
    <section class="guestbook-page"></section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"

@Component({
  name: 'Guestbook'
})
export default class extends Base {
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/style/init'

.guestbook-page {}
</style>


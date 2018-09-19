<template>
  <section>
    <h1 class="header">Nuxt TypeScript Starter</h1>
    <div class="cards">
      111
    </div>
  </section>
</template>

<script lang="ts">
import Base from "@/base"
import { Component } from "@/utils/decorators"

@Component({
  name: 'Index'
})
export default class extends Base {
}
</script>
<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>

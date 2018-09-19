<template>
  <div class="app">
    <Background></Background>
    <main class="app-main">
      <nuxt/>
    </main>
  </div>
</template>

<script lang="ts">
  import Base from "@/base"
  import { Component  } from "@/utils/decorators"
  import { Background  } from "@/components/common"

  @Component({
    name: 'LayoutDefault',
    components: {
      Background
    }
  })
  export default class LayoutDefault extends Base {

  }
</script>

<template>
  <nuxt />
</template>

<script lang="ts">
  import Base from '@/base'
  import { Component  } from '@/utils/decorators'

  @Component({
    name: 'LayoutEmpty'
  })
  export default class LayoutEmpty extends Base {
  }
</script>

<template>
  <div class="app" id="app">
    <Header />
    <nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Header } from '../components/mobile'

@Component({
  components: {
    Header
  }
})
export default class Mobile extends Vue {

}
</script>

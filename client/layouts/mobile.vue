<template>
  <div class="app" id="app">
    <Header />
    <main class="app-main">
      <nuxt />
    </main>
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

<style lang="stylus" scoped>
@import '~@/assets/stylus/vars/index'
@import '~@/assets/stylus/mixins/index'

.app {
  width 100%
  &-main {
    width 100%
    padding 0 16px
  }
}
</style>


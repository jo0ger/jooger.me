<template>
  <section class="page-index">
    <template v-if="mobileLayout">
      <div class="category-field">
        <Swiper></Swiper>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Swiper } from '../components/common'
import { Getter, namespace } from 'vuex-class'

const AppModuleGetter = namespace('app', Getter)

@Component({
  name: 'PageIndex',
  layout ({ store }) {
    return store.getters['app/mobileLayout'] ? 'mobile' : 'default'
  },
  components: {
    Swiper
  }
})
export default class Index extends Vue {
  @AppModuleGetter('mobileLayout') mobileLayout
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/vars/index'
@import '~@/assets/stylus/mixins/index'

.category-field {
  padding 8px 0
  background $white
}
</style>

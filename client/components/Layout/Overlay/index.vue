<template>
  <transition name="fade-overlay">
    <div class="page-overlay" v-show="showOverlay" @click.prevent.stop="handleClick"></div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Layout-Overlay',
    computed: {
      ...mapGetters({
        showOverlay: 'app/showOverlay'
      })
    },
    watch: {
      showOverlay (val) {
        if (process.browser) {
          document.body.style.overflow = val ? 'hidden' : 'auto'
        }
      }
    },
    methods: {
      handleClick () {
        this.$store.commit('app/SET_SEARCH', false)
        this.$store.commit('app/SET_SHARE_BOX', false)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/stylus/_var'
  @import '~assets/stylus/_mixin'

  .page-overlay {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    background alpha($black, .5)
    z-index 9997
  }

</style>

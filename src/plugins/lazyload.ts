import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default () => {
  if (process.client) {
    Vue.use(VueLazyload)
  }
}

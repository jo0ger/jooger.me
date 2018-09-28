import Vue from 'vue'

export default () => {
    Vue.prototype.$bus = new Vue()
}

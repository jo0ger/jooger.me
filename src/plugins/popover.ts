import Vue from 'vue'
import Popover from 'vue-js-popover'

export default () => {
    if (process.client) {
        Vue.use(Popover, {
            tooltip: true
        })
    }
}

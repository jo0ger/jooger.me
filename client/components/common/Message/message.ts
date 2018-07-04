/**
 * @desc mobile Message组件
 * @author Jooger <iamjooger@gmail.com>
 * @since 1 Apr 2018
 */

'use strict'

import {
    Vue,
    Component,
    Watch
} from 'vue-property-decorator'
import {
    isType,
    noop
} from '@/utils'

@Component({
    mixins: [require('./index.vue').default]
})
export default class MessageCtor extends Vue {
    type = '' // success | error | warning | info
    visible = false
    message = ''
    duration = 3000
    closed = false
    onClose: any = noop

    _timer: any = null

    @Watch('closed')
    watchClosed(val: boolean) {
        if (val) {
            this.visible = false
            this.$el.addEventListener('transitionend', this.destroy, {
                passive: true
            })
        }
    }

    mounted() {
        this.startTimer()
    }

    startTimer() {
        if (this.duration > 0) {
            this._timer = setTimeout(() => {
                if (!this.closed) {
                    this.close()
                }
            }, this.duration)
        }
    }

    close() {
        this.closed = true
        if (isType(this.onClose, 'Function')) {
            this.onClose(this)
        }
    }

    destroy() {
        this.$el.removeEventListener('transitionend', this.destroy)
        this.$destroy()
        if (this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}

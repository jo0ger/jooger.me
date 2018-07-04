/**
 * @desc Message 组件
 * @author Jooger <iamjooger@gmail.com>
 * @since 2 Apr 2018
 */

'use strict'

import {
    Vue
} from 'vue-property-decorator'
import MessageCtor from './message'
import {
    isType
} from '@/utils'

let instance: any
let instances: any[] = []
let seed: number = 1

const Message: any = (opts: any = {}): any => {
    if (isType(opts, 'String')) {
        opts = {
            message: opts
        }
    }

    const closeCache = opts.onClose
    const id = `message-${seed++}`

    opts.onClose = () => Message.close(id, closeCache)

    instance = new MessageCtor({
        data: opts
    })
    instance.id = id
    instance.vm = instance.$mount()
    document.body.appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    instances.push(instance)
    return instance.vm
}

['success', 'error', 'warning', 'info'].forEach(type => {
    Message[type] = (opts) => {
        if (isType(opts, 'String')) {
            opts = {
                message: opts
            }
        }
        return Message({
            ...opts,
            type
        })
    }
})

Message.close = (id, close) => {
    const len = instances.length
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof close === 'function') {
                close(instances[i])
            }
            instances.splice(i, 1)
            break
        }
    }
}

Message.closeAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close()
    }
}

Vue.prototype.$message = Message

export default Message

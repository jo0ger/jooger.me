/**
 * @desc Message entry
 * @author Jooger <iamjooger@gmail.com>
 * @see https://github.com/ElemeFE/element/blob/dev/packages/message/src/main.js
 * @date 7 Jan 2018
 */

'use strict'

import Vue from 'vue'
import Index from './index.vue'
import { isType } from '@/utils'

let MessageCtor = Vue.extend(Index)
let instance
let instances = []
let seed = 1

const Message = (opts = {}) => {
  if (isType(opts, 'String')) {
    opts = {
      message: opts
    }
  }

  const closeCache = opts.onClose
  const id = `message-${seed++}`

  opts.onClose = () => Message.close(id, closeCache)

  instance = new MessageCtor({ data: opts })
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
  for (let i = 0, len = instances.length; i < len; i++) {
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

export default Message

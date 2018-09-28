import Vue from 'vue'
import { Message } from '@/components/common'

export default () => {
  if (process.client) {
    Vue.prototype.$message = Message
    window.Message = Message
  }
}
/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { processModel, findExtendsItem, moment, filters } from '@/utils'
import * as config from '@/config'
// import { namespace } from 'vuex-class'

// const sMod = namespace('setting')

export default Vue

@Component({
  name: 'Base'
})
export class Base extends Vue {
    protected config = config
    protected api = api

    protected processModel = processModel
    protected findExtendsItem = findExtendsItem
    protected moment = moment
    protected formatDate = filters.dateFormat

    constructor () {
        super()
        // 如果需要在组件template中直接访问Base的方法，需要先在constructor中bind
        // this.exampleMethod = this.exampleMethod.bind(this)
    }
}

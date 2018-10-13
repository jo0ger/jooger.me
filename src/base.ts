/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { processModel, findExtendsItem, moment, filters, constant } from '@/utils'
import * as config from '@/config'
import { namespace } from 'vuex-class'
import { AppStateTree } from '@/utils/interfaces'
import { ConstantItem } from './utils/constant';

const { Getter, Action } = namespace('app')

@Component({
  name: 'Base',
  filters: {
    ...filters
  },
  layout({ store }) {
    const mobileLayout = store.getters['app/mobileLayout']
    if (mobileLayout) return 'mobile'
    return 'default'
  }
})
export default class Base extends Vue {
  @Getter protected theme!: AppStateTree['theme']
  @Getter protected mobileLayout!: boolean
  @Getter protected fullColumn!: boolean
  @Getter protected fullScreen!: boolean
  @Getter protected user!: WebApi.UserModule.User | null
  @Getter protected history!: AppStateTree['history']
  @Getter protected setting!: WebApi.SettingModule.Setting
  @Getter protected hotList!: WebApi.ArticleModule.Article[]
  @Getter protected categoryList!: WebApi.CategoryModule.Category[]
  @Getter protected tagList!: WebApi.TagModule.Tag[]
  protected constant = constant
  @Action protected updateHistory

  protected config = config
  protected api = api

  protected processModel = processModel
  protected findExtendsItem = findExtendsItem
  protected moment = moment
  protected formatDate = filters.dateFormat

  constructor() {
    super()
    // 如果需要在组件template中直接访问Base的方法，需要先在constructor中bind
    // this.exampleMethod = this.exampleMethod.bind(this)
    this.setFullColumn = this.setFullColumn.bind(this)
  }

  protected setFullColumn(val: boolean) {
    this.$store.commit('app/SET_FULL_COLUMN', val)
    if (!val) {
      setTimeout(() => {
        this.$bus.$emit('affix-reset')
      }, 300)
    }
  }

  protected getConstantItem(name: string, value: string | number, findKey: string = 'label') {
    const con: ConstantItem = this.constant[name as any]
    let find: string | number = ''
    if (con) {
      const hit = con.find(item => item.value === value)
      find = hit && hit[findKey]
    }
    return find || ''
  }
}

/**
 * 所有组件的基类
 */

import Vue from 'vue'
import api from '@/api'
import { Component } from '@/utils/decorators'
import { processModel, findExtendsItem, moment, filters } from '@/utils'
import * as config from '@/config'
import { namespace } from 'vuex-class'

const { Getter } = namespace('app')

@Component({
  name: 'Base',
  filters: {
    ...filters
  }
})
export default class Base extends Vue {
  @Getter protected mobileLayout!: boolean
  @Getter protected setting!: WebApi.SettingModule.Setting
  @Getter protected hotList!: WebApi.ArticleModule.Article[]
  @Getter protected categoryList!: WebApi.CategoryModule.Category[]
  @Getter protected tagList!: WebApi.TagModule.Tag[]

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

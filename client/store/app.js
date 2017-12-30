/**
 * @desc 一些全局数据
 * @author Jooger <iamjooger@gmail.com>
 * @date 27 Dec 2017
 */

'use strict'

// import config from '@@/app.config'
const SET_MOBILE_LAYOUT = 'SET_MOBILE_LAYOUT'

export const state = () => ({
  mobileLayout: false
})

export const getters = {
  mobileLayout: state => state.mobileLayout
}

export const mutations = {
  [SET_MOBILE_LAYOUT]: (state, mobileLayout) => (state.mobileLayout = mobileLayout)
}

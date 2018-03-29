/**
 * @desc App module
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Mar 2018
 */

'use strict'

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

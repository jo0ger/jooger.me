/**
 * @desc App module
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Mar 2018
 */

'use strict'

import { GetterTree, MutationTree } from 'vuex'
import { RootState } from 'store'
import { types } from '~/utils'

interface State {
  mobileLayout: boolean
}

export const state = (): State => ({
  mobileLayout: false
})

export const getters: GetterTree<State, RootState> = {
  mobileLayout: state => state.mobileLayout
}

export const mutations: MutationTree<State> = {
  [types.SET_MOBILE_LAYOUT]: (state, mobileLayout) => (state.mobileLayout = mobileLayout)
}

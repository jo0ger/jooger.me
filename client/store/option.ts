/**
 * @desc 站点全局参数
 * @author Jooger <iamjooger@gmail.com>
 * @since 1 Apr 2018
 */

'use strict'

import {
    GetterTree,
    MutationTree,
    ActionContext,
    ActionTree
} from 'vuex'
import {
    RootState
} from 'store'
import {
    types
} from '@/utils'

interface Option {
    _id: string
    id: string
    title: string
    subtitle: string
    welcome: string
    description: number
}

interface State {
    data: null | Option
    fetching: boolean
}

export const state = (): State => ({
    data: null,
    fetching: false
})

export const getters: GetterTree < State, RootState > = {
    option: state => state.data,
    fetching: state => state.fetching
}

export const mutations: MutationTree < State > = {
    [types.FETCH_DATA_REQUEST]: state => (state.fetching = true),
    [types.FETCH_DATA_FAILURE]: state => (state.fetching = false),
    [types.FETCH_DATA_SUCCESS]: (state, data) => {
        state.fetching = false
        state.data = data
    }
}

export const actions: ActionTree < State, RootState > = {
    async fetchList({
        state,
        commit
    }: ActionContext < State, RootState >) {
        if (state.fetching) {
            return false
        }
        commit(types.FETCH_DATA_REQUEST)
        const {
            success,
            data
        } = await this.$axios.$get('/options')
        if (success) {
            commit(types.FETCH_DATA_SUCCESS, data)
        } else {
            commit(types.FETCH_DATA_FAILURE)
        }
        return success
    }
}

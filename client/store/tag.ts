/**
 * @desc 标签数据
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Dec 2017
 */

'use strict'

import {
    GetterTree,
    MutationTree,
    ActionContext,
    ActionTree
} from 'vuex'
import {
    RootState,
    ExtendItem
} from 'store'
import {
    types
} from '@/utils'

interface Category {
    _id: string
    id: string
    name ?: string
    description: string
    createdAt: string
    count: number
    updatedAt ?: string
    extends ?: ExtendItem[]
}

interface State {
    list: Category[]
    fetching: boolean
}

export const state = (): State => ({
    list: [],
    fetching: false
})

export const getters: GetterTree < State, RootState > = {
    list: state => state.list,
    fetching: state => state.fetching
}

export const mutations: MutationTree < State > = {
    [types.FETCH_LIST_REQUEST]: state => (state.fetching = true),
    [types.FETCH_LIST_FAILURE]: state => (state.fetching = false),
    [types.FETCH_LIST_SUCCESS]: (state, list) => {
        state.fetching = false
        state.list = list
    }
}

export const actions: ActionTree < State, RootState > = {
    async fetchList({
        state,
        commit
    }: ActionContext<State, RootState>) {
        if (state.fetching) {
            return false
        }
        commit(types.FETCH_LIST_REQUEST)
        const {
            success,
            data
        } = await this.$axios.$get('/tags')
        if (success) {
            commit(types.FETCH_LIST_SUCCESS, data)
        } else {
            commit(types.FETCH_LIST_FAILURE)
        }
        return success
    }
}

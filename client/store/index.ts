/**
 * @desc Store entrance
 * @author Jooger <iamjooger@gmail.com>
 * @date 30 Mar 2018
 */

'use strict'

import {
    NuxtContext
} from 'nuxt'
import {
    GetterTree,
    ActionContext,
    ActionTree,
    MutationTree
} from 'vuex'
import {
    isMobile
} from '../utils/index'

export interface ExtendItem {
    [key: string]: string
}

export interface State {}

export interface RootState extends State {}

export interface Actions < S, R > extends ActionTree < S, R > {
    nuxtServerInit(
        context: ActionContext < S, R > ,
        NuxtContext: NuxtContext
    ): void | Promise < any >
}

export const types = {}

export const state = (): State => ({})

export const getters: GetterTree < State, RootState > = {}

export const mutations: MutationTree < State > = {}

export const actions: Actions < State, RootState > = {
    nuxtServerInit({
        commit,
        dispatch
    }: ActionContext < State, RootState > , {
        req
    }: NuxtContext) {
        const ua: string = (process as any).server ? req.headers['user-agent'] : window.navigator.userAgent
        const isMobileClient: boolean = isMobile(ua)
        if (isMobileClient) {
            commit('app/SET_MOBILE_LAYOUT', true)
        }
        const task = [
            dispatch('category/fetchList'),
            dispatch('tag/fetchList')
        ]
        return Promise.all(task)
    }
}

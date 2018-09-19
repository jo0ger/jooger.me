import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

export interface StateTree {}

export interface RootState {}

export interface Getters<S, R> extends GetterTree<S, R> {}

export interface Mutations<S> extends MutationTree <S> {}

export interface Actions<S, R> extends ActionTree <S, R> {}

export interface ActionCtx<S, R> extends ActionContext <S, R> {}

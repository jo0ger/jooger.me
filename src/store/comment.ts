import api from '@/api'
import { CommentStateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
const CLEAR_LIST = 'CLEAR_LIST'
const CHANGE_SORT = 'CHANGE_SORT'
const RESET_SORT = 'RESET_SORT'
const LIKE = 'LIKE'
const PUBLISH = 'PUBLISH'

const getDefaultPageInfo = () => ({
  total: 0,
  current: 1,
  pages: 0,
  limit: 10
})

const getDefaultSort = (): CommentStateTree['sort'] => ({
  sortBy: 'createdAt',
  order: -1
})

export const state = (): CommentStateTree => ({
  // 默认最新评论
  sort: getDefaultSort(),
  list: {
    fetching: false,
    data: [],
    pageInfo: getDefaultPageInfo()
  }
})

export const getters: Getters<CommentStateTree, RootState> = {
  sort: state => state.sort,
  list: state => state.list.data,
  listFetching: state => state.list.fetching,
  pageInfo: state => state.list.pageInfo
}

export const mutations: Mutations<CommentStateTree> = {
  [FETCH_LIST_REQUEST]: state => (state.list.fetching = true),
  [FETCH_LIST_FAILURE]: state => (state.list.fetching = false),
  [FETCH_LIST_SUCCESS]: (state, { list = [], pageInfo }) => {
    state.list.fetching = false
    if (pageInfo.current === 1) {
      state.list.data = list
    } else {
      state.list.data.push(...list)
    }
    state.list.pageInfo = pageInfo
  },
  [CLEAR_LIST]: state => {
    state.list.fetching = false
    state.list.data = []
    state.list.pageInfo = getDefaultPageInfo()
  },
  [CHANGE_SORT]: (state, sort = {}) => {
    if (sort.sortBy) {
      state.sort.sortBy = sort.sortBy
    }
    if (sort.order) {
      state.sort.order = sort.order
    }
  },
  [RESET_SORT]: state => {
    state.sort = getDefaultSort()
  },
  [LIKE]: (state, id) => {
    const comment = state.list.data.find(item => item._id === id)
    if (comment) {
      comment.ups = comment.ups + 1
    }
  },
  [PUBLISH]: (state, comment) => {
    if (comment.parent) {
      const replyId = comment.parent._id || comment.parent
      if (replyId) {
        // 需要subCount + 1
        const hit = state.list.data.find(item => item._id === replyId)
        if (hit) {
          hit.subCount++
        }
      }
    }
  }
}

export const actions: Actions<CommentStateTree, RootState> = {
  async fetchList ({ commit, state }, params: WebApi.CommentModule.list.Req) {
    if (state.list.fetching) {
      return
    }
    const args = {
      page: params && params.page || 1,
      sortBy: state.sort.sortBy,
      order: state.sort.order,
      type: 0
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await api.getCommentList(Object.assign({}, params, args))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  },
  async like ({ commit, dispatch }, id) {
    const { success } = await api.likeComment(id)
    if (success) {
      commit(LIKE, id)
      dispatch('app/updateHistory', { commentId: id }, { root: true })
    }
    return success
  },
  async publish ({ commit, dispatch }, params: WebApi.CommentModule.create.Req) {
    const args = {
      type: 0
    }
    const { success, data } = await api.publishComment(Object.assign({}, params, args))
    if (success) {
      commit(PUBLISH, data)
      commit('article/COMMENT_SUCCESS', null, { root: true })
      dispatch('app/updateUser', data.author, { root: true })
    }
    return { success, data }
  }
}

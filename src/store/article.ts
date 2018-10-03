import api from '@/api'
import { ArticleStateTree, Getters, RootState, Mutations, Actions } from '@/utils/interfaces'

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST'
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE'
const FETCH_ARCHIVE_REQUEST = 'FETCH_ARCHIVE_REQUEST'
const FETCH_ARCHIVE_SUCCESS = 'FETCH_ARCHIVE_SUCCESS'
const FETCH_ARCHIVE_FAILURE = 'FETCH_ARCHIVE_FAILURE'
const FETCH_DETAIL_REQUEST = 'FETCH_DETAIL_REQUEST'
const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS'
const FETCH_DETAIL_FAILURE = 'FETCH_DETAIL_FAILURE'
const CLEAR_DETAIL = 'CLEAR_DETAIL'
const LIKE_REQUEST = 'LIKE_REQUEST'
const LIKE_SUCCESS = 'LIKE_SUCCESS'
const LIKE_FAILURE = 'LIKE_FAILURE'
const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
const CLEAR_LIST = 'CLEAR_LIST'

const getDefaultPageInfo = () => ({
  total: 0,
  current: 1,
  pages: 0,
  limit: 10
})

export const state = (): ArticleStateTree => ({
  list: {
    fetching: false,
    data: [],
    pageInfo: getDefaultPageInfo()
  },
  detail: {
    fetching: false,
    liking: false,
    data: {}
  },
  archive: {
    fetching: false,
    data: [],
    count: 0
  }
})

export const getters: Getters<ArticleStateTree, RootState> = {
  list: state => state.list.data,
  listFetching: state => state.list.fetching,
  pageInfo: state => state.list.pageInfo,
  detail: state => state.detail.data,
  detailFetching: state => state.detail.fetching,
  detailLiking: state => state.detail.liking,
  archives: state => state.archive.data,
  archivesCount: state => state.archive.count,
  archivesFetching: state => state.archive.fetching
}

export const mutations: Mutations<ArticleStateTree> = {
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
  [FETCH_ARCHIVE_REQUEST]: state => (state.archive.fetching = true),
  [FETCH_ARCHIVE_FAILURE]: state => (state.archive.fetching = false),
  [FETCH_ARCHIVE_SUCCESS]: (state, { list, count }) => {
    state.archive.fetching = false
    state.archive.data = list
    state.archive.count = count
  },
  [FETCH_DETAIL_REQUEST]: state => (state.detail.fetching = true),
  [FETCH_DETAIL_FAILURE]: state => (state.detail.fetching = false),
  [FETCH_DETAIL_SUCCESS]: (state, data) => {
    state.detail.fetching = false
    state.detail.data = data
  },
  [CLEAR_DETAIL]: state => {
    state.detail.fetching = false
    state.detail.liking = false
    state.detail.data = {}
  },
  [LIKE_REQUEST]: state => (state.detail.liking = true),
  [LIKE_FAILURE]: state => (state.detail.liking = false),
  [LIKE_SUCCESS]: (state, like) => {
    state.detail.liking = false
    const article = state.list.data.find(item => item._id === state.detail.data._id)
    if (like) {
      if (state.detail.data.meta) {
        state.detail.data.meta.ups++
      }
      if (article && article.meta) article.meta.ups++
    } else {
      if (state.detail.data.meta) {
        state.detail.data.meta.ups--
      }
      if (article && article.meta) article.meta.ups--
    }
  },
  [COMMENT_SUCCESS]: state => {
    if (state.detail.data.meta) {
      state.detail.data.meta.comments++
    }
  }
}

export const actions: Actions<ArticleStateTree, RootState> = {
  async fetchList ({ commit, state }, params: WebApi.ArticleModule.list.Req) {
    if (state.list.fetching) {
      return
    }
    const pageInfo = {
      page: params && params.page || 1
    }
    commit(FETCH_LIST_REQUEST)
    const { success, data } = await api.getArticleList(Object.assign({}, params, pageInfo))
    if (success) {
      commit(FETCH_LIST_SUCCESS, data)
    } else {
      commit(FETCH_LIST_FAILURE)
    }
    return success
  },
  async fetchArchives ({ commit, state }) {
    if (state.archive.fetching) {
      return
    }
    commit(FETCH_ARCHIVE_REQUEST)
    const { success, data } = await api.getArchives()
    if (success) {
      commit(FETCH_ARCHIVE_SUCCESS, data)
    } else {
      commit(FETCH_ARCHIVE_FAILURE)
    }
    return success
  },
  async fetchDetail ({ commit, state }, id) {
    if (state.detail.fetching) {
      return
    }
    commit(FETCH_DETAIL_REQUEST)
    const { success, data } = await api.getArticleDetail(id)
    if (success) {
      commit(FETCH_DETAIL_SUCCESS, data)
    } else {
      commit(FETCH_DETAIL_FAILURE)
    }
    return success
  },
  async like ({ commit, dispatch, state, rootState }, { id, like = true }) {
    if (state.detail.liking) {
      return
    }
    commit(LIKE_REQUEST)
    const { success } = await api.likeArticle(id)
    if (success) {
      commit(LIKE_SUCCESS, like)
      if (like) {
        dispatch('app/updateHistory', { articleId: id }, { root: true })
      } else {
        const articlesHis = rootState.app.history.articles.slice()
        const index = articlesHis.findIndex(item => item === id)
        if (index > -1) {
          articlesHis.splice(index, 1)
        }
        dispatch('app/updateHistory', {
          articles: articlesHis
        }, {
            root: true
        })
      }
    } else {
      commit(LIKE_FAILURE)
    }
    return success
  }
}

import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex'

export interface StateTree { }

export interface RootState {
  app: AppStateTree
}

export interface Getters<S, R> extends GetterTree<S, R> { }

export interface Mutations<S> extends MutationTree<S> { }

export interface Actions<S, R> extends ActionTree<S, R> { }

export interface ActionCtx<S, R> extends ActionContext<S, R> { }

export interface AppStateTree {
  theme: 'light' | 'dark'
  mobileLayout: boolean
  fullScreen: boolean
  fullColumn: boolean
  history: {
    articles: string[]
    comments: string[]
  }
  user: null | WebApi.UserModule.User,
  setting: null | WebApi.SettingModule.Setting
  hotList: WebApi.ArticleModule.Article[]
  categoryList: WebApi.CategoryModule.Category[]
  tagList: WebApi.TagModule.Tag[]
  articleFontSize: number
}

export interface ArticleStateTree {
  list: {
    fetching: boolean
    data: WebApi.ArticleModule.Article[]
    pageInfo: WebApi.PageInfo
  }
  detail: {
    fetching: boolean
    liking: boolean
    data: WebApi.ArticleModule.Article
  }
  archive: {
    fetching: boolean
    data: any[]
    total: number
  }
}

export interface CommentStateTree {
  sort: {
    sortBy: 'createdAt' | 'updatedAt' | 'ups',
    order: -1 | 1
  },
  list: {
    fetching: boolean
    data: WebApi.CommentModule.Comment[]
    pageInfo: WebApi.PageInfo
  }
}

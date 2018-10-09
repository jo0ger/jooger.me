import Api from './api'

export const apiClient = new Api()

class ApiModule extends Api {
  public getSettingData () {
    type Res = WebApi.SettingModule.getData.Res
    return this.get<null, Res>('/setting')
  }

  public getArticleList (params: WebApi.ArticleModule.list.Req) {
    type Req = WebApi.ArticleModule.list.Req
    type Res = WebApi.ArticleModule.list.Res
    return this.get<Req, Res>('/articles', params)
  }

  public getHotArticleList () {
    type Res = WebApi.ArticleModule.hotList.Res
    return this.get<null, Res>('/articles/hot')
  }

  public getArticleDetail (id: string) {
    type Res = WebApi.ArticleModule.item.Res
    return this.get<null, Res>(`/articles/${id}`)
  }

  public getArchives () {
    return this.get<null, any>('/articles/archives')
  }

  public likeArticle (id: string, params: any = {}) {
    type Res = WebApi.ArticleModule.like.Res
    return this.patch<null, Res>(`/articles/${id}/like`, params)
  }

  public getCategoryList (params?: WebApi.CategoryModule.list.Req) {
    type Req = WebApi.CategoryModule.list.Req
    type Res = WebApi.CategoryModule.list.Res
    return this.get<Req, Res>('/categories', params)
  }

  public getCategoryDetail (id: string) {
    type Res = WebApi.CategoryModule.item.Res
    return this.get<null, Res>(`/categories/${id}`)
  }

  public getTagList (params?: WebApi.TagModule.list.Req) {
    type Req = WebApi.TagModule.list.Req
    type Res = WebApi.TagModule.list.Res
    return this.get<Req, Res>('/tags', params)
  }

  public getTagDetail (id: string) {
    type Res = WebApi.TagModule.item.Res
    return this.get<null, Res>(`/tags/${id}`)
  }

  public getCommentList (params: WebApi.CommentModule.list.Req) {
    type Req = WebApi.CommentModule.list.Req
    type Res = WebApi.CommentModule.list.Res
    return this.get<Req, Res>('/comments', params)
  }

  public getCommentDetail (id: string) {
    type Res = WebApi.CommentModule.item.Res
    return this.get<null, Res>(`/comments/${id}`)
  }

  public publishComment (data: WebApi.CommentModule.create.Req) {
    type Req = WebApi.CommentModule.create.Req
    type Res = WebApi.CommentModule.create.Res
    return this.post<Req, Res>('/comments', data)
  }

  public likeComment (id: string, params: any = {}) {
    type Res = WebApi.CommentModule.like.Res
    return this.patch<null, Res>(`/comments/${id}/like`, params)
  }

  public getVoice () {
    type Res = WebApi.AgentModule.voice.Res
    return this.get<null, Res>('/agent/voice')
  }
}

export default new ApiModule()

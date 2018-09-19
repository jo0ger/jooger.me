/**
 * @desc Api接口结构定义，接口数据变动需要同步到这里
 */

declare namespace WebApi {
    /**
     * **************************************************
     * 通用定义
     * **************************************************
     */

    /**
     * @desc 数据返回格式
     */
    export interface IResponse<T = {}> {
        code: number
        success: boolean
        message: string
        data: T
    }

    /**
     * @desc 分页信息
     */
    export interface PageInfo {
        total: number
        current: number
        pages: number
        limit: number
    }

    /**
     * @desc 分页 request 参数规范
     */
    export interface IPageableRequest {
        page: number
        limit?: number
    }

    /**
     * @desc 分页 response 返回数据规范
     */
    export interface IPageableResponse<T = {}> extends IResponse<{
        list: T[],
        pageInfo: PageInfo,
    }> {}

    export interface ModuleShare {
        _id?: string
        createdAt?: string | Date
        updatedAt?: string
        extends?: Array<{
            key?: string
            value?: string,
        }>
    }

    /**
     * **************************************************
     * 各业务模块
     * **************************************************
     * @namespace {Module}Name
     * @example
     *  namespace TestModule {
     *      ## 请求参数类型
     *      export type Req = {}
     *      ## 返回数据类型
     *      export type Res = IReponse<T>
     *  }
     */

    /**
     * @desc Article模块
     */
    namespace ArticleModule {
        namespace list {
            export type Req =  IPageableRequest & {
                state?: number
                source?: number
                category?: string
                tag?: string
                keyword?: string
                startDate?: Date
                endDate?: Date
                order?: -1 | 1
                sortBy?: string,
            }

            export type Res = IPageableResponse<Article>
        }

        namespace item {
            export type Res = IResponse<Article>
        }

        namespace archives {
            export type Res = IResponse<{
                count: number
                list: Array<{
                    year: number
                    months: Array<{
                        month: number
                        monthStr: string
                        articles: Article[],
                    }>,
                }>,
            }>
        }

        namespace create {
            export type Req = Article
            export type Res = IResponse<Article>
        }

        namespace update {
            export type Req = Article
            export type Res = IResponse<Article>
        }

        namespace like {
            export type Res = IResponse<boolean>
        }

        namespace unlike {
            export type Res = IResponse<boolean>
        }

        namespace deleteItem {
            export type Res = IResponse<boolean>
        }

        type Article = ModuleShare & {
            title?: string
            description?: string
            state?: number
            source?: number
            content?: string
            renderedContnt?: string
            keywords?: string[]
            thumb?: string
            category?: CategoryModule.Category | string
            tag?: TagModule.Tag[] | string[]
            publishedAt?: string
            meta?: {
                pvs: number
                ups: number
                comments: number,
            },
        }
    }

    namespace CategoryModule {
        type Category = ModuleShare & {
            name: string
            description: string,
        }

        namespace list {
            export type Req =  IPageableRequest & {
                keyword?: string,
            }

            export type Res = IResponse<Category[]>
        }

        namespace item {
            export type Res = IResponse<Category>
        }

        namespace create {
            export type Req = Category
            export type Res = IResponse<Category>
        }

        namespace update {
            export type Req = Category
            export type Res = IResponse<Category>
        }

        namespace deleteItem {
            export type Res = IResponse<boolean>
        }
    }

    namespace TagModule {
        type Tag = ModuleShare & {
            name: string
            description: string,
        }

        namespace list {
            export type Req =  IPageableRequest & {
                keyword?: string,
            }

            export type Res = IResponse<Tag[]>
        }

        namespace item {
            export type Res = IResponse<Tag>
        }

        namespace create {
            export type Req = Tag
            export type Res = IResponse<Tag>
        }

        namespace update {
            export type Req = Tag
            export type Res = IResponse<Tag>
        }

        namespace deleteItem {
            export type Res = IResponse<boolean>
        }
    }

    namespace UserModule {
        type User = ModuleShare & {
            name: string
            email: string
            avatar: string
            role: number
            password?: string
            mute: boolean,
        }

        namespace list {
            export type Res = IResponse<User[]>
        }

        namespace item {
            export type Res = IResponse<User>
        }

        namespace update {
            export interface Req {
                mute?: boolean
            }
            export type Res = IResponse<User>
        }
    }

    namespace NotificationModule {
        type Notification = ModuleShare & {
            type: number
            classify: string
            viewed: boolean
            verb: string
            target: {
                article?: ArticleModule.Article
                user?: UserModule.User
                comment?: CommentModule.Comment,
            }
            actors: {
                from?: UserModule.User
                to?: UserModule.User,
            },
        }

        namespace list {
            export type Req = IPageableRequest & {
                type?: number
                classify?: number
                viewed?: boolean,
            }
            export type Res = IPageableResponse<Notification>
        }

        namespace item {
            export type Res = IResponse<Notification>
        }

        namespace view {
            export type Res = IResponse<boolean>
        }

        namespace viewAll {
            export type Res = IResponse<boolean>
        }

        namespace deleteItem {
            export type Res = IResponse<boolean>
        }

        namespace getUnviewedCount {
            export type Res = IResponse<{
                total: number,
                counts: {
                    general: number,
                    comment: number,
                    like: number,
                    user: number,
                },
            }>
        }
    }

    namespace CommentModule {
        type Comment = ModuleShare & {
            renderedContent: string
            state: number
            spam: boolean
            author: UserModule.User
            ups: number
            sticky: boolean
            type: number
            article?: ArticleModule.Article
            meta: {
                ip: string
                location: object
                ua: string
                referer: string,
            }
            parent: Comment
            forward: Comment,
        }

        namespace list {
            export type Req =  IPageableRequest & {
                state?: number
                type?: number
                author?: string
                article?: string
                parent?: string
                keyword?: string
                startDate?: Date
                endDate?: Date
                orderBy?: -1 | 1
                sortBy?: string,
            }

            export type Res = IPageableResponse<Comment>
        }

        namespace item {
            export type Res = IResponse<Comment>
        }

        namespace create {
            export type Req = Comment
            export type Res = IResponse<Comment>
        }

        namespace update {
            export type Req = Comment
            export type Res = IResponse<Comment>
        }

        namespace like {
            export type Res = IResponse<boolean>
        }

        namespace unlike {
            export type Res = IResponse<boolean>
        }

        namespace deleteItem {
            export type Res = IResponse<boolean>
        }
    }

    namespace SettingModule {
        type Setting = ModuleShare & {
            site: {
                welcome: string
                links: Array<{
                    name: string
                    github: string
                    avatar?: string
                    slogan?: string
                    site: string,
                }>
                musicId: string,
            }
            personal: {
                slogan: string
                description: string
                tag: string[],
                hobby: string[],
                skill: string[],
                location: string
                company: string
                github: object,
            }
            keys: {
                aliyun: {
                    accessKeyId: string
                    accessKeySecret: string
                    bucket: string
                    region: string,
                },
                alinode: {
                    appid: string
                    secret: string,
                },
                aliApiGateway: {
                    [key: string]: any,
                },
                mail: {
                    user: string
                    pass: string,
                },
                github?: {
                    clientID: string
                    clientSecret: string,
                },
            }
            limit: {
                articleCount: number
                commentCount: number
                relatedArticleCount: number
                hotArticleCount: number
                commentSpamMaxCount: number,
            },
        }

        namespace getData {

            export type Res = IResponse<Setting>
        }

        namespace update {
            export interface Req {
                site: object
                keys: object
                limit: object
            }
            export type Res = IResponse<Setting>
        }
    }

    namespace AuthModule {
        namespace login {
            export interface Req {
                username: string
                password: string
            }
            export type Res = IResponse<{
                id: string
                token: string,
            }>
        }

        namespace logout {
            export type Res = IResponse<{}>
        }

        namespace info {
            export type Res = IResponse<UserModule.User>
        }

        namespace update {
            export type Req = UserModule.User
            export type Res = IResponse<UserModule.User>
        }

        namespace password {
            export interface Req {
                oldPassword: string
                password: string
            }
            export type Res = IResponse<{}>
        }
    }

    namespace StatModule {
        interface CountItem {
            today: number
            total: number
        }

        namespace count {
            export type Res = IResponse<{
                [key: string]: CountItem,
            }>
        }

        namespace trend {
            export interface Req {
                startDate: string
                endDate: string
                dimension: string
                target: string
            }
            export type Res = IResponse<Req & {
                trend: Array<{
                    date: string
                    count: number,
                }>,
            }>
        }
    }
}

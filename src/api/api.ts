import { AxiosRequestConfig } from 'axios'
import Http from './http'
import { symbolApiPrefix, symbolApiContext } from '@/utils/decorators'

export default class Api extends Http {
    constructor () {
        super()
        this.constructor.prototype[symbolApiContext] = this
    }

    public request<Res> (config: AxiosRequestConfig) {
        return this.processPromise<Res>(Http.client.request(Object.assign({}, config)))
    }

    public originGet<Req, Res> (url: string = '', params?: Req) {
        return this.processPromise<Res>(Http.client.get(url, { params }))
    }

    public originPost<Req, Res> (url: string = '', data?: Req) {
        return this.processPromise<Res>(Http.client.post(url, data))
    }

    public originPatch<Req, Res> (url: string = '', data?: Req) {
        return this.processPromise<Res>(Http.client.patch(url, data))
    }

    public originDelete<Res> (url: string = '') {
        return this.processPromise<Res>(Http.client.delete(url))
    }

    public get<Req, Res> (url: string = '', params?: Req) {
        return this.originGet<Req, Res>(this.processUrl(url), params)
    }

    public post<Req, Res> (url: string = '', data?: Req) {
        return this.originPost<Req, Res>(this.processUrl(url), data)
    }

    public patch<Req, Res> (url: string = '', data?: Req) {
        return this.originPatch<Req, Res>(this.processUrl(url), data)
    }

    public delete<Res> (url: string = '') {
        return this.originDelete<Res>(this.processUrl(url))
    }

    private processUrl (url: string) {
        let prefix = (this as any)[symbolApiPrefix] || ''
        prefix = prefix.trim()
        if (prefix && typeof prefix === 'string') {
            return prefix + url
        }

        return url
    }

    private processPromise<Res> (ps: Promise<any>): Promise<Res> {
        return ps.then(res => res && res.data || {})
    }
}

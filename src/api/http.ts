import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError
} from 'axios'
import {
  WHITE_API_LIST,
  AXIOS_DEFAULT_CONFIG
} from '@/config'

let msgVisible = false

export default class Http {
  public static client: AxiosInstance

  constructor() {
    this.createAxios()
  }

  private createAxios() {
    if (Http.client) {
      return Http.client
    }
    const client = axios.create(Object.assign({}, AXIOS_DEFAULT_CONFIG, {
      transformRequest: [
        (data: any) => data,
      ],
      transformResponse: [
        (data: any) => {
          if (data) {
            return data
          }
          throw new Error('网络错误')
        },
      ],
    }))
    client.interceptors.request.use(config => this.processRequest(config), err => Promise.reject(err))
    client.interceptors.response.use(response => this.processResponse(response), err => this.processError(err))
    Http.client = client
  }

  private processRequest(config: AxiosRequestConfig) {
    return {
      ...config,
      data: this.processData(config.data, config.method),
      params: this.processData(config.params, config.method),
    }
  }

  private processResponse(response: AxiosResponse < WebApi.IResponse > ) {
    let errMsg = '接口错误，请稍后重试'
    if (!response || !response.data) {
      throw new Error(errMsg)
    }
    if (response.data.code !== 200) {
      // 如果在白名单内，就不全局处理了
      if (response.request.url && !WHITE_API_LIST.some(item => response.request.url.includes(item))) {
        errMsg = response.data.message || errMsg
        // TODO: message
        throw new Error(errMsg)
      }
    }
    return response
  }

  private processError(err: AxiosError) {
    if (!msgVisible) {
      msgVisible = true
      if (err.response && err.response.status === 401) {
        // TODO: message
        // Message.error({
        //     content: err.response.data.message,
        //     onClose: () => {
        //         msgVisible = false
        //     },
        // })
        return
      }
      // 如果是手动取消的请求，不显示错误信息
      if (axios.isCancel(err)) {
        console.error(err)
      } else {
        // TODO: message
        // Message.error({
        //     content: err.response && err.response.data.message || '网络错误',
        //     onClose: () => {
        //         msgVisible = false
        //     },
        // })
      }
    }
    throw err
  }

  private processData(data: any, method?: string) {
    if (!data) {
      return null
    }
    let payload = data
    if (payload instanceof FormData) {
      // pass
    } else if (method === 'post' || method === 'patch') {
      payload = JSON.stringify(data)
    }
    return payload
  }
}

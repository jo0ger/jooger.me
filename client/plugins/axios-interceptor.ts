/**
 * @desc Axios拦截
 * @author Jooger <iamjooger@gmail.com>
 * @since 31 Mar 2018
 */

'use strict'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}

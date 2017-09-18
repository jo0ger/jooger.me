/**
 * @desc User agent
 * @author Jooger <zzy1198258955@163.com>
 * @date 13 Sep 2017
 */

export const hasMobileUA = (ua = window.navigator.userAgent) => /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g.test(ua)

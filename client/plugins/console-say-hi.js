/**
 * @desc Say hi in console
 * @see http://patorjk.com/software/taag
 * @author Jooger <zzy1198258955@163.com>
 * @date 4 Nov 2017
 */

'use strict'

export default ({ isClient }) => {
  if (process.browser && process.env.NODE_ENV !== 'production' && isClient) {
    console.clear()
    // console.log('Font Name: ANSI Shadow')
    console.info(
      `
      %c
██╗  ██╗██╗       ██╗███╗   ███╗         ██╗ ██████╗  ██████╗  ██████╗ ███████╗██████╗ ██╗
██║  ██║██║       ██║████╗ ████║         ██║██╔═══██╗██╔═══██╗██╔════╝ ██╔════╝██╔══██╗██║
███████║██║       ██║██╔████╔██║         ██║██║   ██║██║   ██║██║  ███╗█████╗  ██████╔╝██║
██╔══██║██║       ██║██║╚██╔╝██║    ██   ██║██║   ██║██║   ██║██║   ██║██╔══╝  ██╔══██╗╚═╝
██║  ██║██║▄█╗    ██║██║ ╚═╝ ██║    ╚█████╔╝╚██████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║██╗
╚═╝  ╚═╝╚═╝╚═╝    ╚═╝╚═╝     ╚═╝     ╚════╝  ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝
%c
人的平均寿命77岁
一共28105天
67w小时
4047w分钟
24亿秒左右
这10秒你在读这段话，这10秒你属于我
你好陌生人，我爱你 ❤️

%c
联系我：iamjooger@gmail.com    
    `
    , 'color: #ed0a75;font-size:1em;', 'color: #ed0a75;font-weight:bold', 'color: #666')
  }
}

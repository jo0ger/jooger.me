/**
 * @desc 评论meta解析
 * @author Jooger <iamjooger@gmail.com>
 * @date 5 Jan 2018
 */

'use strict'

// ua解析
/* eslint-disable no-cond-assign */
export const UAParse = e => {
  let r = []
  let outputer = ''
  if (r = e.match(/MSIE\s([^\s|]+)/gi)) {
    outputer = `<span class="ua_ie"><i class="icon icon-ie"></i>Internet Explorer | ${r[0].replace('MSIE', '').split('.')[0]}`
  } else if (r = e.match(/FireFox\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_firefox"><i class="icon icon-ff"></i>Mozilla FireFox | ${r1[1]}`
  } else if (r = e.match(/UC([\d]*)\/([^\s]+)/ig)) {
    outputer = '<span class="ua_maxthon"><i class="icon icon-aoyou"></i>Maxthon'
  } else if (r = e.match(/UBrowser([\d]*)\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_ucweb"><i class="icon icon-uc"></i>UCBrowser | ${r1[1]}`
  } else if (r = e.match(/MetaSr/ig)) {
    outputer = '<span class="ua_sougou"><i class="icon icon-sougou"></i>搜狗浏览器'
  } else if (r = e.match(/2345Explorer/ig)) {
    outputer = '<span class="ua_2345explorer"><i class="icon icon-internet"></i>2345王牌浏览器'
  } else if (r = e.match(/2345chrome/ig)) {
    outputer = '<span class="ua_2345chrome"><i class="icon icon-internet"></i>2345加速浏览器'
  } else if (r = e.match(/LBBROWSER/ig)) {
    outputer = '<span class="ua_lbbrowser"><i class="icon icon-internet"></i>猎豹安全浏览器'
  } else if (r = e.match(/MicroMessenger\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_qq"><i class="icon icon-wechat"></i>微信 | ${r1[1].split('/')[0]}`
  } else if (r = e.match(/QQBrowser\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_qq"><i class="icon icon-qq"></i>QQ浏览器 | ${r1[1].split('/')[0]}`
  } else if (r = e.match(/QQ\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_qq"><i class="icon icon-qq"></i>QQ浏览器 | ${r1[1].split('/')[0]}`
  } else if (r = e.match(/MiuiBrowser\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_mi"><i class="icon icon-internet"></i>Miui浏览器 | ${r1[1].split('/')[0]}`
  } else if (r = e.match(/Chrome([\d]*)\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_chrome"><i class="icon icon-chrome"></i>Chrome | ${r1[1].split('.')[0]}`
  } else if (r = e.match(/safari\/([^\s]+)/ig)) {
    let r1 = r[0].split('/')
    outputer = `<span class="ua_apple"><i class="icon icon-safari"></i>Apple Safari | ${r1[1]}`
  } else if (r = e.match(/Opera[\s|/]([^\s]+)/ig)) {
    outputer = `<span class="ua_opera"><i class="icon icon-opera"></i>Opera | ${r[1]}`
  } else if (r = e.match(/Trident\/7.0/gi)) {
    outputer = `<span class="ua_ie"><i class="icon icon-ie11"></i>Internet Explorer 11`
  } else {
    outputer = '<span class="ua_other"><i class="icon icon-internet"></i>其它浏览器'
  }
  return `${outputer}</span>`
}

// os解析
export const OSParse = e => {
  let os = ''
  if (e.match(/win/ig)) {
    if (e.match(/nt 5.1/ig)) {
      os = '<span class="os_xp"><i class="icon icon-windows"></i>Windows XP'
    } else if (e.match(/nt 6.1/ig)) {
      os = '<span class="os_7"><i class="icon icon-windows"></i>Windows 7'
    } else if (e.match(/nt 6.2/ig)) {
      os = '<span class="os_8"><i class="icon icon-windows"></i>Windows 8'
    } else if (e.match(/nt 6.3/ig)) {
      os = '<span class="os_8_1"><i class="icon icon-windows"></i>Windows 8.1'
    } else if (e.match(/nt 10.0/ig)) {
      os = '<span class="os_10"><i class="icon icon-windows"></i>Windows 10'
    } else if (e.match(/nt 6.0/ig)) {
      os = '<span class="os_vista"><i class="icon icon-windows"></i>Windows Vista'
    } else if (e.match(/nt 5/ig)) {
      os = '<span class="os_2000"><i class="icon icon-windows"></i>Windows 2000'
    } else {
      os = '<span class="os_windows"><i class="icon icon-windows"></i>Windows'
    }
  } else if (e.match(/android/ig)) {
    os = '<span class="os_android"><i class="icon icon-android"></i>Android'
  } else if (e.match(/ubuntu/ig)) {
    os = '<span class="os_ubuntu">Ubuntu'
  } else if (e.match(/linux/ig)) {
    os = '<span class="os_linux"><i class="icon icon-linux"></i>Linux'
  } else if (e.match(/iphone/ig)) {
    os = '<span class="os_mac"><i class="icon icon-apple"></i>iPhone OS'
  } else if (e.match(/mac/ig)) {
    os = '<span class="os_mac"><i class="icon icon-apple"></i>Mac OS X'
  } else if (e.match(/unix/ig)) {
    os = '<span class="os_unix"><i class="icon icon-unix"></i>Unix'
  } else {
    os = '<span class="os_other"><i class="icon icon-phone"></i>Other'
  }
  return `${os}</span>`
}

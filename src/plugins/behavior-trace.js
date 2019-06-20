/**
 * @desc 用户行为追溯
 * @author Jooger <iamjooger@gmail.com>
 * @date 06 May 2019
 */

import { IS_PROD } from '@/config'
import Vue from 'vue'
import * as fundebug from 'fundebug-javascript'
import fundebugVue from 'fundebug-vue'
import 'fundebug-revideo'
import LogRocket from 'logrocket'

export default () => {
  if (process.client && IS_PROD) {
    setupFundebug()
    setupFullstory()
    setupLogRocket()
    setupGrowingIO()
    setupMouseFlow()
    setupSmartLook()
  }
}

// SEE: https://www.fundebug.com/dashboard/5cd00c0ed11b9a056bba4d83/errors/inbox
function setupFundebug () {
  fundebug.apikey = 'ce3171cd3a4fcfdfcb3c626c565fa3d7bfc9d61ee64f7aea6ea65e1190696e1c'
  fundebugVue(fundebug, Vue)
}

// SEE: https://app.fullstory.com
function setupFullstory() {
  const win = window
  win._fs_debug = false;
  win._fs_host = 'fullstory.com';
  win._fs_org = 'KV7F5';
  win._fs_namespace = 'FS';
  (function (m, n, e, t, l, o, g, y) {
    if (e in m) { if (m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); } return; }
    g = m[e] = function (a, b, s) { g.q ? g.q.push([a, b, s]) : g._api(a, b, s); }; g.q = [];
    o = n.createElement(t); o.async = 1; o.crossOrigin = 'anonymous'; o.src = 'https://' + win._fs_host + '/s/fs.js';
    y = n.getElementsByTagName(t)[0]; y.parentNode.insertBefore(o, y);
    g.identify = function (i, v, s) { g(l, { uid: i }, s); if (v) g(l, v, s) }; g.setUserVars = function (v, s) { g(l, v, s) }; g.event = function (i, v, s) { g('event', { n: i, p: v }, s) };
    g.shutdown = function () { g('rec', !1) }; g.restart = function () { g('rec', !0) };
    g.consent = function (a) { g('consent', !arguments.length || a) };
    g.identifyAccount = function (i, v) { o = 'account'; v = v || {}; v.acctId = i; g(o, v) };
    g.clearUserCookie = function () {/** */};
  })(window, document, win._fs_namespace, 'script', 'user');
}

// SEE: https://app.logrocket.com
function setupLogRocket () {
  LogRocket.init('evanfe/joogerme')
}

function setupGrowingIO () {
  (function (e, t, n, g, i) {
    e[i] = e[i] || function () {
      (e[i].q = e[i].q || []).push(arguments)
    }
    n = t.createElement("script")
    const tag = t.getElementsByTagName("script")[0]
    n.async = 1
    n.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + g
    tag.parentNode.insertBefore(n, tag)
  })(window, document, "script", "assets.growingio.com/2.1/gio.js", "gio")
  window.gio('init', '9c24b896d23d1d67', {})
  window.gio('send')
}

function setupMouseFlow () {
  window._mfq = window._mfq || [];
    (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.async = true;
        mf.src = "//cdn.mouseflow.com/projects/06a8431b-afe8-4ed1-852b-facec4be2c70.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
    })();
}

function setupSmartLook () {
  window.smartlook||(function(d) {
  var o=window.smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
  var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
  c.charset='utf-8';c.src='https://rec.smartlook.com/recorder.js';h.appendChild(c);
  })(document);
  window.smartlook('init', '8059a279f9daeae36e35dcceff5a23c469ec5d5e');
}

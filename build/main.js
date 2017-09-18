require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("axios");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var isProd = "development" === 'production';

module.exports = {
  srcDir: 'client/',
  cache: {
    max: 20,
    maxAge: 600000
  },
  dev: !isProd,
  head: {
    title: 'Jooger.me - Jooger jooger, chicken dinner',
    titleTemplate: '%s - Jooger.me',
    meta: [{ charset: 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }, { 'http-equiv': 'Cache-Control', content: 'no-transform' }, { 'http-equiv': 'Cache-Control', content: 'no-siteapp' }, { 'http-equiv': 'cleartype', content: 'on' }, { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' }, { name: 'MobileOptimized', content: '320' }, { name: 'HandheldFriendly', content: 'True' }, { name: 'apple-mobile-web-app-capable', content: 'yes' }, { name: 'author', content: 'zzy1198258955@163.com' }, { hid: 'keywords', name: 'keywords', content: 'Jooger,Jooger.me,Blog,FE,前端技术开发' }, { hid: 'description', name: 'description', content: 'Jooger jooger, chicken dinner' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: '//at.alicdn.com/t/font_268993_tu4k21igcspgmn29.css' }]
  },
  css: ['normalize.css', 'swiper/dist/css/swiper.css', { src: '~assets/stylus/index.styl', lang: 'stylus' }],
  loading: '~/components/Common/PageLoading',
  // loading: { color: '#2196f3' },
  build: {
    vendor: ['axios', 'bezier-easing', 'highlight.js', 'marked']
  },
  plugins: [{ src: '~plugins/router.js', ssr: false }, { src: '~plugins/filter.js' }, { src: '~plugins/swiper.js', ssr: false }, { src: '~plugins/image.js', ssr: false }],
  router: {
    linkActiveClass: 'active'
    // transition: {
    //   name: 'fade',
    //   mode: 'out-in'
    // }
  } };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controllers__ = __webpack_require__(9);
/**
 * @desc server routes
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */



/* harmony default export */ exports["a"] = function (router) {
  router.use('*', function (ctx, next) {
    ctx.response.set('Content-Type', 'application/json;charset=utf-8');
    return next();
  });
  router.get('article-list', '/articles', __WEBPACK_IMPORTED_MODULE_0__controllers__["a" /* default */].postController.list);
  router.get('article-detail', '/article/:number', __WEBPACK_IMPORTED_MODULE_0__controllers__["a" /* default */].postController.item);
};

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @desc App Config
 * @author Jooger <zzy1198258955@163.com>
 * @date 8 Sep 2017
 */

// const isProd = process.env.NODE_ENV === 'production'

/* harmony default export */ exports["a"] = {
  service: {
    url: '/',
    method: 'get',
    baseURL: '/api',
    // baseURL: isProd ? 'http://api.jooger.me/v1.0' : 'http://localhost:5000/v1.0',
    // baseURL: process.env.baseUrl,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    timeout: 120000,
    responseType: 'json',
    proxy: {
      host: '127.0.0.1',
      port: process.env.PORT || 3000
    }
  }
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(6);
/* unused harmony export fetcher */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return CODE; });
/**
 * @desc Api service
 * @author Jooger <zzy1198258955@163.com>
 * @date 8 Sep 2017
 */




var logMsg = function logMsg() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';

  if (msg) {
    console.info(msg);
  }
};

var fetcher = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].service);

var CODE = {
  FAILED: -1,
  SUCCESS: 0,
  UNAUTHORIZED: 401
};

fetcher.interceptors.request.use(function (config) {
  return config;
}, function (err) {
  return Promise.reject(err);
});

fetcher.interceptors.response.use(function (response) {
  if (!response || !response.data) {
    return logMsg('服务器异常', 'error');
  }
  switch (response.data.code) {
    case CODE.UNAUTHORIZED:
      logMsg(response.data.message, 'error');
      break;
    case CODE.FAILED:
      logMsg(response.data.message, 'error');
      break;
    case CODE.SUCCESS:
      if (response.config.method.toLocaleUpperCase() !== 'GET') {
        logMsg(response.data.message);
      }
      break;
    default:
      break;
  }
  return Object.assign({
    success: response.data && response.data.code === CODE.SUCCESS
  }, response.data);
}, function (error) {
  var status = error.response && error.response.status || error.code;
  var message = error.message ? error.message : '\u8BF7\u6C42\u9519\u8BEF' + (status ? '\uFF0Ccode:' + status : '');
  logMsg(message, 'error');
  return error.response || {
    code: CODE.FAILED,
    message: message
  };
});

var wrap = function wrap(url) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'get';
  return function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return fetcher.request(Object.assign({}, config, { method: type, url: url }));
  };
};

/* unused harmony default export */ var _unused_webpack_default_export = {
  article: {
    fetchList: wrap('/articles'),
    fetchDetail: function fetchDetail(id) {
      return wrap('/article/' + id);
    }
  }
};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @desc posts config
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */

/* harmony default export */ exports["a"] = {
  repo: 'git-hook-test',
  owner: 'jo0ger',
  clientId: 'b4983366c4c7549a09f1',
  clientSecret: '76fd8c26a21659d7eb925af0ed3498eabed49277'
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__posts_config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client_service__ = __webpack_require__(7);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @desc server controllers
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */


// import fm from 'front-matter'


var imageReg = /^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/;

var postController = { list: {}, item: {} };

postController.list = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var _ctx$query, _ctx$query$page, page, _ctx$query$per_page, per_page, res, link, prev, _next, articles;

    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$query = ctx.query, _ctx$query$page = _ctx$query.page, page = _ctx$query$page === undefined ? 1 : _ctx$query$page, _ctx$query$per_page = _ctx$query.per_page, per_page = _ctx$query$per_page === undefined ? 12 : _ctx$query$per_page;
            _context.next = 3;
            return __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('https://api.github.com/repos/' + __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].owner + '/' + __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].repo + '/issues', {
              params: {
                filter: 'created',
                state: 'open',
                sort: 'created',
                direction: 'desc',
                client_id: __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].clientId,
                client_secret: __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].clientSecret,
                page: page,
                per_page: per_page
              }
            }).catch(function (err) {
              return console.error(err);
            });

          case 3:
            res = _context.sent;


            if (res) {
              link = res.headers.link || '';
              prev = link.includes('rel="prev"');
              _next = link.includes('rel="next"');
              articles = res.data.map(function (item) {
                item.body = articleParser(item.body);
                return item;
              });
              // ctx.response.set('Accept', 'application/vnd.github.squirrel-girl-preview')

              ctx.status = res.status;
              ctx.body = {
                code: __WEBPACK_IMPORTED_MODULE_3__client_service__["a" /* CODE */].SUCCESS,
                data: {
                  list: articles,
                  pagination: { prev: prev, next: _next, page: Number(page), per_page: per_page }
                }
              };
            } else {
              ctx.status = 200;
              ctx.body = { code: __WEBPACK_IMPORTED_MODULE_3__client_service__["a" /* CODE */].FAILED };
            }

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

postController.item = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var number, res, detail;
    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            number = ctx.params.number;
            _context2.next = 3;
            return __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('https://api.github.com/repos/' + __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].owner + '/' + __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].repo + '/issues/' + number, {
              params: {
                client_id: __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].clientId,
                client_secret: __WEBPACK_IMPORTED_MODULE_2__posts_config__["a" /* default */].clientSecret
              }
            }).catch(function (err) {
              return console.error(err);
            });

          case 3:
            res = _context2.sent;

            if (res) {
              detail = res.data;

              detail.body = articleParser(detail.body);
              ctx.status = res.status;
              ctx.body = {
                code: __WEBPACK_IMPORTED_MODULE_3__client_service__["a" /* CODE */].SUCCESS,
                data: detail
              };
            } else {
              ctx.status = 200;
              ctx.body = { code: __WEBPACK_IMPORTED_MODULE_3__client_service__["a" /* CODE */].FAILED };
            }

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

function articleParser(content) {
  var data = {};
  var splits = content.split('\r\n');
  var thumb = splits[0];
  var cap = imageReg.exec(thumb);
  if (cap) {
    data.thumb = cap[2];
    data.content = content.split(thumb)[1];
  } else {
    data.content = content;
  }
  data._content = content;
  return data;
}

/* harmony default export */ exports["a"] = {
  postController: postController
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes__ = __webpack_require__(2);





var app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
var config = __webpack_require__(1);
config.dev = !(app.env === 'production');

// Instantiate nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

// Build in development
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
  builder.build().catch(function (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use(function (ctx, next) {
  if (ctx.url.includes('/api')) {
    return next();
  }
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset
  return new Promise(function (resolve, reject) {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, function (promise) {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

var router = new __WEBPACK_IMPORTED_MODULE_1_koa_router___default.a({
  prefix: '/api'
});
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__routes__["a" /* default */])(router);
app.use(router.routes(), router.allowedMethods());

app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }
/******/ ]);
//# sourceMappingURL=main.map
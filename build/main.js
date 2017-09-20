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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * @desc App Config
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */

// const isProd = process.env.NODE_ENV === 'production'
var baseService = {
  url: '/',
  method: 'get',
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  },
  timeout: 120000,
  responseType: 'json'
};

/* harmony default export */ exports["a"] = {
  common: {
    code: {
      FAILED: -1,
      SUCCESS: 0,
      UNAUTHORIZED: 401
    },
    github: {
      owner: 'jo0ger',
      repo: 'git-hook-test',
      clientId: 'b4983366c4c7549a09f1',
      clientSecret: '76fd8c26a21659d7eb925af0ed3498eabed49277'
    }
  },
  client: {
    title: '离人回首，灯火阑珊',
    subtitle: '欢迎访问我的个人网站',
    service: Object.assign({}, baseService, {
      baseURL: '/api',
      proxy: {
        host: '127.0.0.1',
        port: process.env.PORT || 3000
      }
    })
  },
  server: {
    allowedOrigins: ['jooger.me', 'www.jooger.me', 'blog.jooger.me'],
    service: Object.assign({}, baseService, {
      baseURL: 'https://api.github.com/'
    })
  }
};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_node_logger__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_simple_node_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_simple_node_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__marked__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_4__marked__["a"]; });
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return fetcher; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return logger; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return handleRequest; });
/* harmony export (immutable) */ exports["d"] = handleSuccess;
/* harmony export (immutable) */ exports["c"] = handleError;


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @desc Utils
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */







var timestampFormat = 'YYYY-MM-DD HH:mm:ss';

var fetcher = __WEBPACK_IMPORTED_MODULE_1_axios___default.a.create(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].server.service);

var logger =  false ? simpleNodeLogger.createRollingFileLogger({
  timestampFormat: timestampFormat,
  logDirectory: './logs',
  fileNamePattern: '<DATE>.log'
}) : __WEBPACK_IMPORTED_MODULE_2_simple_node_logger___default.a.createSimpleLogger({
  timestampFormat: timestampFormat
});

var handleRequest = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(_ref) {
    var ctx = _ref.ctx,
        type = _ref.type,
        next = _ref.next;
    var method, support;
    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            method = ctx.method;
            support = !!type[method];

            if (!support) {
              _context.next = 7;
              break;
            }

            _context.next = 5;
            return type[method](ctx, next);

          case 5:
            _context.next = 8;
            break;

          case 7:
            handleError({ ctx: ctx, message: ctx.path + '\u4E0D\u652F\u6301' + method + '\u8BF7\u6C42\u7C7B\u578B' });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function handleRequest(_x) {
    return _ref2.apply(this, arguments);
  };
}();

function handleSuccess(_ref3) {
  var ctx = _ref3.ctx,
      _ref3$message = _ref3.message,
      message = _ref3$message === undefined ? '请求成功' : _ref3$message,
      _ref3$data = _ref3.data,
      data = _ref3$data === undefined ? {} : _ref3$data;

  logger.info('\u63A5\u53E3\uFF1A' + ctx.path + '\uFF0C\u7ED3\u679C\uFF1A ' + message);
  ctx.success({
    message: message,
    data: data || {}
  });
}

function handleError(_ref4) {
  var ctx = _ref4.ctx,
      _ref4$message = _ref4.message,
      message = _ref4$message === undefined ? '请求失败' : _ref4$message,
      _ref4$err = _ref4.err,
      err = _ref4$err === undefined ? {} : _ref4$err;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  logger.error('\u63A5\u53E3\uFF1A' + ctx.path + '\uFF0C\u7ED3\u679C\uFF1A ' + message);
  Object.keys(err).length && console.error(err);
  !end && ctx.failed({
    message: message,
    error: err || {}
  });
}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ },
/* 3 */
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
  css: ['normalize.css', 'swiper/dist/css/swiper.css', 'gitalk/dist/gitalk.css', { src: '~assets/stylus/index.styl', lang: 'stylus' }],
  loading: '~/components/Common/PageLoading',
  build: {
    analyze: false,
    vendor: ['axios', 'swiper', 'bezier-easing', 'highlight.js', 'marked']
  },
  plugins: [{ src: '~plugins/option.js' }, { src: '~plugins/router.js' }, { src: '~plugins/filter.js' }, { src: '~plugins/swiper.js', ssr: false }, { src: '~plugins/image-load.js', ssr: false }, { src: '~plugins/image-popup.js', ssr: false }],
  router: {
    linkActiveClass: 'active'
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controllers__ = __webpack_require__(10);
/**
 * @desc server routes
 * @author Jooger <zzy1198258955@163.com>
 * @date 15 Sep 2017
 */




/* harmony default export */ exports["a"] = function (router) {
  router.use('*', function (ctx, next) {
    var request = ctx.request,
        response = ctx.response;

    var allowedOrigins = __WEBPACK_IMPORTED_MODULE_0__config__["a" /* default */].server.allowedOrigins;
    var origin = request.get('origin') || '';
    var allowed = origin.includes('localhost') || "development" === 'development' && request.query._DEV_ || allowedOrigins.find(function (item) {
      return origin.includes(item);
    });
    if (allowed) {
      response.set('Access-Control-Allow-Origin', origin);
    }
    ctx.response.set('Content-Type', 'application/json;charset=utf-8');
    response.set("Access-Control-Allow-Methods", "PUT,PATCH,POST,GET,DELETE,OPTIONS");

    if (request.method === 'OPTIONS') {
      ctx.status = 200;
      ctx.body = 'ok';
      return;
    }

    return next();
  });

  router.all('article-list', '/articles', __WEBPACK_IMPORTED_MODULE_1__controllers__["a" /* articleController */].list);
  router.all('article-detail', '/article/:number', __WEBPACK_IMPORTED_MODULE_1__controllers__["a" /* articleController */].item);
  router.all('article-like', '/article/:number/like', __WEBPACK_IMPORTED_MODULE_1__controllers__["a" /* articleController */].like);

  router.all('user-me', '/user/me', __WEBPACK_IMPORTED_MODULE_1__controllers__["b" /* userController */].me);
};

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 6 */
/***/ function(module, exports) {

module.exports = require("koa-respond");

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @desc Article controller
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */




var mdImageReg = /^!\[((?:\[[^\]]*\]|[^[\]]|\](?=[^[]*\]))*)\]\(\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*\)/;

var articleCtrl = { list: {}, item: {}, like: {} };

var _config$common$github = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].common.github,
    owner = _config$common$github.owner,
    repo = _config$common$github.repo,
    clientId = _config$common$github.clientId,
    clientSecret = _config$common$github.clientSecret;


articleCtrl.list.GET = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var _ctx$query, _ctx$query$page, page, _ctx$query$per_page, per_page, _ctx$query$search, search, _ctx$query$labels, labels, res, q, link, prev, _next, articles, params, _link, _prev, _next2, _articles;

    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$query = ctx.query, _ctx$query$page = _ctx$query.page, page = _ctx$query$page === undefined ? 1 : _ctx$query$page, _ctx$query$per_page = _ctx$query.per_page, per_page = _ctx$query$per_page === undefined ? 12 : _ctx$query$per_page, _ctx$query$search = _ctx$query.search, search = _ctx$query$search === undefined ? '' : _ctx$query$search, _ctx$query$labels = _ctx$query.labels, labels = _ctx$query$labels === undefined ? '' : _ctx$query$labels;
            res = null;

            if (!search) {
              _context.next = 10;
              break;
            }

            q = search + ' type:issue is:public state:open in:title,body author:' + owner + ' repo:' + owner + '/' + repo;
            _context.next = 6;
            return __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* fetcher */].get('/search/issues', {
              params: {
                q: q,
                sort: 'created',
                order: 'asc',
                client_id: clientId,
                client_secret: clientSecret,
                page: page,
                per_page: per_page
              }
            }).catch(function (err) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx, err: err });
            });

          case 6:
            res = _context.sent;


            if (res && res.data) {
              link = res.headers.link || '';
              prev = link.includes('rel="prev"');
              _next = link.includes('rel="next"');
              articles = res.data.items ? res.data.items.map(function (item) {
                item.body = articleParser(item.body);
                return item;
              }) : [];

              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* handleSuccess */])({
                ctx: ctx,
                data: {
                  list: articles,
                  pagination: { prev: prev, next: _next, page: Number(page), per_page: per_page },
                  total: res.data.total_count
                }
              });
            }
            _context.next = 16;
            break;

          case 10:
            params = {
              filter: 'created',
              state: 'open',
              sort: 'created',
              direction: 'desc',
              client_id: clientId,
              client_secret: clientSecret,
              page: page,
              per_page: per_page
            };

            if (labels) {
              params.labels = labels;
            }
            _context.next = 14;
            return __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* fetcher */].get('/repos/' + owner + '/' + repo + '/issues', { params: params }).catch(function (err) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx, err: err });
            });

          case 14:
            res = _context.sent;

            if (res && res.data) {
              _link = res.headers.link || '';
              _prev = _link.includes('rel="prev"');
              _next2 = _link.includes('rel="next"');
              _articles = res.data.map(function (item) {
                item.body = articleParser(item.body);
                return item;
              });
              // ctx.response.set('Accept', 'application/vnd.github.squirrel-girl-preview')

              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* handleSuccess */])({
                ctx: ctx,
                data: {
                  list: _articles,
                  pagination: { prev: _prev, next: _next2, page: Number(page), per_page: per_page }
                }
              });
            }

          case 16:

            if (!res) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx });
            }

          case 17:
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

articleCtrl.item.GET = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var number, res, detail;
    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            number = ctx.params.number;
            _context2.next = 3;
            return __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* fetcher */].get('/repos/' + owner + '/' + repo + '/issues/' + number, {
              headers: {
                Accept: 'application/vnd.github.squirrel-girl-preview'
              },
              params: {
                client_id: clientId,
                client_secret: clientSecret
              }
            }).catch(function (err) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx, err: err });
            });

          case 3:
            res = _context2.sent;

            if (res && res.data) {
              detail = res.data;

              detail.body = articleParser(detail.body);
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* handleSuccess */])({
                ctx: ctx,
                data: detail
              });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx });
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

articleCtrl.like.GET = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    var number, res;
    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            number = ctx.params.number;
            _context3.next = 3;
            return __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* fetcher */].get('/repos/' + owner + '/' + repo + '/issues/' + number + '/reactions', {
              headers: {
                Accept: 'application/vnd.github.squirrel-girl-preview'
              },
              params: {
                content: 'heart',
                per_page: 99999,
                client_id: clientId,
                client_secret: clientSecret
              }
            }).catch(function (err) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx, err: err });
            });

          case 3:
            res = _context3.sent;


            if (res && res.data) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* handleSuccess */])({
                ctx: ctx,
                data: {
                  list: res.data,
                  isLiked: !!res.data.find(function (item) {
                    return item.user.login === owner;
                  })
                }
              });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx });
            }

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

articleCtrl.like.POST = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee4(ctx, next) {
    var number, res;
    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            number = ctx.params.number;
            _context4.next = 3;
            return __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* fetcher */].post('/repos/' + owner + '/' + repo + '/issues/' + number + '/reactions', {
              content: 'heart',
              client_id: clientId,
              client_secret: clientSecret
            }, {
              headers: {
                Accept: 'application/vnd.github.squirrel-girl-preview'
              },
              params: {
                client_id: clientId,
                client_secret: clientSecret
              }
            }).catch(function (err) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx, err: err });
            });

          case 3:
            res = _context4.sent;


            if (res && res.data) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* handleSuccess */])({ ctx: ctx });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx });
            }

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

function articleParser(content) {
  var data = {};
  var splits = content.split('\r\n');
  var thumb = splits[0];
  var cap = mdImageReg.exec(thumb);
  if (cap) {
    data.thumb = cap[2];
  }
  data.content = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["f" /* marked */])(content);
  return data;
}

/* harmony default export */ exports["a"] = {
  list: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee5(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* handleRequest */])({ ctx: ctx, next: next, type: articleCtrl.list });

            case 2:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    function list(_x9, _x10) {
      return _ref5.apply(this, arguments);
    }

    return list;
  }(),
  item: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee6(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* handleRequest */])({ ctx: ctx, next: next, type: articleCtrl.item });

            case 2:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    function item(_x11, _x12) {
      return _ref6.apply(this, arguments);
    }

    return item;
  }(),
  like: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee7(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* handleRequest */])({ ctx: ctx, next: next, type: articleCtrl.like });

            case 2:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    }));

    function like(_x13, _x14) {
      return _ref7.apply(this, arguments);
    }

    return like;
  }()
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__article__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__article__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__user__["a"]; });
/**
 * @desc Controllers entry
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */




/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * @desc User controller
 * @author Jooger <zzy1198258955@163.com>
 * @date 19 Sep 2017
 */



var _config$common$github = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].common.github,
    owner = _config$common$github.owner,
    clientId = _config$common$github.clientId,
    clientSecret = _config$common$github.clientSecret;

var userCtrl = { me: {} };

userCtrl.me.GET = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var res;
    return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* fetcher */].get('/users/' + owner, {
              params: {
                client_id: clientId,
                client_secret: clientSecret
              }
            }).catch(function (err) {
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx, err: err });
            });

          case 2:
            res = _context.sent;


            if (res && res.data) {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* handleSuccess */])({
                ctx: ctx,
                data: res.data
              });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* handleError */])({ ctx: ctx });
            }

          case 4:
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

/* harmony default export */ exports["a"] = {
  me: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
      return __WEBPACK_IMPORTED_MODULE_0__Users_jooger_develop_git_jooger_me_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* handleRequest */])({ ctx: ctx, next: next, type: userCtrl.me });

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    function me(_x3, _x4) {
      return _ref2.apply(this, arguments);
    }

    return me;
  }()
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highlight_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_highlight_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_highlight_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_marked__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_marked___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_marked__);
/**
 *  渲染markdown
 */




var languages = ['xml', 'bash', 'css', 'markdown', 'http', 'java', 'javascript', 'json', 'makefile', 'nginx', 'python', 'scss', 'sql', 'stylus'];
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('xml', __webpack_require__(28));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('bash', __webpack_require__(15));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('css', __webpack_require__(16));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('markdown', __webpack_require__(22));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('http', __webpack_require__(17));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('java', __webpack_require__(18));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('javascript', __webpack_require__(19));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('json', __webpack_require__(20));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('makefile', __webpack_require__(21));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('nginx', __webpack_require__(23));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('python', __webpack_require__(24));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('scss', __webpack_require__(25));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('sql', __webpack_require__(26));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.registerLanguage('stylus', __webpack_require__(27));
__WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.configure({
  classPrefix: '' // don't append class prefix
});

var renderer = new __WEBPACK_IMPORTED_MODULE_1_marked___default.a.Renderer();

renderer.heading = function (text, level) {
  return '<h' + level + ' id="' + generateId() + '">' + text + '</h' + level + '>';
};

renderer.link = function (href, title, text) {
  var isOrigin = href.indexOf('jooger.me') > -1;
  var isImage = /(<img.*?)>/gi.test(text);
  return ('\n    <a href=' + href + '\n    target="_blank"\n    class="' + (isImage ? 'img-link' : 'link') + '"\n    ' + (isImage && 'onclick=""') + '\n    title="' + (title || '') + '"\n    ' + (isOrigin ? '' : 'rel="external nofollow"') + '>' + text + '</a>\n  ').replace(/\s+/g, ' ').replace('\n', '');
};

renderer.image = function (href, title, text) {
  return ('\n    <img class="image-view"\n      src="' + href + '"\n      title="' + (title || text || 'jooger.me') + '"\n      alt="' + (text || title || href) + '"\n    ' + (this.options.xhtml ? '/' : '') + '>\n  ').replace(/\s+/g, ' ').replace('\n', '');
};

renderer.code = function (code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  var codeLine = '<ul class="code-line">' + code.split('\n').map(function (line, index) {
    return ('<li class="line">' + (index + 1) + '</li>').replace(/\s+/g, ' ');
  }).join('') + '</ul>';

  if (!lang) {
    return '<pre>' + codeLine + '<code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
  }

  return '<pre>' + codeLine + '<code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
};

__WEBPACK_IMPORTED_MODULE_1_marked___default.a.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true,
  highlight: function highlight(code, lang) {
    if (!~languages.indexOf(lang)) {
      return __WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.highlightAuto(code).value;
    }
    return __WEBPACK_IMPORTED_MODULE_0_highlight_js___default.a.highlight(lang, code).value;
  }
});

// 生成文章中的title id
function generateId(len) {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
  len = len | 8;
  var id = '';
  for (var i = 0; i < len; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function escape(html, encode) {
  return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_1_marked___default.a;

/***/ },
/* 13 */
/***/ function(module, exports) {

module.exports = require("axios");

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("highlight.js");

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/bash");

/***/ },
/* 16 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/css");

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/http");

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/java");

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/javascript");

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/json");

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/makefile");

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/markdown");

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/nginx");

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/python");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/scss");

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/sql");

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/stylus");

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("highlight.js/lib/languages/xml");

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = require("marked");

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = require("simple-node-logger");

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_respond__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_respond___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_respond__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nuxt__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuxt_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nuxt_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__nuxt_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils__ = __webpack_require__(1);









global.logger = __WEBPACK_IMPORTED_MODULE_7__utils__["a" /* logger */];

var app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

// Set Nuxt.js options
__WEBPACK_IMPORTED_MODULE_6__nuxt_config___default.a.dev = !(app.env === 'production');

// Instantiate nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_3_nuxt__["Nuxt"](__WEBPACK_IMPORTED_MODULE_6__nuxt_config___default.a);

// Build in development
if (__WEBPACK_IMPORTED_MODULE_6__nuxt_config___default.a.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_3_nuxt__["Builder"](nuxt);
  builder.build().catch(function (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use(__WEBPACK_IMPORTED_MODULE_2_koa_respond___default()({
  methods: {
    success: function success(ctx, body) {
      body = Object.assign({}, {
        code: __WEBPACK_IMPORTED_MODULE_5__config__["a" /* default */].common.code.SUCCESS
      }, body);
      ctx.send(200, body);
    },
    failed: function failed(ctx, body) {
      body = Object.assign({}, {
        code: __WEBPACK_IMPORTED_MODULE_5__config__["a" /* default */].common.code.FAILED
      }, body);
      ctx.send(200, body);
    }
  }
}));
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
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__routes__["a" /* default */])(router);
app.use(router.routes(), router.allowedMethods());

app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }
/******/ ]);
//# sourceMappingURL=main.map
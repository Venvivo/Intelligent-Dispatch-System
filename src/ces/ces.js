let Ces = {
  name: 'Ces',
  description: 'Ces Js framework',
  author: 'Jerry Ou',
  email: 'oyp@cesgroup.com.cn'
};

Ces.register = function (plugin) {
  let defaultCallback = function (rets) {
    console.log(rets)
  };
  let name = plugin['name'];
  let options = plugin['options'];

  if ((!name || typeof name !== 'string')) {
    throw new Error('the register plugin must provide name property of string')
  }
  if (!options) {
    throw new Error('the register plugin must provide options property')
  }
  Ces.Plugins[name] = {};
  if (!Array.isArray(options)) {
    options = [options];
  }

  options.forEach(function (item) {
    let method = item.method;
    if (!method) {
      throw new Error('the register plugin must provide method property in every option');
    }
    Ces.Plugins[name][method] = (function (item) {

      return function () {
        let data = item.data;
        let callback = item.callback || defaultCallback;
        if (data && typeof data === 'function') {
          data = data();
        }
        let param;
        if (data) {
          param = [method, data];
        } else {
          param = [method];
        }
        Ces.JSBridge.callHandler(name, param, callback)
      };

    })(item);
  });
};

Ces.ready = function (callback) {
  if (Ces.Config.debug) {
    window.onload = function () {
      Ces.Page.init(callback);
    };
    /*document.addEventListener("DOMContentLoaded", function () {
        callback && callback();
    }, false);*/
  } else {
    if (Ces.__bridge__) {
      callback();
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function () {
        WebViewJavascriptBridge.init(function () {
          console.log('init messageHandler');
        });
        Ces.__bridge__ = WebViewJavascriptBridge;
        Ces.Page.init(callback);
      }, false);
    }
  }
};

if (!Object.assign) {
  // 定义assign方法
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target) { // assign方法的第一个参数
      'use strict';
      // 第一个参数为空，则抛错
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      let to = Object(target);
      // 遍历剩余所有参数
      for (let i = 1; i < arguments.length; i++) {
        let nextSource = arguments[i];
        // 参数为空，则跳过，继续下一个
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        // 获取改参数的所有key值，并遍历
        let keysArray = Object.keys(nextSource);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          let nextKey = keysArray[nextIndex];
          let desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          // 如果不为空且可枚举，则直接浅拷贝赋值
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}


/* ----------- core ----------- */
import Config from './core/ces.config.js';
import JSBridge from './core/ces.jsbridge.js';
import WebCache from './core/ces.webcache.js';
import Page from './core/ces.page.js';

Ces.Config = Config;
Ces.JSBridge = JSBridge;
Ces.WebCache = WebCache;
Ces.Page = Page;

/* ----------- plugins ----------- */
import Plugins from './plugins/ces.plugins.js'

Ces.Plugins = Plugins;

/* ----------- utils ----------- */
import DateTime from './utils/ces.datetime.js';
import Utils from './utils/ces.utils.js';

Ces.DateTime = DateTime;
Ces.Utils = Utils;

export default Ces;

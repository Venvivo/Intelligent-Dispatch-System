import Config from './ces.config.js'
import WebCache from './ces.webcache.js'
import JSBridge from './ces.jsbridge.js'


let Utils = (function () {

  return {
    /**
     * 获取当前页面的  referrer
     *
     * @returns {string} referrer
     */
    getReferrer: function () {
      let referrer = '';

      try {
        referrer = window.top.document.referrer;
      } catch (e) {
        if (window.parent) {
          try {
            referrer = window.parent.document.referrer;
          } catch (e2) {
            referrer = '';
          }
        }
      }
      if (referrer === '') {
        referrer = document.referrer;
      }
      return referrer;
    }
  }
})();

let Keys = {
  _s_load_key_: '_ces_page_load_key_',
  _s_back_key_: '_ces_page_back_key_'
};


let WebContext = (function () {
  let _onResumeListener = function (callback) {
    let data = WebCache.local.get(Keys._s_back_key_);
    WebCache.local.delete(Keys._s_back_key_);
    if (data && callback) {
      callback(data);
    }
  };

  let _push = function (url, data) {
    if (data) {
      //将数据保存到 localStorage 中
      let key = Keys._s_load_key_;

      WebCache.local.set(key, data);
    }
    window.location.assign(url);
  };

  let _pop = function (data) {
    if (data) {
      let key = Keys._s_back_key_;
      WebCache.local.set(key, data);
    }

    let url = Utils.getReferrer();
    if (url) {
      window.location.assign(url);
    } else {
      window.history.back();
    }
  };

  let _loadData = function (callback) {
    let data = WebCache.local.get(Keys._s_load_key_);
    callback && callback(data);
  };

  return {
    onResumeListener: _onResumeListener,
    push: _push,
    pop: _pop,
    loadData: _loadData
  }
})();

let NativeContext = (function () {
  let nativeMethod = {
    init: 'init',
    push: 'pushWindow',
    pop: 'popWindow',
    resume: "resume"
  };

  let _onResumeListener = function (callback) {
    JSBridge.registerHandler(nativeMethod.resume, callback);
  };

  let _push = function (href, data) {
    if (data) {
      //将数据保存到 localStorage 中
      let key = Keys._s_load_key_;

      WebCache.local.set(key, data);
    }
    JSBridge.callHandler(nativeMethod.push, {
      url: href
    }, function () {
    });
  };

  let _pop = function (data) {
    JSBridge.callHandler(nativeMethod.pop, {params: data}, function () {
    });
  };

  let _loadData = function (callback) {
    JSBridge.callHandler(nativeMethod.init, {}, function (data) {
      callback && callback(data);
    });
  };

  return {
    onResumeListener: _onResumeListener,
    push: _push,
    pop: _pop,
    loadData: _loadData
  }
})();


let Page = (function () {
  let _debug = Config.debug;

  let _onResumeListener = function (callback) {
    if (_debug) {
      WebContext.onResumeListener(callback);
    } else {
      NativeContext.onResumeListener(callback);
    }
  };

  let _open = function (href, data) {
    href = Config.basepath + href;

    if (_debug) {
      WebContext.push(href, data);
    } else {
      NativeContext.push(href, data);
    }
  };

  let _back = function (data) {
    if (_debug) {
      WebContext.pop(data);
    } else {
      NativeContext.pop(data);
    }
  };

  let _init = function (callback) {
    if (_debug) {
      WebContext.loadData(callback);
    } else {
      NativeContext.loadData(callback);
    }
  };

  let _load = function (url) {
    window.location.assign(url);
  };

  return {
    onResumeListener: _onResumeListener,
    open: _open,
    load: _load,
    back: _back,
    init: _init
  }
})();

export default Page;

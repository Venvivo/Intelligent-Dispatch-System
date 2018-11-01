import JSBridge from '../core/ces.jsbridge.js';
import Utils from '../utils/ces.utils.js';

function Cache(name) {
    this.plugin = 'CesCachePlugin';
    this.name = name;
    this.method = null;
    this.options = null;
}

Cache.getCache = function(name) {
    return new Cache(name);
};

Cache.prototype = {

    delete: function () {
        let len = arguments.length;
        if (len > 0) {
            throw new Error('delete cache can not set params')
        }
        this.method = 'deleteCache';
    },

    put: function (key, data, meta, param) {
        meta = meta || {};

        param = Utils.extend({exp: -1}, param || {});
        switch (typeof meta) {
            case "object" :
                if(!Utils.isPlainObject(meta)) {
                    throw new Error('the meta not a plain object')
                }
                break;
            case "function" :
                meta = meta();
                break;
        }

        this.method = 'save';
        this.options = {
            key: key,
            data: data,
            meta: meta,
            param: param
        };
        return this;
    },
    get: function (key) {
        this.method = 'query';
        this.options = {
            key: key
        };
        return this;
    },
    set: function (key, data, meta, param) {
        meta = meta || {};

        param = Utils.extend({exp: -1}, param || {});
        switch (typeof meta) {
            case "object" :
                if(!Utils.isPlainObject(meta)) {
                    throw new Error('the meta not a plain object')
                }
                break;
            case "function" :
                meta = meta();
                break;
        }

        this.method = 'saveOrUpdate';
        this.options = {
            key: key,
            data: data,
            meta: meta,
            param: param
        };
        return this;
    },
    remove: function (key) {
        this.method = 'deleteData';
        this.options = {
            key: key
        };
        return this;
    },

    list: function (condition) {
        this.method = 'queryList';
        this.options = {
            condition: condition
        };
        return this;
    },
    call: function (callback) {
        if (this.method) {
            switch (this.method) {
                case 'save':
                    Api.save(this, callback);
                    break;
                case 'saveOrUpdate':
                    Api.saveOrUpdate(this, callback);
                    break;
                case 'query':
                    Api.query(this, callback);
                    break;
                case 'queryList':
                    Api.queryList(this, callback);
                    break;
                case 'deleteData':
                    Api.deleteData(this, callback);
                    break;
                case 'deleteCache':
                    Api.deleteCache(this, callback);
                    break;

            }
        }

    }
};

let Api = {
    save: function(cache, callback) {
        let _options = cache.options;
        JSBridge.callHandler(
            cache.plugin,
            [
                cache.method,
                cache.name,
                _options.key,
                _options.data,
                _options.meta,
                _options.param
            ], callback);
    },
    saveOrUpdate: function(cache, callback) {
        let _options = cache.options;
        JSBridge.callHandler(
            cache.plugin,
            [
                cache.method,
                cache.name,
                _options.key,
                _options.data,
                _options.meta,
                _options.param
            ], callback);
    },
    query: function(cache, callback) {
        let _options = cache.options;
        JSBridge.callHandler(
            cache.plugin,
            [
                cache.method,
                cache.name,
                _options.key
            ], callback);
    },
    queryList: function(cache, callback) {
        let _options = cache.options;
        JSBridge.callHandler(
            cache.plugin,
            [
                cache.method,
                cache.name,
                _options.condition || {}
            ], callback);
    },
    deleteData: function(cache, callback) {
        let _options = cache.options;
        JSBridge.callHandler(
            cache.plugin,
            [
                cache.method,
                cache.name,
                _options.key
            ], callback);
    },
    deleteCache: function(cache, callback) {
        JSBridge.callHandler(
            cache.plugin,
            [
                cache.method,
                cache.name
            ], callback);
    }
};



export default Cache;

let _maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');
let _defaultExpire = _maxExpireDate;

// https://github.com/jeromegn/Backbone.localStorage/blob/master/backbone.localStorage.js#L63
let defaultSerializer = {
    serialize: function (item) {
        return JSON.stringify(item);
    },
    // fix for "illegal access" error on Android when JSON.parse is
    // passed null
    deserialize: function (data) {
        return data && JSON.parse(data);
    }
};

function _extend(obj, props) {
    for (let key in props) obj[key] = props[key];
    return obj;
}

/**
 * https://github.com/gsklee/ngStorage/blob/master/ngStorage.js#L52
 *
 * When Safari (OS X or iOS) is in private browsing mode, it appears as
 * though localStorage is available, but trying to call .setItem throws an
 * exception below: "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was
 * made to add something to storage that exceeded the quota."
 */
function _isStorageSupported(storage) {
    let supported = false;
    if (storage && storage.setItem) {
        supported = true;
        let key = '__' + Math.round(Math.random() * 1e7);
        try {
            storage.setItem(key, key);
            storage.removeItem(key);
        } catch (err) {
            supported = false;
        }
    }
    return supported;
}

// get storage instance
function _getStorageInstance(storage) {
    let type = typeof storage;
    if (type === 'string' && window[storage] instanceof Storage) {
        return window[storage];
    }
    return storage;
}

function _isValidDate(date) {
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
}

function _getExpiresDate(expires, now) {
    now = now || new Date();

    if (/^\d+$/.test(expires)) {
        expires = parseInt(expires);
    }

    if (typeof expires === 'number') {
        expires = expires === Infinity ? _maxExpireDate : new Date(now.getTime() + expires * 1000);
    } else if (typeof expires === 'string') {
        expires = new Date(expires);
    }

    if (expires && !_isValidDate(expires)) {
        throw new Error('`expires` parameter cannot be converted to a valid Date instance');
    }

    return expires;
}

// http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
function _isQuotaExceeded(e) {
    let quotaExceeded = false;
    if (e) {
        if (e.code) {
            switch (e.code) {
                case 22:
                    quotaExceeded = true;
                    break;
                case 1014:
                    // Firefox
                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e.number === -2147024882) {
            // Internet Explorer 8
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
}

// cache item constructor
function CacheItem(value, exp) {
    // createTime
    this.c = (new Date()).getTime();
    exp = exp || _defaultExpire;
    let expires = _getExpiresDate(exp);
    // expiresTime
    this.e = expires.getTime();
    this.v = value;
}

function _isCacheItem(item) {
    if (typeof item !== 'object') {
        return false;
    }
    if (item) {
        if ('c' in item && 'e' in item && 'v' in item) {
            return true;
        }
    }
    return false;
}

// check cacheItem If effective
function _checkCacheItemIfEffective(cacheItem) {
    let timeNow = (new Date()).getTime();
    return timeNow < cacheItem.e;
}

function _checkAndWrapKeyAsString(key) {
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }
    return key;
}

// cache api
let CacheAPI = {

    set: function (key, value, options) {
    },

    get: function (key) {
    },

    delete: function (key) {
    },
    // Try the best to clean All expires CacheItem.
    deleteAllExpires: function () {
    },
    // Clear all keys
    clear: function () {
    },
    // Add key-value item to memcached, success only when the key is not exists in memcached.
    add: function (key, value, options) {
    },
    // Replace the key's data item in cache, success only when the key's data item is exists in cache.
    replace: function (key, value, options) {
    },
    // Set a new options for an existing key.
    touch: function (key, exp) {
    }
};

// cache api
let CacheAPIImpl = {

    set: function (key, val, options) {

        key = _checkAndWrapKeyAsString(key);

        options = _extend({force: true}, options);

        if (val === undefined) {
            return this.delete(key);
        }

        let value = defaultSerializer.serialize(val);

        let cacheItem = new CacheItem(value, options.exp);
        try {
            this.storage.setItem(key, defaultSerializer.serialize(cacheItem));
        } catch (e) {
            if (_isQuotaExceeded(e)) { //data wasn't successfully saved due to quota exceed so throw an error
                this.quotaExceedHandler(key, value, options, e);
            } else {
                console.error(e);
            }
        }

        return val;
    },
    get: function (key) {
        key = _checkAndWrapKeyAsString(key);
        let cacheItem = null;
        try {
            let item = this.storage.getItem(key);
            cacheItem = defaultSerializer.deserialize(item);
        } catch (e) {
            return null;
        }
        if (_isCacheItem(cacheItem)) {
            if (_checkCacheItemIfEffective(cacheItem)) {
                let value = cacheItem.v;
                return defaultSerializer.deserialize(value);
            } else {
                this.delete(key);
            }
        }
        return null;
    },

    delete: function (key) {
        key = _checkAndWrapKeyAsString(key);
        this.storage.removeItem(key);
        return key;
    },

    deleteAllExpires: function () {
        let length = this.storage.length;
        let deleteKeys = [];
        let _this = this;
        for (let i = 0; i < length; i++) {
            let key = this.storage.key(i);
            let cacheItem = null;
            try {
                cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
            } catch (e) {
            }

            if (cacheItem !== null && cacheItem.e !== undefined) {
                let timeNow = (new Date()).getTime();
                if (timeNow >= cacheItem.e) {
                    deleteKeys.push(key);
                }
            }
        }
        deleteKeys.forEach(function (key) {
            _this.delete(key);
        });
        return deleteKeys;
    },

    clear: function () {
        this.storage.clear();
    },

    add: function (key, value, options) {
        key = _checkAndWrapKeyAsString(key);
        options = _extend({force: true}, options);
        try {
            let cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
            if (!_isCacheItem(cacheItem) || !_checkCacheItemIfEffective(cacheItem)) {
                this.set(key, value, options);
                return true;
            }
        } catch (e) {
            this.set(key, value, options);
            return true;
        }
        return false;
    },

    replace: function (key, value, options) {
        key = _checkAndWrapKeyAsString(key);
        let cacheItem = null;
        try {
            cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
        } catch (e) {
            return false;
        }
        if (_isCacheItem(cacheItem)) {
            if (_checkCacheItemIfEffective(cacheItem)) {
                this.set(key, value, options);
                return true;
            } else {
                this.delete(key);
            }
        }
        return false;
    },

    touch: function (key, exp) {
        key = _checkAndWrapKeyAsString(key);
        let cacheItem = null;
        try {
            cacheItem = defaultSerializer.deserialize(this.storage.getItem(key));
        } catch (e) {
            return false;
        }
        if (_isCacheItem(cacheItem)) {
            if (_checkCacheItemIfEffective(cacheItem)) {
                this.set(key, this.get(key), {exp: exp});
                return true;
            } else {
                this.delete(key);
            }
        }
        return false;
    }
};

let _storageNameMapping = {
    's' : 'sessionStorage',
    'session' : 'sessionStorage',
    'sessionStorage' : 'sessionStorage',
    'l' : 'localStorage',
    'local' : 'localStorage',
    'localStorage' : 'localStorage'
};

/**
 * Cache Constructor
 */
function WebCache(options) {

    // default options
    let defaults = {
        storage: 'localStorage',
        exp: Infinity  //An expiration time, in seconds. default never .
    };

    let opt = _extend(defaults, options);

    let expires = opt.exp;

    if (expires && typeof expires !== 'number' && !_isValidDate(expires)) {
        throw new Error('Constructor `exp` parameter cannot be converted to a valid Date instance');
    } else {
        _defaultExpire = expires;
    }



    let storage = _getStorageInstance(_storageNameMapping[opt.storage]);

    let isSupported = _isStorageSupported(storage);

    this.isSupported = function () {
        return isSupported;
    };

    if (isSupported) {

        this.storage = storage;

        this.quotaExceedHandler = function (key, val, options, e) {
            console.warn('Quota exceeded!');
            if (options && options.force === true) {
                let deleteKeys = this.deleteAllExpires();
                console.warn('delete all expires CacheItem : [' + deleteKeys + '] and try execute `set` method again!');
                try {
                    options.force = false;
                    this.set(key, val, options);
                } catch (err) {
                    console.warn(err);
                }
            }
        };

    } else {  // if not support, rewrite all functions without doing anything
        _extend(this, CacheAPI);
    }

}

WebCache.prototype = CacheAPIImpl;

export default {
    create : function (options) {
        return new WebCache(options);
    },
    local: new WebCache({
        storage: 'localStorage',
        exp: Infinity
    }),
    session: new WebCache({
        storage: 'sessionStorage',
        exp: Infinity
    })
};

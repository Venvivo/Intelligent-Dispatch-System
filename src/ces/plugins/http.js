import JSBridge from '../core/ces.jsbridge.js';

let Http = function (method, url) {
    this.parts = [];
    this.body = '';
    this.method = method;
    this.url = url;
    this.encrypt = false;
    this.enctype = 'application/x-www-form-urlencoded';
};

Http.NormalPart = function (name, value) {
    this.type = 'normal';
    this.name = name;
    this.value = value;
};

Http.FilePart = function (name, value, pattern) {
    this.type = 'file';
    this.name = name;
    this.value = value;
    this.pattern = (pattern || 'path');
};

Http.get = function (url) {
    return new Http('GET', url);
};

Http.post = function (url) {
    return new Http('POST', url);
};


Http.prototype = {
    enctype: function (enctype) {
        this.enctype = enctype;
        return this;
    },
    setBody: function (body) {
        if (this.parts.length > 0) {
            throw new Error('has add part,body can not set');
        }

        this.enctype = 'application/json';
        this.body = body;
        return this;
    },
    addPart: function (part) {
        if (this.body != '') {
            throw new Error('has body, part can not set');
        }

        if (part.type == 'normal' || part.type == 'file') {
            this.parts.push(part);
            if (part.type == 'file') {
                this.enctype = 'multipart/form-data';
            }
        } else {
            throw new Error('the part type not support');
        }
        return this;
    },
    send: function (callback) {
        let data;
        if (this.enctype === 'multipart/form-data') {
            let paths = [];
            let params = [];
            this.parts.forEach(function (item) {
                if (item.type === 'normal') {
                    params.push(item);
                } else if (item.type == 'file') {
                    paths.push(item);
                }
            });
            data = [{"url": this.url}, {"paths": paths}, {"params": params}];
            console.log(data);
            JSBridge.callHandler('CesFileUpload', data, function (rets) {
                callback && callback(rets);
            });
        } else if (this.enctype === 'application/x-www-form-urlencoded' || this.enctype == 'application/json') {
            data = [this.method, this.url, this.body, this.parts, this.enctype, this.encrypt];
            console.log(data);
            JSBridge.callHandler('CesHttpRequest', data, function (rets) {
                callback && callback(rets);
                console.log(JSON.parse(JSON.stringify(rets)));

            });
        } else {
            throw new Error('enctype not support');
        }

    }
};

export default Http;

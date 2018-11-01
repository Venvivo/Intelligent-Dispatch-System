import JSBridge from '../core/ces.jsbridge.js';
import Utils from '../utils/ces.utils.js'

let Camera = (function () {
    let defOpts = {
        width: 200,
        height: 200
    };
    let _type = {
        base64: 'base64',
        path: 'path'
    };

    let _take = function (callback, params, opts) {
        opts = opts || {};
        params = Utils.extend(defOpts, opts);
        params = [params, {type: opts.type || _type.path, name: opts.name || ''}];

        JSBridge.callHandler('CesPluginsCamera', params, callback);
    };

    return {
        name: "Ces.Plugins.Camera",
        type: _type,
        take: _take
    }
})();

export default Camera;

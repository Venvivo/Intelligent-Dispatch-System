import JSBridge from '../core/ces.jsbridge.js';

let Scan = (function () {

    return {
        call: function (callback) {
            JSBridge.callHandler('CesErWeiPlugin', ['1'], function (rets) {
                callback && callback(rets);
            });
        }
    }
})();

export default Scan;

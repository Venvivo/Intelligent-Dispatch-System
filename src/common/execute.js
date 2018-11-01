import api from '../api/api'

function execute(key, params) {
    let obj = localStorage.getItem("apiObj");
    if (!obj) {
        throw new Error('no api object from localStorage');
    }

    try {
        obj = JSON.parse(obj);
    } catch(e) {
        throw new Error(e);
    }

    obj = obj[key];
    if (!obj) {
        throw new Error('no api object for key: ' + key);
    }
    let api_value = obj['api_value'];
    let api_method = obj['api_method']
    if (!api_value) {
        throw new Error('no api value for key: ' + key);
    }
    return api(api_method , api_value, params);
}
export {
    execute
}

import api from '../api/api'

import * as home from './data/home'
/**
 * 创建临时数据
 */

const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

// if (process.env.NODE_ENV != 'production') {
  var getAreaList = (keyword) => api('GET', '/equ/api_rule', {
    keyword
  });
  var bind = (obj) => api('POST', '/equ/equipment/bind', obj);
  var save = (obj) => api('POST', '/equ/equipment/save', obj);
  var getCategory = (obj) => api('GET', '/biz/online_consult/category', obj);
  var counselingList = (obj) => api('GET', '/biz/online_consult/page', obj);
  var savaConsult = (obj) => api('POST', '/biz/online_consult/save', obj, 'multipart/form-data');
  var settingData = (obj) => api('GET', '/equ/equipment/init', obj);
  var online_consult_detail = (obj) => api('GET', '/biz/online_consult/detail', obj);
  var mood_collection = (obj) => api('POST', '/biz/mood_collection/save', obj);
  var mood_list = (obj) => api('GET', '/biz/mood_collection/list', obj);
  var mood_group = (obj) => api('GET', '/biz/mood_collection/group', obj);
  var server_apply = (obj) => api('POST', '/biz/service_apply/apply', obj);
  var server_detail = (obj) => api('POST', '/biz/service_apply/detail', obj);
  var server_evaluate = (obj) => api('POST', '/biz/service_apply/evaluate', obj);
  var server_list = (obj) => api('POST', '/biz/service_apply/list', obj);
  var pie_chart = (obj) => api('POST', '/biz/ani_ape/list', obj);
  var bar_chart = (obj) => api('POST', '/biz/ani_apt/list', obj);
  var call_name_record = (obj) => api('POST', '/biz/call_name_record/record', obj);

// } else {
//   var getAreaList = () => setpromise(home.getAreaList);
// }

export {
  getAreaList,
  bind,
  save,
  getCategory,
  savaConsult,
  counselingList,
  settingData,
  online_consult_detail,
  mood_collection,
  mood_list,
  mood_group,
  server_apply,
  server_detail,
  server_evaluate,
  server_list,
  pie_chart,
  bar_chart,
  call_name_record
}

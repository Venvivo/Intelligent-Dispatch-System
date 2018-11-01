import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import util  from './common/util'
import {call_name_record , settingData} from './service/index';

import '@/assets/iconfont.css'
import '@/assets/base.css'
import '@/assets/flexible.js'
import router from './router'
// import Mock from './mock'

import Ces from './ces/ces.js'
Vue.prototype.$ces = Ces;


// Mock.init()
Vue.config.productionTip = false;

Vue.use(MintUI);
Vue.use(ElementUI);


/* eslint-disable no-new */
Ces.ready(function () {
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    render: h => h(App)
  });
  ///todo 注册视频点名的方法 给原生调用
  if(Ces.Config.plugin){
    Ces.JSBridge.registerHandler('messagepush',function (rets) {
      let data = JSON.parse(rets.data);
      console.log(data)
      if(data.category === "call_name"){
        let startTime = util.formatDate.format(new Date(data.message.executeTime), "yyyy-MM-dd hh:mm:ss");
        let nextTime = util.formatDate.format(new Date(data.message.nextTime), "yyyy-MM-dd hh:mm:ss");
        if(data.message.executeTime < Date.parse(new Date())){
          return false
        }
        Ces.JSBridge.callHandler('dianming',[startTime,nextTime,600],function (rets1) {
          let ids = rets1.data;
          // let ids = [1,2,3];
          if(ids.length > 0){
            call_name_record({
              ids:ids.join(','),
              jobId:data.message.id,
              jyid:JSON.parse(localStorage.getItem('settingInfo')).jyid,
              terminal:localStorage.getItem('uuid'),
              type:0
            }).then((res2) => {
              console.log(res2)
              if(res2.status === 'OK'){
                console.log(res2)
              }
            })
          }
        });
      }
    });
    let settingInfo = localStorage.getItem('settingInfo');
    let apiObj = localStorage.getItem('apiObj');
    if (!settingInfo || !apiObj) {
      Ces.JSBridge.callHandler('deviceuuid', [], function (rets) {
        let loaclUuid = rets.data;
        settingData({
          uuid: loaclUuid
        }).then((rets) => {
          if (rets.status === 'OK') {
            localStorage.setItem('settingInfo', JSON.stringify(rets.data.bind_info));
            localStorage.setItem('apiObj', JSON.stringify(rets.data.confs));
          }
        });
      });
    }

  }
});
if (module.hot) {
  module.hot.accept();
}
console.log(Ces)




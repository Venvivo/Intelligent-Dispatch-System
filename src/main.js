import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


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
});
if (module.hot) {
  module.hot.accept();
}




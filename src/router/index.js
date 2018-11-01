import Vue from 'vue'
import Router from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Index = resolve => require(['@/components/Index'], resolve);


Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      title: '首页'
    }

  ]
});


export default router

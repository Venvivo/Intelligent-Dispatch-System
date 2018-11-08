import Vue from 'vue'
import Router from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Index = resolve => require(['@/components/Index'], resolve);
const TaskManager = resolve => require(['@/components/TaskManager'], resolve);
const TaskDetail = resolve => require(['@/components/TaskDetail'], resolve);
const HandlingTask = resolve => require(['@/components/HandlingTask'], resolve);


Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      title: '首页'
    },{
      path: '/TaskManager',
      component: TaskManager,
      title: '任务管理'
    },{
      path: '/TaskDetail',
      component: TaskDetail,
      title: '任务详情'
    },{
      path: '/HandlingTask',
      component: HandlingTask,
      title: '任务处理'
    }

  ]
});


export default router

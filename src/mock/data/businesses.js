/**
 * Created by zhangwei on 2017/6/1 0001.
 */

import Mock from 'mockjs'

const Businesses = [];
for (let i = 0; i < 100; i++) {
  Businesses.push(Mock.mock({
    id: Mock.Random.guid(),
    account: Mock.Random.integer(10000000000, 99999999999),
    name: Mock.Random.ctitle(4, 6),
    'status|1':['休息中','营业中'],
    'record|1':['已备案(企业)','已备案(个人)'],
    'business|1':['蔬菜','水果','海鲜','河鲜'],
    registerTime: Mock.Random.date(),
    'num|1':['蔬菜区1-1','蔬菜区1-2','蔬菜区1-3','蔬菜区1-4','水果区1-1','水果区1-2','水果区1-3','水果区1-4','海鲜区1-1','海鲜区1-2','海鲜区1-3','海鲜区1-4'],
    goods: Mock.Random.integer(1, 100),
    procurement:Mock.Random.integer(1,20000),
    money: Mock.Random.float( 1, 99999 ,2,2),
  }))
}

export {Businesses}

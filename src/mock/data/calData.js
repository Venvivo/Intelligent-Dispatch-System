/**
 * Created by zhangwei on 2017/6/21 0001.
 */

import Mock from 'mockjs'

let calData = [];
for (let i = 0; i < 30; i++) {

  calData.push(Mock.mock({
    index: i + 1,
    num: Mock.Random.integer(0, 50000),
  }))
}


export {calData}

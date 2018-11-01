/**
 * Created by Xuyan on 2017/5/27.
 */

import Mock from 'mockjs'

const Transfer = []
for (let i = 0; i < 100; i++) {
  Transfer.push(Mock.mock({
    id: Mock.Random.guid(),
    identifier: Mock.Random.integer(100000000000, 19999999999),
    name: Mock.Random.cword(4,10),
    model: Mock.Random.cword(2),
    orderTime: Mock.Random.date(),
    finishTime: Mock.Random.date(),
    amount:Mock.Random.float( 1, 99999 ,2,2),
    orderStatus: Mock.Random.cword(2),
    paymentStatus: Mock.Random.cword(2),
  }))
}

export {Transfer}

/**
 * Created by lei on 2017/5/25.
 */

import Mock from 'mockjs'

const Company = []
for (let i = 0; i < 100; i++) {
  Company.push(Mock.mock({
    id: Mock.Random.guid(),
    account: Mock.Random.integer(10002, 99999),
    name: Mock.Random.cname(),
    area: Mock.Random.city(true),
    records: Mock.Random.cword( 4, 10 ),
    registerTime: Mock.Random.date(),
    procurement:Mock.Random.integer(1,20000),
    money: Mock.Random.float( 1, 99999 ,2,2),
  }))
}

export {Company}

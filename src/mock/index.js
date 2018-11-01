import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers} from './data/user'
import {Company} from './data/company'
import {Transfer} from './data/transfer'
import {Businesses} from './data/businesses'
import {calData} from './data/calData'

let _Company = Company;
let _Transfer = Transfer;
let _Businesses = Businesses;
let _CalData =  calData;

export default {

  init () {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    // 登录
    mock.onPost('/login').reply(arg => {
      let {username, password} = JSON.parse(arg.data)
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              delete user.password;
              return true
            }
          });

          if (hasUser) {
            resolve([200, {code: 200, msg: '请求成功', user}])
          } else {
            resolve([200, {code: 500, msg: '账号或密码错误'}])
          }
        }, 1000)
      })
    });

    // 商户列表（分页）--zhangwei
    mock.onGet('/businessManger/businesses').reply(config => {
      let {page, name} = config.params
      let mockList = _Businesses.filter(Businesses => {
        if (name && Businesses.name.indexOf(name) === -1) return false
        return true
      })
      let total = mockList.length;
      mockList = mockList.filter((u, index) => index < 5 * page && index >= 5 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            list: mockList
          }])
        }, 500)
      })
    });

    // 商户列表（分页）
    mock.onGet('/customerManage/company').reply(config => {
      let {page, name} = config.params
      let mockList = _Company.filter(company => {
        if (name && company.name.indexOf(name) === -1) return false
        return true
      })
      let total = mockList.length;
      mockList = mockList.filter((u, index) => index < 5 * page && index >= 5 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            list: mockList
          }])
        }, 500)
      })
    });

    // 交易列表（分页）
    mock.onGet('/transferManage/transferManage').reply(config => {
      let {page, name} = config.params
      let mockList = _Transfer.filter(transfer => {
        if (name && transfer.name.indexOf(name) === -1) return false
        return true
      })
      let total = mockList.length;
      mockList = mockList.filter((u, index) => index < 5 * page && index >= 5 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            list: mockList
          }])
        }, 500)
      })
    })

    // 日历数据
    mock.onGet('/businessManage/calData').reply(config => {
      let mockList = _CalData
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            list: mockList
          }])
        }, 500)
      })
    })

    // 客户日历数据
    mock.onGet('/customerManage/calData').reply(config => {

      let params = config.params;
      // console.log("customerManage=",params)
      let mockList = _CalData;
      // console.log(_CalData);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            list: mockList
          }])
        }, 500)
      })
    })
  }

}

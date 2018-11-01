import axios from 'axios'
import Qs from 'qs'
import { Loading,MessageBox } from 'element-ui';

export const baseUrl = 'http://180.168.156.212:2135/pcp/api';

export default async (type = 'GET', url = '', data = {}, ct = 'application/x-www-form-urlencoded', method = 'fetch') => {
  type = type.toUpperCase();
  if (url.indexOf('http') === -1) {
    url = baseUrl + url;
  }
  let loadingInstance = Loading.service({ fullscreen: true });

  if (type == 'GET') {
    let qs = Qs.stringify(data);
    if (url.indexOf('?') > -1) {
      url = url + '&' + qs
    } else {
      url = url + '?' + qs
    }
  }

  return new Promise(function (resolve, reject) {
    return axios({
      method: type,
      url: url,
      data: type === 'POST' || method === 'PUT' ? Qs.stringify(data) : null,
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status === 200) {
        let data = response['data'];
        loadingInstance.close();
        resolve(data);
      }
    }).catch(function (error) {
      loadingInstance.close();
      MessageBox.alert('连接失败','提示');
      console.error(error)
    })
  });

}

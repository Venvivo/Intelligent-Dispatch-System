import api from '../api/api'

const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
};

let bind = (obj) => api('POST', '/equ/equipment/bind', obj);

export {
  bind
}

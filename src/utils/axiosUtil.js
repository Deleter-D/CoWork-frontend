import axios from 'axios'

const instance = axios.create({
  baseURL: '/api'
})

export function get (url, params) {
  return instance.get(url, params)
}

export function post (url, params) {
  return instance.post(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function put (url, params) {
  return instance.put(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function patch (url, params) {
  return instance.patch(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function del (url, params) {
  return instance.delete(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

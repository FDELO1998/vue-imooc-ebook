import axios from 'axios'
import { setLocalForage } from '../utils/localForage'
const URL1 = 'http://192.168.1.104:3000'
export function flatList() {
  return axios({
    method: 'get',
    url: URL1 + '/book/flat-list'
  })
}

export function shelf() {
  return axios({
    method: 'get',
    url: URL1 + '/book/shelf'
  })
}

export function home() {
  return axios({
    method: 'get',
    url: URL1 + '/book/home'
  })
}

export function detail(book) {
  return axios({
    method: 'get',
    url: URL1 + '/book/detail',
    params: {
      fileName: book.fileName
    }
  })
}
export function list() {
  return axios({
    method: 'get',
    url: URL1 + '/book/list'
  })
}
export function login(login) {
  return axios({
    method: 'get',
    url: URL1 + '/book/login',
    params: {
      text: login.text,
      password: login.password,
      type: login.type
    }
  })
}
export function regester() {
  return axios({
    method: 'get',
    url: URL1 + '/book/regester'
  })
}

export function download(book, onSucess, onError, onProgress) {
  if (onProgress == null) {
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: 'http://192.168.1.104:8081/epub',
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob,
        () => onSucess(book),
        err => onError(err))
    }).catch(err => {
      if (onError) onError(err)
    })
}

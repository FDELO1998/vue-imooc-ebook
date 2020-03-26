import axios from 'axios'

export function home() {
    return axios({
        method: 'get',
        url: 'http://192.168.1.103:8080/book/home'
    })
}

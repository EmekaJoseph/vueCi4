import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost',
    headers: {
        // 'X-Custom-Header': '',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getBatchList(num) {
        return apiClient.get('/getBatchList/' + num)
    },

    getList() {
        return apiClient.get('/getList')
    }


}
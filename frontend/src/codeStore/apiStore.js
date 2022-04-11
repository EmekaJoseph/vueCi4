import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost',
    headers: {
        // 'X-Custom-Header': '',
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const apiClientImage = axios.create({
    baseURL: 'http://localhost',
    headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
    }
})

export default {
    getBatchList(num) {
        return apiClient.get('/getBatchList/' + num)
    },

    getList() {
        return apiClient.get('/getList')
    },

    uploadImage(imageData) {
        return apiClientImage.post('/submitImage', imageData)
    }


}
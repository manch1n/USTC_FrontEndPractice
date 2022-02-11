import axios from 'axios'

const apiClient = axios.create({
    //baseURL: 'http://180.76.183.142',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
    },
    withCredentials: true,
})


export default {
    getVerifyCode(email) {
        let data = { 'email': email }
        console.log('getVerifyCode', data);
        return apiClient.post('/user/getConfirmCode', data
        )
    },
    submitRegister(userInfo) {
        console.log('register', userInfo)
        return apiClient.post('/user/register', JSON.stringify(userInfo))
    },
    submitLogin(userInfo) {
        console.log('login', userInfo)
        return apiClient.post('/user/login', JSON.stringify(userInfo))
    }
}

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
    },
    getUserInfo(id) {
        console.log('userInfo ', id)
        return apiClient.get('/user/getInfoById?id=' + id)
    },
    updateUserInfo(userInfo) {
        console.log('updateUserInfo', userInfo)
        return apiClient.post('/user/updateInfo', JSON.stringify(userInfo))
    },
    updateUserPasswd(passwd) {
        console.log('updateUserPasswd', passwd)
        return apiClient.post('/user/updatePassword', JSON.stringify(passwd))
    },
    applyLevel(level) {
        console.log('applyLevel', level)
        return apiClient.post('/app/appLevel', JSON.stringify(level))
    },
    getApplicants(id) {
        console.log('getApply', id)
        return apiClient.get('/app/getByAppLevel?userId=' + id)
    },
    submitJudge(applicant) {
        console.log('submitJudge', applicant)
        return apiClient.post('/app/judgeAppLevel', JSON.stringify(applicant))
    }
}

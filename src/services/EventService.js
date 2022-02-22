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
        return apiClient.get('/app/getByAppUserId?userId=' + id)
    },
    submitJudge(applicant) {
        console.log('submitJudge', applicant)
        return apiClient.post('/app/judgeAppLevel', JSON.stringify(applicant))
    },
    getMyApp(id) {
        console.log('getMineApp', id)
        return apiClient.get('/app/getMineApp?userId=' + id)
    },
    uploadFile(file) {
        console.log('upload')
        return apiClient.post('/file/upload', file, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    getFileList(level) {
        console.log('getfileslist', level)
        return apiClient.get('/file/getFilesByLevel?level=' + level)
    },
    downloadFile(file) {
        console.log('download', file)
        return apiClient.post('/file/download', JSON.stringify(file), { responseType: 'blob' })
    },
    deleteFile(file) {
        console.log('delete', file)
        return apiClient.post('/file/deleteById', JSON.stringify(file))
    },
    createTask(task) {
        console.log('create', task)
        return apiClient.post('/task/create', JSON.stringify(task))
    },
    getTasks(id) {
        console.log('getTask', id)
        return apiClient.get('/task/getTasksByUserId?userId=' + id)
    },
    updateRemark(remark) {
        console.log('updateremark', remark)
        return apiClient.post('/task/updateInfo', JSON.stringify(remark))
    },
    getRecord(tid) {
        console.log('getRecord', tid)
        return apiClient.get('/task/getInfoById?taskId=' + tid)
    },
    updateTask(task) {
        console.log('update', task)
        return apiClient.post('/task/updateProcess', JSON.stringify(task))
    }
}

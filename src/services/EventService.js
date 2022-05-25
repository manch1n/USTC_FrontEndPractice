import axios from 'axios'
import dayjs from 'dayjs'

const apiClient = axios.create({
    //baseURL: 'http://180.76.183.142',
    baseURL: '/api',
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
            , { withCredentials: true })
    },
    submitRegister(userInfo) {
        console.log('register', userInfo)
        return apiClient.post('/user/register', JSON.stringify(userInfo), { withCredentials: true })
    },
    submitLogin(userInfo) {
        console.log('login', userInfo)
        return apiClient.post('/user/login', JSON.stringify(userInfo), { withCredentials: true })
    },
    getUserInfo(id) {
        console.log('userInfo ', id)
        return apiClient.get('/user/getInfoById?id=' + id, { withCredentials: true })
    },
    updateUserInfo(userInfo) {
        console.log('updateUserInfo', userInfo)
        return apiClient.post('/user/updateInfo', JSON.stringify(userInfo), { withCredentials: true })
    },
    updateUserPasswd(passwd) {
        console.log('updateUserPasswd', passwd)
        return apiClient.post('/user/updatePassword', JSON.stringify(passwd), { withCredentials: true })
    },
    getUsers(uid) {
        console.log('getUsers', uid);
        return apiClient.get('/user/getUsersByUserId?UserId=' + uid);
    },
    applyLevel(level) {
        console.log('applyLevel', level)
        return apiClient.post('/app/appLevel', JSON.stringify(level), { withCredentials: true })
    },
    getApplicants(id) {
        console.log('getApply', id)
        return apiClient.get('/app/getByAppUserId?userId=' + id)
    },
    submitJudge(applicant) {
        console.log('submitJudge', applicant)
        return apiClient.post('/app/judgeAppLevel', JSON.stringify(applicant), { withCredentials: true })
    },
    getMyApp(id) {
        console.log('getMineApp', id)
        return apiClient.get('/app/getMineApp?userId=' + id, { withCredentials: true })
    },
    uploadFile(file) {
        console.log('upload')
        return apiClient.post('/file/upload', file, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
    },
    getFileList(level) {
        console.log('getfileslist', level)
        return apiClient.get('/file/getFilesByLevel?level=' + level, { withCredentials: true })
    },
    downloadFile(file) {
        console.log('download', file)
        return apiClient.post('/file/download', JSON.stringify(file), { responseType: 'blob' }, { withCredentials: true })
    },
    deleteFile(file) {
        console.log('delete', file)
        return apiClient.post('/file/deleteById', JSON.stringify(file), { withCredentials: true })
    },
    createTask(task) {
        console.log('create', task)
        return apiClient.post('/task/create', JSON.stringify(task), { withCredentials: true })
    },
    getTasks(id) {
        console.log('getTask', id)
        return apiClient.get('/task/getTasksByUserId?userId=' + id, { withCredentials: true })
    },
    updateRemark(remark) {
        console.log('updateremark', remark)
        return apiClient.post('/task/updateInfo', JSON.stringify(remark), { withCredentials: true })
    },
    getRecord(tid) {
        console.log('getRecord', tid)
        return apiClient.get('/task/getInfoById?taskId=' + tid, { withCredentials: true })
    },
    updateTask(task) {
        console.log('update', task)
        return apiClient.post('/task/updateProcess', JSON.stringify(task), { withCredentials: true })
    },
    formatDate(sqlDate) {
        return dayjs(sqlDate).format("YYYY年MM月DD日 HH时mm分")
    },
    loginByFace(image) {
        console.log('loginByFace', image);
        return apiClient.post('/user/loginByFace', JSON.stringify(image), { withCredentials: true })
    },
    updateImage(image) {
        console.log('updateImage', image);
        return apiClient.post('/user/updateImage', JSON.stringify(image), { withCredentials: true })
    }
}

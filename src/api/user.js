import request from '@/utils/request'

export default {
    listPage(params){
        return request({
            url: '/api/user/page',
            method: 'get',
            params
        })
    },
    listPage2(params){
        return request({
            url: '/api/user/page2',
            method: 'get',
            params
        })
    },
    listPage3(params){
        return request({
            url: '/api/user/page3',
            method: 'get',
            params
        })
    },
    add(data){
        return request({
            url: '/api/user/add',
            method: 'post',
            data
        })
    },
    edit(data){
        return request({
            url: '/api/user/edit',
            method: 'put',
            data
        })
    },
    delete(data){
        return request({
            url: '/api/user/delete',
            method: 'delete',
            data
        })
    },
    uploadImage(data){
        return request({
            url: '/api/upload/image',
            method: 'post',
            data
        })
    }
}
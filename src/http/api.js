import { get, post } from './http';

const loginPageApi = {
    login (params) {
        return post('/apis/LoginAPI/WebLoginAPI',params);
    }
};

const homePageApi = {
    getUserMenu(){
        return post('/apis/LoginAPI/UserMenu');
    },
    getQueryNavMenuList(pageSize,pageIndex){
        return post('/apis/SysSetAPI/QueryNavMenuList',{pageSize: pageSize,pageIndex:pageIndex});
    }
}

export default {
    loginPageApi,
    homePageApi
}

import { get, post } from './http';

const loginPageApi = {
    login (params) {
        return post('/apis/LoginAPI/WebLoginAPI',params);
    }
};

const homePageApi = {
    // 用户菜单
    getUserMenu(){
        return post('/apis/LoginAPI/UserMenu');
    },
    // 菜单管理-菜单列表
    getQueryNavMenuList(params){
        return post('/apis/SysSetAPI/QueryNavMenuList',params);
    },
    // 菜单管理-菜单列表-新增
    getAddMenuExecutive(params){
        return post('/apis/SysSetAPI/AddMenuExecutive',params);
    },
    // 菜单管理-菜单列表-修改
    getUpdateMenuExecutive(params){
        return post('/apis/SysSetAPI/UpdateMenuExecutive',params);
    }
}

export default {
    loginPageApi,
    homePageApi
}

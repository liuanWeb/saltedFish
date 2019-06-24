import { get, post } from './http';

const loginPageApi = {
    login (params) {
        return post('/apis/LoginAPI/WebLoginAPI',params);
    }
};

const homePageApi = {
    getMenu(){
        return post('/apis/LoginAPI/UserMenu');
    }
}

export default {
    loginPageApi,
    homePageApi
}

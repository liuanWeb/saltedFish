import { get, post } from './http';

const loginPageApi = {
    login (params) {
        return post('/apis',params);
    }
}

export default {
    loginPageApi
}

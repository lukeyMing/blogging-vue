import axios from 'axios';

const host = 'http://localhost:9999';
const loginApi = `${host}/v1/api/user/login`;

export function userLoginApi(account, password, type) {
    return axios.post(loginApi, {
        account:account,
        password:password,
        type:type
    }).then((res) => {
        return Promise.resolve(res.data);
    }).catch((err) => {
        console.log(err);
    });
}

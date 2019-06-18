import axios from 'axios';
import { Notify } from 'vant';
import {router} from '../router'
import {loadToken} from "../common/js/cache";

const HOST = 'http://localhost:9999';
const LOGIN = `${HOST}/v1/api/user/login`;

const GET_ADMIN_INIT = `${HOST}/v1/adminApi/getInit`;
const GET_ADMIN_ALBUM_LIST = `${HOST}/v1/adminApi/getAlbumList`;
const ADMIN_PUBLISH_ALBUM = `${HOST}/v1/adminApi/publishAlbum`;
const ADMIN_DELETE_ALBUM = `${HOST}/v1/adminApi/deleteAlbum`;

const AUTH_CODE = 1002;
const HTTP_ERROR = 'NET ERROR！';


axios.defaults.headers.common['Authorization'] = loadToken("");
axios.defaults.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";

export function userLoginApi(account, password, type) {
    let form = new FormData
    form.append("account",account);
    form.append("password",password);
    form.append("type",type);
    return axios.post(LOGIN, form).then((res) => {
        let isValid = checkResult(res.data);
        if (isValid) {
            return Promise.resolve(res.data);
        }
    }).catch((err) => {
        console.log(err);
        alert(JSON.stringify(err));
        Notify(HTTP_ERROR);
    });
}

// admin
export function getAdminInitApi() {
    return axios.get(GET_ADMIN_INIT, {
        params: {}
    }).then((res) => {
        let isValid = checkResult(res.data);
        if (res.data.code === AUTH_CODE) {
            router.push("/login")
        }
        if (isValid) {
            return Promise.resolve(res.data);
        }
    }).catch((err) => {
        console.log(err);
        Notify(HTTP_ERROR);
    });
}

export function getAdminAlbumListApi(lastId, category, sort) {
    return axios.get(GET_ADMIN_ALBUM_LIST, {
        params: {lastId:lastId, category, sort}
    }).then((res) => {
        let isValid = checkResult(res.data);
        if (res.data.code === AUTH_CODE) {
            router.push("/login")
        }
        if (isValid) {
            return Promise.resolve(res.data);
        }
    }).catch((err) => {
        console.log(err);
        Notify(HTTP_ERROR);
    });
}

export function publishAlbumApi(albumId, medias, desc, tags, type) {
    let form = new FormData;
    form.append("albumId", albumId);
    form.append("medias", medias);
    form.append("desc", desc);
    form.append("tags",tags);
    form.append("type",type);
    return axios.post(ADMIN_PUBLISH_ALBUM, form).then((res) => {
        let isValid = checkResult(res.data);
        if (isValid) {
            return Promise.resolve(res.data);
        }
    }).catch((err) => {
        console.log(err);
        Notify(HTTP_ERROR);
    });
}

export function deleteAlbumApi(albumId) {
    let form = new FormData;
    form.append('albumId', albumId);
    return axios.post(ADMIN_DELETE_ALBUM, form).then((res) => {
        let isValid = checkResult(res.data);
        if (isValid) {
            return Promise.resolve(res.data);
        }
    }).catch((err) => {
        console.log(err);
        Notify(HTTP_ERROR);
    });
}


function checkResult(result) {
    if (!result || !result.msg) {
        Notify(HTTP_ERROR);
        return false
    }
    if (result.code !== 0 && result !== AUTH_CODE) {
        Notify(result.msg);
        return false
    }
    return true
}
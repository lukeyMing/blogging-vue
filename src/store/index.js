import Vue from 'vue'
import Vuex from 'vuex'
import {saveToken, saveUser, loadToken, loadUser} from '../common/js/cache';


Vue.use(Vuex);

const state = {
    user: loadUser(false),
    token: loadToken(false),
};

const getters = {
    getUser: state => {
        if (state.user) {
            return state.user
        }
        state.user = loadUser({});
        return  state.user
    },
    getToken: state => {
        if (state.token) {
            return state.token
        }
        return loadToken("")
    },
};

const mutations = {
    setUser : function (state, user) {
        state.user = user
    },
    setToken : function (state, token) {
        state.token = token
    },
};

const actions = {
    loginSaveUser : function ({commit}, user) {
        commit("setUser", saveUser(user))
        commit("setToken", saveToken(user.token))
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

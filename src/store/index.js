import Vue from 'vue'
import Vuex from 'vuex'
import {saveToken, saveUser, loadToken, loadUser} from '../common/js/cache';

Vue.use(Vuex)

const state = {
    user: {},
    token: "",
};

const getters = {
    user: state => state.user,
    token: state => state.token,
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
    saveUser : function ({commit}, user) {
        commit("setUser", saveUser(user))
    },
    saveToken : function ({commit}, token) {
        commit("setToken", saveToken(token))
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

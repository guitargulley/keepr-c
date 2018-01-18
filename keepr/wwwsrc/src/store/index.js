import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

let base = window.location.host.indexOf('localhost') > -1 ? '//localhost:5000/' : '/'

let api = axios.create({
    baseURL: base + 'api/',
    timeout: 2000,
    withCredentials: true
})

let auth = axios.create({
    baseURL: base,
    timeout: 2000,
    withCredentials: true
})

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        error: {},
        activeUser: {},
        keeps: [],
        activeKeep: {},
        userKeeps: [],
        userVaults: [],
        activeVault: {},
        vaultKeeps: [],
        categories:["Food", "Funny", "Animals", "Tattoos", "Cars", "Wedding", "Decorations", "DIY"]
    },
    mutations: {
        handleError(state, err) {
            state.error = err
        },
        setUser(state, user) {
            console.log('User:', user)
            state.activeUser = user
        },
        setKeeps(state, data) {
            console.log('all keeps:', data)
            state.keeps = data
            console.log(state.keeps)
        },
        setActiveKeep(state, data) {
            console.log('Active keep:', data)
            Vue.set(state, 'activeKeep', data)
        },
        setActiveVault(state, data) {
            Vue.set(state, 'activeVault', data)
        },
        setVaults(state, data) {
            state.userVaults = data
        },
        setUserKeeps(state, data) {
            state.userKeeps = data
        },
        setVaultKeeps(state, data) {
            state.vaultKeeps = data
        },
        resetState(state, data) {
            state.error = {},
                state.activeUser = {},
                state.activeKeep = {},
                state.userKeeps = [],
                state.userVaults = [],
                state.activeVault = {},
                state.vaultKeeps = []
                router.push({ name: 'Home' })
        },
    },
    actions: {
        //LOGIN
        login({ commit, dispatch }, payload) {
            auth.post('account/login', payload)
                .then(res => {
                    console.log("Successful login.")
                    commit('setUser', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        //REGISTER
        register({ commit, dispatch }, payload) {
            auth.post('account/register', payload)
                .then(res => {
                    console.log(res)
                    commit('setUser', res.data)
                })
                .catch((err) => {
                    commit('handleError', err)
                })
        },
        //AUTHENTICATE
        authenticate({ commit, dispatch }) {
            auth('account/authenticate')
                .then(res => {
                    commit('setUser', res.data)
                })
                .catch((err) => {
                    commit('handleError', err)
                })
        },
        //LOGOUT
        logout({ commit, dispatch }) {
            auth.delete('account/logout')
                .then(() => {
                    var user = {}

                    commit('setUser', user)
                    commit('resetState')
                    dispatch('authenticate')
                })
        },
        // CONDENSED ROUTES
        create({ commit, dispatch }, payload) {
            api.post(`${payload.resource}/${payload.endpoint}`, payload.data)
                .then(res => {
                    if (payload.action) {
                        payload.resource = payload.resource2
                        payload.endpoint = payload.endpoint2
                        payload.mutation = payload.mutation2
                        dispatch(payload.action, payload)
                    }
                    if (payload.mutation) {
                        commit(payload.mutation, res.data)
                    }
                    if (payload.router) {
                        router.push(payload.router)
                    }
                })
                .catch(err => {
                    commit("handleError", err)
                })
        },
        update({ commit, dispatch }, payload) {

            api.put(`${payload.resource}/${payload.endpoint}`, payload.data)
                .then(res => {
                    if (payload.action) {
                        payload.resource = payload.resource2
                        payload.endpoint = payload.endpoint2
                        payload.mutation = payload.mutation2
                        dispatch(payload.action, payload)
                    }
                    if (payload.mutation) {
                        commit(payload.mutation, res.data)
                    }
                    if (payload.router) {
                        router.push(payload.router)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getAll({ commit, dispatch }, payload) {

            api(`${payload.resource}/${payload.endpoint}`, payload.endpoint)
                .then(res => {
                    if (payload.action) {
                        payload.resource = payload.resource2
                        payload.endpoint = payload.endpoint2
                        payload.mutation = payload.mutation2
                        dispatch(payload.action, payload)
                    }
                    if (payload.mutation) {
                        commit(payload.mutation, res.data)
                    }
                    if (payload.router) {
                        router.push(payload.router)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getOne({ commit, dispatch }, payload) {
            api(`${payload.resource}/${payload.endpoint}`)
                .then(res => {
                    if (payload.action) {
                        payload.resource = payload.resource2
                        payload.endpoint = payload.endpoint2
                        payload.mutation = payload.mutation2
                        dispatch(payload.action, payload)
                    }
                    if (payload.mutation) {
                        commit(payload.mutation, res.data)
                    }
                    if (payload.router) {
                        router.push(payload.router)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        delete({ commit, dispatch }, payload) {
            api.delete(`${payload.resource}/${payload.endpoint}`, payload.endpoint)
                .then(res => {
                    if (payload.action) {
                        payload.resource = payload.resource2
                        payload.endpoint = payload.endpoint2
                        payload.mutation = payload.mutation2
                        dispatch(payload.action, payload)
                    }
                    if (payload.mutation) {
                        commit(payload.mutation, res.data)
                    }
                    if (payload.router) {
                        router.push(payload.router)
                    }
                })
                .catch(err => {
                    commit('handleError', err)
                })
        }
    }
})

export default store
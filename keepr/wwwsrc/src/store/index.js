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
        vaultKeeps: []
    },
    mutations: {
        handleError(state, err) {
            state.error = err
        },
        setUser(state, user) {
            console.log('User:', user)
            state.activeUser = user
        },
        setKeeps(state, payload) {
            console.log('all keeps:', payload)
            state.keeps = payload.data
        },
        setActiveKeep(state, data) {
            console.log('Active keep:', data)
            Vue.set(state, 'activeKeep', data)
        },
        setActiveVault(state, data){
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
        }
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
                    router.push({ name: 'Home' })
                    dispatch('authenticate')
                })
        },

        // GET all listings of one model
        getKeeps({ commit, dispatch }, payload) {
            api(`${payload.resource}`)
                .then(res => {
                    commit('setKeeps', { resource: payload.resource, data: res.data })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // GET listing at specific id (for given model type)
        getKeep({ commit, dispatch }, payload) {
            api(`${payload.resource}/${payload.id}`)
                .then(res => {
                    commit('setActiveKeep', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // POST new listing (for given model type)
        createKeep({ commit, dispatch }, payload) {
            api.post(`${payload.resource}`, payload.data)
                .then(res => {
                    dispatch('getKeeps', { resource: payload.resource })
                    dispatch('getUserKeeps', {resource: payload.resource, id: payload.user.id})
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // PUT edits to self-posted listing (for given model type)

        updateKeep({ commit, dispatch }, payload) {
            api.put(`${payload.resource}/${payload.endpoint}`, payload.keep)
                .then(res => {
                    dispatch('getKeeps', { resource: payload.resource })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        editVault({commit, dispatch}, payload){
            api.put(`${payload.resource}/${payload.endpoint}`, payload.vault)
                .then(res => {
                    dispatch('getActiveVault', payload)
                })
                .catch(err=>{
                    commit('handleError', err)
                })
        },

        // DELETE self-posted listing (for given model type)

        deleteKeep({ commit, dispatch }, payload) {
            
            api.delete(`${payload.resource}/${payload.endpoint}`)
                .then(res => {
                    dispatch('getUserKeeps', { resource: payload.resource, id:payload.id})
                    
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getUserKeeps({ commit, dispatch }, payload) {
            
            api(`${payload.resource}/users/${payload.id}`, payload.id)
                .then(res => {
                    commit('setUserKeeps', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        getVaults({ commit, dispatch }, payload) {
            api(`${payload.resource}/users/${payload.id}`, payload.id)
                .then(res => {
                    commit('setVaults', res.data)
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        createVault({ commit, dispatch }, payload) {
            api.post(payload.resource, payload.data)
                .then(res => {
                    dispatch('getVaults', {resource:payload.resource, id:payload.user.id})
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        addToVault({ commit, dispatch }, payload) {
            api.post(payload.resource, payload.data)
                .then(res => {
                    payload.resource = "keeps"
                    payload.endpoint = payload.keep.id
                    dispatch('updateKeep', payload)
                    router.push({path: '/vaults/' + payload.data.vaultId})
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },
        removeKeep({commit, dispatch}, payload){
            api.delete(payload.resource + "/vaults/" + payload.endpoint + "/keeps/" + payload.endpoint2)
                .then(res => {
                    dispatch('getVaultKeeps', payload)
                })
        },
        getVaultKeeps({ commit, dispatch }, payload) {
            api(payload.resource + "/" + payload.endpoint)
                .then(res => {
                    commit('setVaultKeeps', res.data)
                })
        },
        getActiveVault({ commit, dispatch }, payload) {
            
            api(payload.resource + "/" + payload.endpoint)
                .then(res => {
                    commit('setActiveVault', res.data)
                    payload.resource = "vaultKeeps"
                    payload.endpoint = res.data.id
                    dispatch('getVaultKeeps', payload)
                })
        },
        deleteVault({commit, dispatch}, payload){
            api.delete(payload.resource + "/" + payload.endpoint, payload.endpoint)
                .then(res =>{
                    payload.id = payload.endpoint
                    dispatch("getVaults", payload)
                    router.push({path: '/profile/'+ payload.activeUser})
                })
                .catch(err =>{
                    commit("handleError", err)
                })
        }


    }
})

export default store
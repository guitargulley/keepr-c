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
        keeps:[],
        activeKeep:{},
    },
    mutations: {
        handleError(state, err) {
            state.error = err
        },
        setUser(state, user) {
            console.log('User:', user)
            state.activeUser = user
        },
        setKeeps(state, payload){
            console.log('all keeps:', payload)
            state.keeps = payload.data
        },
        setActiveKeep(state, payload){
            console.log('Active keep:',payload)
            vue.set(state, 'activeKeep', payload.data)
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
            api(`${payload.resource}/${payload.endpoint}`)
                .then(res => {
                    commit('setKeep', { resource: payload.resource, data: res.data })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // POST new listing (for given model type)
        addKeep({ commit, dispatch }, payload) {
            api.post(`${payload.resource}`, payload.data)
                .then(res => {
                    dispatch('getKeeps', {resource:payload.resource})
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // PUT edits to self-posted listing (for given model type)

        editKeep({ commit, dispatch }, payload) {
            api.put(`${payload.resource}/${payload.endpoint}`, payload.data)
                .then(res => {
                    dispatch('getKeeps', { resource: payload.resource })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        },

        // DELETE self-posted listing (for given model type)

        deleteKeep({ commit, dispatch }, payload) {
            api.delete(`${payload.resource}/${payload.endpoint}`)
                .then(res => {
                    dispatch('getKeeps', { resource: payload.resource })
                })
                .catch(err => {
                    commit('handleError', err)
                })
        }

    }
})

export default store
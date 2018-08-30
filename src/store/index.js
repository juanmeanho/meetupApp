import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import { stat } from 'fs';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups:[
            { imageUrl:'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg', 
              id:'dfsdfsdf323', 
              title: 'Meetup in New York',
              date: new Date(),
              location: 'New York',
              description: 'New York New York'
            },
            { imageUrl:'https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg', 
              id:'dfsdfsdf32354454', 
              title: 'Meetup in Paris',
              date: new Date(),
              location: 'Paris',
              description: 'Its Paris'
            }
          ],
          user:null,
          loading: false,
          error: null
    },
    mutations: {
        createMeetup(state, payload){
            state.loadedMeetups.push(payload)
        },
        setUser(state, payload){
            state.user = payload
        },
        setLoading(state, payload){
            state.loading = payload
        },
        setError (state, payload){
            state.error = payload
        },
        clearError (state){
            state.error = null
        }
    },
    actions: {
        createMeetup({commit}, payload){
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id:'sadasfadasd123'
            }
            //Reach out to firebase and store it
            commit('createMeetup', meetup)
        },
        signUserUp({ commit }, payload){
            commit('setLoading', true)
            commit('clearError')            
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                ).catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        signUserIn({commit}, payload){
            commit('setLoading', true)
            commit('clearError') 
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)                        
                        const newUser = {
                            id:user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                ).catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)                                          
                        console.log(error)
                    }

                )
        },
        clearError({commit}){
            commit('clearError')
        }
    },
    getters: {
        loadedMeetups (state){
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state, getters){
            return getters.loadedMeetups.slice(0,5)
        },
        loadedMeetup (state){
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.Id === meetupId
                })
            }
        },
        user(state){
            return state.user
        },
        loading(state){
            return state.loading
        },
        error(state){
            return state.error
        }
    }
})
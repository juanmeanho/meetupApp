import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

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
        setLoadedMeetups(state, payload){
            state.loadedMeetups = payload
        },
        createMeetup(state, payload){
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload){
            const meetup = state.loadedMeetups.find(meetup => {
                    return meetup.id === payload.id
                })
            if(payload.title){
                meetup.title = payload.title
            }
            if(payload.description){
                meetup.description = payload.description
            }
            if(payload.date){
                meetup.date = payload.date
            }
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
        loadMeetups({commit}){
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for(let key in obj){
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            location: obj[key].location,
                            creatorId: obj[key].creatorId
                        })
                    }
                    commit('setLoadedMeetups', meetups)
                    commit('setLoading', false)

                })
                .catch(
                    (error) => { 
                        console.log(error)
                    commit('setLoading', true)

                    }
                )
        },
        /*createMeetup({commit, getters}, payload){
            const meetup = {
                title: payload.title,
                location: payload.location,
                //imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date.toISOString(),
                creatorId: getters.user.id
                //id:'sadasfadasd123' firebase coloca uno automagicamente
            }
            let imageUrl
            let key            
            firebase.database().ref('meetups').push(meetup)
              .then((data) => {
                  key = data.key
                  //commit('createMeetup', {
                  //  ...meetup,
                  //  id: key
                //})
                  //console.log(data)
                  //commit('createMeetup', meetup)
                  return key
              })
              .then(key => {
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                firebase.storage().ref('meetups/' + key +'.' + ext).put(payload.image)
              })
              .then(fileData => {
                imageUrl = fileData.ref.downloadURLs[0]
                return firebase.database().ref('meetups').child(key).update({
                    imageUrl: imageUrl
                })
                .then(() =>{
                        commit('createMeetup', {
                      ...meetup,
                      imageUrl: imageUrl,
                      id: key
                    })
                })
              })
              .catch((error) => {
                console.log(error)
              })
            //Reach out to firebase and store it
        },*/
        createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      let uploadTask
      commit('setLoading', true)
      firebase.database().ref('meetups').push(meetup).then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        // Create a root reference
        const storageRef = firebase.storage().ref()
        uploadTask = storageRef.child('meetups/' + key + ext).put(payload.image)
      })
      .then(() => {
        commit('setLoading', true)
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
          console.log(error)
          commit('setLoading', false)
        }, function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL)
            imageUrl = downloadURL
            if (imageUrl) {
              firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
              console.log('image updated')
              commit('createMeetup', {
                ...meetup,
                imageUrl: imageUrl,
                id: key
              })
              commit('setLoading', false)
            } else {
              commit('setLoading', false)
            }
          })
        })
      })
    },﻿
        updateMeetupData({commit}, payload){
           commit('setLoading', true)
           const updateObj = {}
           if(payload.title){
            updateObj.title = payload.title
           }
           if(payload.description){
            updateObj.description = payload.description
           }
           if(payload.date){
            updateObj.date = payload.date
           }
           firebase.database().ref('meetups').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('updateMeetup', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
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
        autoSignIn({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        logout({commit}){
            firebase.auth().signOut()
            commit('setUser', null)
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
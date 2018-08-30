import Vue from 'vue'
import Vuex from 'vuex'

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
          user:{
              id: 'asdasdas12',
              registeredMeetups: ['aaasasdaf212']
          }
    },
    mutations: {
        createMeetup(state, payload){
            state.loadedMeetups.push(payload)
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
        }
    }
})
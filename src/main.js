import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import {store} from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'


Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
	firebase.initializeApp({
			apiKey: 'AIzaSyB1CP1_K3FLvMxZRrVfd0Eb1bCDq8p0tXw',
			authDomain: 'meetupsapp-c65e9.firebaseapp.com',
			databaseURL: 'https://meetupsapp-c65e9.firebaseio.com',
			projectId: 'meetupsapp-c65e9',
			storageBucket: 'meetupsapp-c65e9.appspot.com',
			messagingSenderId: '615264212691'
		})
	firebase.auth().onAuthStateChanged((user) => {
		if(user){
			this.$store.dispatch('autoSignIn', user)
		}
	})

		this.$store.dispatch('loadMeetups')

	}
}).$mount('#app')

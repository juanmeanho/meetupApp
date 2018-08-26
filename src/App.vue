<template>
  <v-app>
   <v-toolbar dark class="secondary">
     <v-toolbar-title>DevMeetup</v-toolbar-title>
     <v-toolbar-side-icon 
      @click="sideNav = !sideNav"
      class="hidden-sm-and-up">
     </v-toolbar-side-icon>  
     <v-spacer></v-spacer>
     <v-toolbar-items class="hidden-xs-only">
       <v-btn flat>
        <v-icon left>supervisor_account</v-icon>
          View Meetups
       </v-btn>
     </v-toolbar-items>
   </v-toolbar> 
   <v-navigation-drawer v-model="sideNav">
     <v-list>
      <v-list-tile>
        <v-list-tile-action>
         <v-icon>supervisor_account</v-icon>
       </v-list-tile-action>
       <v-list-tile-content>
         View Meetups
       </v-list-tile-content>
      </v-list-tile>
     </v-list> 
   </v-navigation-drawer>  
   <main>
     
   </main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
        sideNav: false
    }
  }
}
</script>

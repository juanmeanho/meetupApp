<template>
  <v-container>
    <v-layout row wrap >
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large to="/meetups" class="info">Explore Meetups</v-btn>        
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large to="/meetup/new" class="info">New Meetup</v-btn>        
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel
          delimiter-icon="stop"
          prev-icon="mdi-arrow-left"
          next-icon="mdi-arrow-right">
            <v-carousel-item
              v-for="meetup in meetups"
              :key="meetup.id"
              :src="meetup.imageUrl"
              @click="onLoadMeetup(meetup.id)">
              <div class="title">{{ meetup.title }}</div>
            </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome Meetup</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data(){
      return {
        meetups: [
          {imageUrl:'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg', id:'dfsdfsdf323', title: 'Meetup in New York'},
          {imageUrl:'https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg', id:'dfsdfsdf32354454', title: 'Meetup in Paris'}
        ]
      }
    },
    methods:{
      onLoadMeetup(id){
          this.$router.push('/meetups' + id)
        }
      }
  };
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50 px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size:  2em;
    padding: 20px;
  }
</style>


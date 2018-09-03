<template>
	<v-dialog
	  persistent
	  v-model="editDialog"
	  width="350"
	  transition="dialog-transition">
		<v-btn color="success"
			accent
			slot="activator">
				Edit Date
			</v-btn> 
			<v-card>
			  <v-container>
			    <v-layout row wrap>
			      <v-flex xs12>
			        <v-card-title>
			          Edit Meetup Date
			        </v-card-title>
			      </v-flex>
			    </v-layout>
			    <v-divider></v-divider>
			    <v-layout row wrap>
			      <v-flex xs12>
			        
			      </v-flex>
			    </v-layout>
			    <v-divider></v-divider>
			    <v-layout row wrap>
			      <v-flex xs12>
			        <v-date-picker 
			        	v-model="editableDate"
			        	style="width:100%">
			        	<template scope="{ save, cancel }">
			        		<v-btn color="success"
				        		flat
				        		@click.native="editDialog">
			        				Close
			        		</v-btn>
			        		<v-btn color="success"
				        		flat
				        		@click.native="onSaveChanges">
			        				Save
			        		</v-btn>
			        	</template>
			        </v-date-picker>
			      </v-flex>
			    </v-layout>
			  </v-container>
			</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: ['meetup'],
		data(){
			return {
				editDialog: false,
				editableDate: null
			}
		},
		methods: {
			onSaveChanges(){
				const newDate = new Date(this.meetup.date)
				const newDay = new Date(this.editableDate).getUTCDate()
				const newMonth = new Date(this.editableDate).getUTCMonth()
				const newYear = new Date(this.editableDate).getUTFullYear()
				newDate.setUTCDate(newDay)
				newDate.setUTCMonth(newMonth)
				newDate.setUTCFullYear(newYear)
				this.$store.dispatch('updateMeetupData', {
					id:this.meetup.id,
					date: newDate
				})
			}
		},
		created(){
			this.editableDate = new Date(this.meetup.date)
		}
	};
</script>
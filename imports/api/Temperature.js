import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Temperature = new Mongo.Collection( 'temperature' )

Meteor.methods({
  'temperature.insert'(temperature) {
  	if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
  	}
 
    Temperature.insert({
      date: 	 temperature.date,
      temp: 	 temperature.temp,
      tempSet: temperature.tempSet,
      tempAct: temperature.tempAct,
      valve: 	 temperature.valve
    })
  },

  'temperature.clear'() {
  	if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
  	}
 
    Temperature.remove({})
  },
})
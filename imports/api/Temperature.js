import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Temperature = new Mongo.Collection( 'temperature' )

if (Meteor.isServer) {
  Meteor.publish('temperature', function (par) {
    return Temperature.find({date: {$gte: new Date(par.gte), $lt: new Date(par.lt)}}, {sort: {date: -1}})
  })
}

Meteor.methods({
  'temperature.insert'(temperature) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
 
    Temperature.insert({
      date:    temperature.date,
      temp:    temperature.temp,
      tempSet: temperature.tempSet,
      tempAct: temperature.tempAct,
      valve:   temperature.valve
    })
  },

  'temperature.clear'() {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
 
    Temperature.remove({})
  },
})


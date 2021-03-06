import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

export const Charts = new Mongo.Collection( 'charts' )

if (Meteor.isServer) {
  Meteor.publish('charts', function (chart) {
    return Charts.find({name: {$in: chart.name}}, {sort: {year: -1}})
    
  })
}

this.span = {}

Meteor.methods({
  'charts.upsert'(chart) {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
    data = [chart.x, chart.y]
    Charts.update({
      name: chart.name,
      year: chart.year
    }, {
      $push: {
        data: data
      },
      $set: {
        year: chart.year
      }
    }, {
      upsert: true
    })
  },
  
  'charts.clear'() {
    if (Meteor.isClient) {
      throw new Meteor.Error('not-authorized')
    }
 
    Charts.remove({})
  },
})


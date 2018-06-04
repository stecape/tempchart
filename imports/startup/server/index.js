import { Meteor } from 'meteor/meteor'
import { Charts } from '../../api/Charts'

Meteor.startup(() => {

  //Everything inside here is used for populating the DB and for test purpose.
  //clear MongoDB Charts Collection
  Meteor.call('charts.clear')

	/*
  If you want to make steps of 6 hours, starting from 160 days ago, enable this*/
  var x = 0
  /**/

  getDate = () => {
    var date = new Date()
    /*
    If you want to make steps of 6 hours, starting from 160 days ago, enable this */
    var _x = x*25199000
    var d = new Date(new Date().setDate(new Date().getDate()-160))
    var dx = d.getTime() + _x
    date = new Date(dx)
    /**/
    return date
  }
  
  
  //start date generator function
  var intervalId = Meteor.setInterval(() => {

    //generating values
    var date = this.getDate()
    var temp = Math.floor(150 + Math.random() * 170)/10
    var tempSet = Math.floor(200 + Math.random() * 100)/10
    var tempAct = Math.floor(200 + Math.random() * 100)/10
    var valve = tempSet > tempAct ? 1 : 0
    
    /*
    If you want to make steps of 6 hours, starting from 160 days ago, enable this*/
    x = x + 1
    /**/

    //each charts populate the data collections through a server side method included in imports/api/Charts.js
    //the each beacon must be formatted in the following way:

    tempChart = {
      name: "temp",
      year: date.getFullYear(),
      x: date.getTime(),
      y: temp
    }

    tempSetChart = {
      name: "tempSet",
      year: date.getFullYear(),
      x: date.getTime(),
      y: tempSet
    }

    tempActChart = {
      name: "tempAct",
      year: date.getFullYear(),
      x: date.getTime(),
      y: tempAct
    }

    valveChart = {
      name: "valve",
      year: date.getFullYear(),
      x: date.getTime(),
      y: valve*100
    }


    //each second the server side method is called for storing Documents in Collections
    Meteor.call('charts.upsert', tempChart)
    Meteor.call('charts.upsert', tempSetChart)
    Meteor.call('charts.upsert', tempActChart)
    Meteor.call('charts.upsert', valveChart)

  },1000)

})
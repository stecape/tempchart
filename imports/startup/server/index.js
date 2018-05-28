import { Meteor } from 'meteor/meteor'
import { Temperature } from '../../api/Temperature'
import { Charts } from '../../api/Charts'

Meteor.startup(() => {

  //clear MongoDB Temperature Collection
  Meteor.call('temperature.clear')
  Meteor.call('charts.clear')

	var x = 0
  
  getDate = () => {
    var _x = x*25199000
    var d = new Date(new Date().setDate(new Date().getDate()-160))
    var dx = d.getTime() + _x
    var date = new Date(dx)
    return date
  }
  
  
  //start date generator function
  var intervalId = Meteor.setInterval(() => {
    var date = this.getDate()
    var temp = Math.floor(150 + Math.random() * 170)/10
    var tempSet = Math.floor(200 + Math.random() * 100)/10
    var tempAct = Math.floor(200 + Math.random() * 100)/10
    var valve = tempSet > tempAct ? 1 : 0
    
    x = x + 1
    temperature = {
      date:    date, 
      temp:    temp, 
      tempSet: tempSet, 
      tempAct: tempAct,
      valve:   valve * tempSet
    }
    
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
      y: valve * tempSet
    }


    //store Documents in Collections
    Meteor.call('temperature.insert', temperature)
    Meteor.call('charts.upsert', tempChart)
    Meteor.call('charts.upsert', tempSetChart)
    Meteor.call('charts.upsert', tempActChart)
    Meteor.call('charts.upsert', valveChart)

  },500)


  // Meteor.setInterval(() => {

  // }, 1000)
})
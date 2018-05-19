import { Meteor } from 'meteor/meteor'
import { Temperature } from '../../api/Temperature'

Meteor.startup(() => {

  Meteor.call('temperature.clear')

	var x = 0
  
  getDate = () => {
    var _x = x*299000
    var d = new Date()
    var dx = d.getTime() + _x
    var date = new Date(dx)
    return date
  }
  
  //clear MongoDB Temperature Collection
  
  //start date generator function
  var intervalId = Meteor.setInterval(() => {
    var date = this.getDate()
    var temp = Math.floor(150 + Math.random() * 170)/10
    var tempSet = Math.floor(200 + Math.random() * 100)/10
    var tempAct = Math.floor(200 + Math.random() * 100)/10
    var valve = tempSet < tempAct ? 1 : 0
    //console.log (date+"", temp, tempSet, tempAct, valve)
    x = x + 1

    temperature = {
      date:    date, 
      temp:    temp, 
      tempSet: tempSet, 
      tempAct: tempAct,
      valve:   valve
    }
    
    //store Documents in Collections
    Meteor.call('temperature.insert', temperature)

  },1000)

})
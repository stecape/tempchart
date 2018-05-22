import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'
import { Temperature } from '../../api/Temperature'
import "../styles/Chart.css"
class Chartist extends Component {

	dataParser(data) {
		var labels  = []
		var temp    = []
		var tempSet = []
		var tempAct = []
		var valve   = []
		data.map( (temperature) => {
			labels.push  ( temperature.date )
			//temp.push    ( temperature.temp ) 
			//tempSet.push ( temperature.tempSet )
			//tempAct.push ( temperature.tempAct )
			valve.push   ( temperature.valve * temperature.tempSet )
		})
		var series = [temp, tempSet, tempAct, valve]
		return {labels, series}
	}

	render() {
		var data = this.dataParser( this.props.temps )

		var options = { }
		return ( 
			"chartist"
		)
	}
}

export default ChartistContainer = withTracker(() => {
  Meteor.subscribe('Temperature')
  return {
  	temps: Temperature.find({}, {sort: {date: -1}, limit: 10}).fetch()
  }
})(Chartist)
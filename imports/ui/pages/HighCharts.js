import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'
import { Temperature } from '../../api/Temperature'
import ChartComponent from '../components/ChartComponent'
//import Highcharts from 'highcharts'
//import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, LineSeries } from 'react-jsx-highcharts'
//import "../styles/Chart.css"

class HighCharts extends Component {

	render() {
		return ( 
			<ChartComponent temps={this.props.temps} />
		)
	}
}
export default HighChartsContainer = withTracker(() => {
  Meteor.subscribe('Temperature')
  return {
  	temps: Temperature.find({}, {sort: {date: -1}, limit: 10}).fetch()
  }
})(HighCharts)
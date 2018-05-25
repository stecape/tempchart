import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'
import { Charts } from '../../api/Charts'
import Highcharts from 'highcharts'
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Tooltip, Legend, AreaSeries, LineSeries, SplineSeries } from 'react-jsx-highcharts'
import "../styles/Chart.css"

class ChartComponent extends Component {

	constructor(props){
		super(props)

		this.state = {
      temp: 	 [],
      tempSet: [],
      tempAct: [],
      valve: 	 []
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){
    var temp = []
    var tempSet = []
    var tempAct = []
    var valve = []
    temp = temp.concat( nextProps.temp.map( t => {
      return t.data
    }))
    tempSet = tempSet.concat( nextProps.tempSet.map( t => {
      return t.data
    }))
    tempAct = tempAct.concat( nextProps.tempAct.map( t => {
      return t.data
    }))
    valve = valve.concat( nextProps.valve.map( t => {
      return t.data
    }))
    var data = {
      temp: temp,
      tempSet: tempSet,
      tempAct: tempAct,
      valve: valve      
    }
		if (data != prevState.data) {
			var series = data
      series[data] = data
      console.log(series)
			return series
		}
	}

	render() {
		return ( 
		  <HighchartsChart time={{useUTC: false}} className="chart" id="chartComponent" >
        {this.props.children}
        <Chart />

        <Title>Room Temperature</Title>

        <Tooltip 
        	valueSuffix='°C'
        	split={true}
        	distance={30}
        	padding={5}
        />

        <Legend>
          <Legend.Title>Legend</Legend.Title>
        </Legend>

        <XAxis type="datetime" crosshair={{enabled: true}}>
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>

        <YAxis id="temperature">
          <YAxis.Title>Temperature (°C)</YAxis.Title>
          <AreaSeries
          	id="valve"
          	name="Valve State"
          	data={this.state.valve}
          	step
            marker={{enabled: false}}
            color='#7cb5ec'
          	lineWidth={0}
          	fillOpacity={0.2}
          />
          <LineSeries
          	id="tempSet"
          	name="Temperature Set"
          	data={this.state.tempSet}
          	step
          	marker={{enabled: false}}
          	color='#7cb5ec'
          />
          <SplineSeries
          	id="tempAct"
          	name="Temperature Actual"
          	data={this.state.tempAct}
          	step
            marker={{enabled: false}}
          	color='#90ed7d'
          />
          <SplineSeries
          	id="temp"
          	name="External Temperature"
          	data={this.state.temp}
          	step
          	marker={{enabled: false}}
          	color='#f7a35c'
          />
        </YAxis>
      </HighchartsChart>
		)
	}
}

ChartComponentContainer = withHighcharts(ChartComponent, Highcharts)

export default HighChartsContainer = withTracker((props) => {
  var gte = props.gte
  var lt  = props.lt
  Meteor.subscribe('charts', {name: ['temp', 'tempSet', 'tempAct', 'valve']})

  return {
    temp: Charts.find({name: 'temp'}).fetch(),
    tempSet: Charts.find({name: 'tempSet'}).fetch(),
    tempAct: Charts.find({name: 'tempAct'}).fetch(),
    valve: Charts.find({name: 'valve'}).fetch()
  }
})(ChartComponentContainer)

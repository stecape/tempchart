import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'
import { Temperature } from '../../api/Temperature'
import Highcharts from 'highcharts'
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Tooltip, Legend, AreaSeries, LineSeries, SplineSeries } from 'react-jsx-highcharts'
import "../styles/Chart.css"

class ChartComponent extends Component {

	constructor(props){
		super(props)

		this.state = {
      labels:  [],
      temp: 	 [],
      tempSet: [],
      tempAct: [],
      valve: 	 []
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){	
		if (nextProps.temps != prevState.data) {
			var temp    = []
			var tempSet = []
			var tempAct = []
			var valve   = []
			nextProps.temps.map( (temperature) => {
				temp.push    ( [ temperature.date.getTime(), temperature.temp ] ) 
				tempSet.push ( [ temperature.date.getTime(), temperature.tempSet ] )
				tempAct.push ( [ temperature.date.getTime(), temperature.tempAct ] )
				valve.push   ( [ temperature.date.getTime(), temperature.valve * temperature.tempSet ] )
			})
			var series = {
					data: nextProps.temps,
					temp: temp,
					tempSet: tempSet,
					tempAct: tempAct,
					valve: valve
				}
			return series
		}
	}

	render() {
		return ( 
		  <HighchartsChart time={{useUTC: false}} className="chart" id="chartComponent" >
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

export default withHighcharts(ChartComponent, Highcharts)

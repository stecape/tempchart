import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'
import { Charts } from '../../api/Charts'
import { getDataSeries, getDataRange } from '../../api/dataTools'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
HighchartsMore(Highcharts)
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Tooltip, Legend, LineSeries, SplineSeries, AreaSplineRangeSeries, ColumnSeries } from 'react-jsx-highcharts'
import "../styles/ChartComponent.css"

class ChartComponent extends Component {

	constructor(props){
		super(props)

		this.state = {
      tempRange: [],
      temp:      [],
      tempSet:   [],
      tempAct:   [],
      valve: 	   [],
      detail:    this.props.detail
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){

    var tempRange = getDataRange(
      nextProps.temp,
      nextProps.from,
      nextProps.to,
      nextProps.detail
    )
    var temp = getDataSeries(
      nextProps.temp,
      nextProps.from,
      nextProps.to,
      nextProps.detail
    )
    var tempSet = getDataSeries(
      nextProps.tempSet,
      nextProps.from,
      nextProps.to,
      nextProps.detail
    )
    var tempAct = getDataSeries(
      nextProps.tempAct,
      nextProps.from,
      nextProps.to,
      nextProps.detail
    )
    var valve = getDataSeries(
      nextProps.valve,
      nextProps.from,
      nextProps.to,
      nextProps.detail
    )
        

    var series = {
      tempRange: tempRange,
      temp:      temp,
      tempSet:   tempSet,
      tempAct:   tempAct,
      valve:     valve,
      detail:    nextProps.detail
    }
        console.log(series)
    return series
    
	}

	render() {
		return ( 
		  <HighchartsChart time={{useUTC: false}} className="chart" id="chartComponent" >
        <Chart />

        <Title>Room Temperature</Title>

        <Tooltip 
          distance={30}
          padding={5}
          backgroundColor='rgba(0,0,0,0.05)'
          lineWidth={0}
          shared={true}
        />

        <Legend>
          <Legend.Title>Legend</Legend.Title>
        </Legend>

        <XAxis
          type="datetime"
          crosshair={{enabled: true}}
        >
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>
        <YAxis
          id="valveOpening" 
          min={0}
          max={100}
          opposite
        >
          <YAxis.Title>Valve Opening Time (%)</YAxis.Title>
          <ColumnSeries
            id="valve"
            name="Valve State"
            data={this.state.valve}
          	step
            marker={{enabled: false}}
            color='rgba(124, 181, 236, 0.2)'
          />
        </YAxis>
        <YAxis id="temperature">
          <YAxis.Title>Temperature (°C)</YAxis.Title>
          {
            this.state.detail != "highest" && 
            <AreaSplineRangeSeries
              id="tempRange"
              name="External Temperature Range"
              data={this.state.tempRange}
              step
              marker={{enabled: false}}
              color='#f7a35c'
              lineWidth={0}
              fillOpacity={0.2}
            />
          }

          <SplineSeries
            id="temp"
            name= {this.state.detail != "highest" ? "External Temperature Average" : "External Temperature"}
            data= {this.state.temp}
            step
            marker= {{enabled: false}}
            color='#f7a35c'
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
        </YAxis>
      </HighchartsChart>
    )
	}
}

ChartComponentContainer = withHighcharts(ChartComponent, Highcharts)

export default HighChartsContainer = withTracker((props) => {
  
  var subs = Meteor.subscribe('charts', {name: ['temp', 'tempSet', 'tempAct', 'valve']})

  return {
    temp: Charts.find({name: 'temp', year: {$gte: new Date(props.from).getFullYear(), $lte: new Date(props.to).getFullYear() }}, {sort: {year: 1}}).fetch(),
    tempSet: Charts.find({name: 'tempSet', year: {$gte: new Date(props.from).getFullYear(), $lte: new Date(props.to).getFullYear() }}, {sort: {year: 1}}).fetch(),
    tempAct: Charts.find({name: 'tempAct', year: {$gte: new Date(props.from).getFullYear(), $lte: new Date(props.to).getFullYear() }}, {sort: {year: 1}}).fetch(),
    valve: Charts.find({name: 'valve', year: {$gte: new Date(props.from).getFullYear(), $lte: new Date(props.to).getFullYear() }}, {sort: {year: 1}}).fetch()
  }
})(ChartComponentContainer)

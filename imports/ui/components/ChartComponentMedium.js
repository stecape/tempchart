import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Mongo } from 'meteor/mongo'
import { Charts } from '../../api/Charts'
import { getMediumDetailSeries, getMediumDetailRange } from '../../api/dataTools'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts)
import { HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Tooltip, Legend, LineSeries, SplineSeries, AreaSplineRangeSeries, ColumnSeries } from 'react-jsx-highcharts'
import "../styles/Chart.css"

class ChartComponentMedium extends Component {

	constructor(props){
		super(props)

		this.state = {
      tempRange: [],
      temp:      [],
      tempSet:   [],
      tempAct:   [],
      valve: 	   []
		}
	}

	static getDerivedStateFromProps(nextProps, prevState){

    var tempRange = getMediumDetailRange(
      nextProps.temp,
      nextProps.gte,
      nextProps.lte
    )
    var temp = getMediumDetailSeries(
      nextProps.temp,
      nextProps.gte,
      nextProps.lte
    )
    var tempSet = getMediumDetailSeries(
      nextProps.tempSet,
      nextProps.gte,
      nextProps.lte
    )
    var tempAct = getMediumDetailSeries(
      nextProps.tempAct,
      nextProps.gte,
      nextProps.lte
    )
    var valve = getMediumDetailSeries(
      nextProps.valve,
      nextProps.gte,
      nextProps.lte
    )
        

    var series = {
      tempRange: tempRange,
      temp:      temp,
      tempSet:   tempSet,
      tempAct:   tempAct,
      valve:     valve
    }
		
    return series
	}

	render() {
    return ( 
      <HighchartsChart time={{useUTC: false}} className="chart" id="chartComponent" >
        {this.props.children}
        <Chart />

        <Title>Room Temperature</Title>

        <Tooltip 
          distance={30}
          padding={5}
          backgroundColor='rgba(247,247,247,0)'
          lineWidth={0}
          shared={true}
        />

        <Legend>
          <Legend.Title>Legend</Legend.Title>
        </Legend>

        <XAxis type="datetime" crosshair={{enabled: true}}>
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>
        <YAxis id="valveOpening" opposite>
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

          <SplineSeries
            id="temp"
            name="External Temperature Average"
            data={this.state.temp}
            step
            marker={{enabled: false}}
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

ChartComponentContainer = withHighcharts(ChartComponentMedium, Highcharts)

export default HighChartsContainer = withTracker((props) => {

  if ( props.selectedOption == "Period" ) {
    var gte = props.gte
    var lte  = props.lte
  } else {
    var gte = new Date(props.now.getTime() - ( props.width * props.unit * 1000 ))
    var lte  = props.now
  }

  var subs = Meteor.subscribe('charts', {name: ['temp', 'tempSet', 'tempAct', 'valve']})

  return {
    temp: Charts.find({name: 'temp', year: {$gte: gte.getFullYear(), $lte: lte.getFullYear() }}, {sort: {year: 1}}).fetch(),
    tempSet: Charts.find({name: 'tempSet', year: {$gte: gte.getFullYear(), $lte: lte.getFullYear() }}, {sort: {year: 1}}).fetch(),
    tempAct: Charts.find({name: 'tempAct', year: {$gte: gte.getFullYear(), $lte: lte.getFullYear() }}, {sort: {year: 1}}).fetch(),
    valve: Charts.find({name: 'valve', year: {$gte: gte.getFullYear(), $lte: lte.getFullYear() }}, {sort: {year: 1}}).fetch(),
    gte: gte,
    lte: lte
  }
})(ChartComponentContainer)

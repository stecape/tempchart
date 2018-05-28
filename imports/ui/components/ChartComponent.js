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

/*  when new props will be received, you will have:

nextProps.temp = [{
  _id: askjdkasnd23321,
  name: temp,
  year: 2017,
  data: [
    [2131453465, 23,1],
    [2131453466, 24,1],
    [2131453467, 26,1],
    [2131453468, 27,1],
    [2131453469, 29,1],
  ]
},
{
  _id: askjdkasnd23321,
  name: temp,
  year: 2018,
  data: [
    [2131454465, 30,1],
    [2131454466, 31,1],
    [2131454467, 32,1],
    [2131454468, 33,1],
    [2131454469, 34,1],
  ]
}
]

through the reduce you will retrieve an array like this:
  [
    [2131453465, 23,1],
    [2131453466, 24,1],
    [2131453467, 26,1],
    [2131453468, 27,1],
    [2131453469, 29,1],
    [2131454465, 30,1],
    [2131454466, 31,1],
    [2131454467, 32,1],
    [2131454468, 33,1],
    [2131454469, 34,1]
  ]

then you filter it using the boundaries that are provided through props
and you sort it by timestamp for optimize the performance of HighCharts

*/
    var temp = nextProps.temp
    .reduce((acc,t) => {
        return acc.concat(t.data)
      }, [] )
    .filter(t => {
        var gte = new Date(nextProps.gte)
        var lte = new Date(nextProps.lte)
        var comp = (gte.getTime() <= t[0]) && (t[0] <= lte.getTime())
        return comp
      })
    .sort((a, b) => {
        return a[0] - b[0]
      })
    
    var tempSet = nextProps.tempSet
    .reduce((acc,t) => {
        return acc.concat(t.data)
      }, [] )
    .filter(t => {
        var gte = new Date(nextProps.gte)
        var lte = new Date(nextProps.lte)
        var comp = (gte.getTime() <= t[0]) && (t[0] <= lte.getTime())
        return comp
      })
    .sort((a, b) => {
        return a[0] - b[0]
      })
    
    var tempAct = nextProps.tempAct
    .reduce((acc,t) => {
        return acc.concat(t.data)
      }, [] )
    .filter(t => {
        var gte = new Date(nextProps.gte)
        var lte = new Date(nextProps.lte)
        var comp = (gte.getTime() <= t[0]) && (t[0] <= lte.getTime())
        return comp
      })
    .sort((a, b) => {
        return a[0] - b[0]
      })
    
    var valve = nextProps.valve
    .reduce((acc,t) => {
        return acc.concat(t.data)
      }, [] )
    .filter(t => {
        var gte = new Date(nextProps.gte)
        var lte = new Date(nextProps.lte)
        var comp = (gte.getTime() <= t[0]) && (t[0] <= lte.getTime())
        return comp
      })
    .sort((a, b) => {
        return a[0] - b[0]
      })
    

    // then you return an object that will be used for update the state
    var series = {
      temp: temp,
      tempSet: tempSet,
      tempAct: tempAct,
      valve: valve
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

  //defining subscription boundaries: gte = greater then or equal to, lte = lower then or equal to.
  //if you are in "Period" mode, you need static boundaries, so they will be exactly as the props.
  //else, you will need dinamic boundaries, so you will create a time span based on props.now and props.width.
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

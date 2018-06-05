import React, { Component } from 'react'
import { Mongo } from 'meteor/mongo'
import ChartComponentHigh from '../components/ChartComponentHigh'
import ChartComponentMedium from '../components/ChartComponentMedium'
import ChartComponentLow from '../components/ChartComponentLow'
import SelectionForm from '../components/SelectionForm'


export default class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gte: new Date(new Date().setDate(new Date().getDate()-1)),
      lte: new Date(),
      selectedOption: 'last24Hours',
      width: 1,
      unit: 60,
      now: new Date(),
      detail: "high"
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
  	//a timer update the actual moment time each 500ms. This is the timebase of the real time charting.
  	this.timer = setInterval(() => this.setState({now: new Date()}), 500)
  }

  componentWillUnmount(){
	  clearInterval(this.timer)
  }

  getDetail(interval){
		return interval < 173000000 ? "high" : interval < 5357000000 ? "medium" : "low"
  }

  handleChange(event) {
  	var value = event.target.value
    switch(value) {
	    case 'lastYear':
		    this.setState({
		      width: 1,
		      unit: 60*60*24*365,
		    	selectedOption: value,
		    	detail: this.getDetail(60*60*24*365*1 * 1000)
		    })
	    	break
	    case 'last6Months':
		    this.setState({
		      width: 6,
		      unit: 60*60*24*30,
		    	selectedOption: value,
		    	detail: this.getDetail(60*60*24*30*6 * 1000)
		    })
	    	break
	    case 'lastMonth':
		    this.setState({
		      width: 1,
		      unit: 60*60*24*30,
		    	selectedOption: value,
		    	detail: this.getDetail(60*60*24*30*1 * 1000)
		    })
	    	break
	    case 'lastWeek':
		    this.setState({
		      width: 1,
		      unit: 60*60*24*7,
		    	selectedOption: value,
		    	detail: this.getDetail(60*60*24*7 * 1000)
		    })
	    	break
	    case 'last24Hours':
		    this.setState({
		      width: 1,
		      unit: 60*60*24,
		    	selectedOption: value,
		    	detail: this.getDetail(60*60*24 * 1000)
		    })
	    	break
	    case 'Span':
		    this.setState({
		    	selectedOption: value
		    })
	   		break
	    case 'Period':
		    this.setState({
		    	selectedOption: value
		    })
	   		break
	  }

    if ( this.state.selectedOption == 'Span' && event.target.name == 'width' ) {
    	console.log(event.target.value, this.state.unit)
	    this.setState({
	      width: event.target.value,
	    	detail: this.getDetail(event.target.value * this.state.unit * 1000)
	    })
	  }
    if ( this.state.selectedOption == 'Span' && event.target.name == 'unit' ) {
    	console.log(event.target.value, this.state.width)
	    this.setState({
	      unit: event.target.value,
	    	detail: this.getDetail(event.target.value * this.state.width * 1000)
	    })
	  }
    if ( this.state.selectedOption == 'Period' && event.target.name == 'from' ) {
	    this.setState({
	      gte: new Date(event.target.value),
	    	detail: this.getDetail(new Date(this.state.lte).getTime() - new Date(event.target.value).getTime())
	    })
	  }
    if ( this.state.selectedOption == 'Period' && event.target.name == 'to' ) {
	    this.setState({
	      lte: new Date(event.target.value),
	    	detail: this.getDetail(new Date(event.target.value).getTime() - new Date(this.state.gte).getTime())
	    })
	  }
  }

	//not used
  handleSubmit(event) {
    event.preventDefault()
  }

  renderChart(detail) {
  	switch(detail) {
			case "high":
				return (
					<ChartComponentHigh
						gte={this.state.gte} 
						lte={this.state.lte}
						selectedOption={this.state.selectedOption}
						width={this.state.width}
						unit={this.state.unit}
						now={this.state.now}
					/>
				)
			case "medium":
				return (
					<ChartComponentMedium
						gte={this.state.gte} 
						lte={this.state.lte}
						selectedOption={this.state.selectedOption}
						width={this.state.width}
						unit={this.state.unit}
						now={this.state.now}
					/>
				)
			case "low":
				return (
					<ChartComponentLow
						gte={this.state.gte} 
						lte={this.state.lte}
						selectedOption={this.state.selectedOption}
						width={this.state.width}
						unit={this.state.unit}
						now={this.state.now}
					/>
				)
		}
  }

  //as children of the chart there are some configuration controls.
  //There are some real time trending options (last Year...Last 24 Hours and the more flexible Span)
  //And an historical option (Period) that allows the user to select the period to scope.
	render() {
		return ( 
			<div>
				{this.renderChart(this.state.detail)}
				<SelectionForm 
					gte={this.state.gte} 
					lte={this.state.lte}
					selectedOption={this.state.selectedOption}
					width={this.state.width}
					unit={this.state.unit}
					now={this.state.now}
					handleChange={this.handleChange}
				/>
			</div>
		)
	}
}
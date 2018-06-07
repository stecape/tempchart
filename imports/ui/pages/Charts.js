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
    }
  }

  componentDidMount() {
  	//a timer update the actual moment time each 500ms. This is the timebase of the real time charting.
  	this.timer = setInterval(() => this.setState({now: new Date()}), 500)
  }

  componentWillUnmount(){
	  clearInterval(this.timer)
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
					changeEvent={(st) => this.setState(st)}
				/>
			</div>
		)
	}
}
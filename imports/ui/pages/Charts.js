import React, { Component } from 'react'
import { Mongo } from 'meteor/mongo'
import ChartComponent from '../components/ChartComponent'
import TimeSelectionForm from '../components/TimeSelectionForm'
import DetailSelectionForm from '../components/DetailSelectionForm'
import "../styles/Charts.css"

export default class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      from: new Date(new Date().setDate(new Date().getDate()-1)).getTime(),
      to: new Date().getTime(),
      detail: "highest"
    }
  }

  //as children of the chart there are some configuration controls.
  //There are some real time trending options (last Year...Last 24 Hours and the more flexible Span)
  //And an historical option (Period) that allows the user to select the period to scope.
	render() {
		return ( 
			<div>
				<ChartComponent
					from={this.state.from} 
					to={this.state.to}
					detail={this.state.detail}
				/>
				<div className="flex-container">
					<div className="item">
						<TimeSelectionForm
							changeEvent={(st) => this.setState(st)}
						/>
					</div>
					<div className="item">
						<DetailSelectionForm
							changeEvent={(st) => this.setState(st)}
							detail={this.state.detail}
						/>
					</div>
				</div>
			</div>
		)
	}
}
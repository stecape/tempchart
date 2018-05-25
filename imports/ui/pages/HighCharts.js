import React, { Component } from 'react'
import { Mongo } from 'meteor/mongo'
import { Temperature } from '../../api/Temperature'
import ChartComponent from '../components/ChartComponent'

export default class HighCharts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: 'last24Hours',
      gte: new Date(new Date().setDate(new Date().getDate()-1)),
      lt: new Date()
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
  	var value = event.target.value
    value == 'lastYear' &&
    this.setState({
      gte: new Date(new Date().setDate(new Date().getDate()-365)),
      lt: new Date(),
    	selectedOption: value
    })
    value == 'last6Months' &&
    this.setState({
      gte: new Date(new Date().setDate(new Date().getDate()-182)),
      lt: new Date(),
    	selectedOption: value
    })
    value == 'lastMonth' &&
    this.setState({
      gte: new Date(new Date().setDate(new Date().getDate()-30)),
      lt: new Date(),
    	selectedOption: value
    })
    value == 'lastWeek' &&
    this.setState({
      gte: new Date(new Date().setDate(new Date().getDate()-7)),
      lt: new Date(),
    	selectedOption: value
    })
    value == 'last24Hours' &&
    this.setState({
      gte: new Date(new Date().setDate(new Date().getDate()-1)),
      lt: new Date(),
    	selectedOption: value
    })
    value == 'Period' &&
    this.setState({
    	selectedOption: value
    })
    this.state.selectedOption == 'Period' &&
    event.target.name == 'from' &&
    this.setState({
      gte: new Date(event.target.value)
    })
    this.state.selectedOption == 'Period' &&
    event.target.name == 'to' &&
    this.setState({
      lt: new Date(event.target.value)
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

	render() {
		return ( 
			<ChartComponent gte={this.state.gte} lt={this.state.lt}>
			  <form>
			    <div>
			      <label>
			        <input type="radio" value="lastYear" 
								checked={this.state.selectedOption === 'lastYear'} 
								onChange={this.handleChange} />
								Last Year
			      </label>
			    </div>
			    <div>
			      <label>
			        <input type="radio" value="last6Months" 
								checked={this.state.selectedOption === 'last6Months'} 
								onChange={this.handleChange} />
								Last 6 Months
			      </label>
			    </div>
			    <div>
			      <label>
			        <input type="radio" value="lastMonth" 
								checked={this.state.selectedOption === 'lastMonth'} 
								onChange={this.handleChange} />
								Last Month
			      </label>
			    </div>
			    <div>
			      <label>
			        <input type="radio" value="lastWeek" 
								checked={this.state.selectedOption === 'lastWeek'} 
								onChange={this.handleChange} />
								Last Week
			      </label>
			    </div>
			    <div>
			      <label>
			        <input type="radio" value="last24Hours" 
								checked={this.state.selectedOption === 'last24Hours'} 
								onChange={this.handleChange} />
								Last 24 Hours
			      </label>
			    </div>
			    <div>
			      <label>
			        <input type="radio" value="Period" 
								checked={this.state.selectedOption === 'Period'} 
								onChange={this.handleChange} />
								Enter Period
			      </label>
			    </div>
			    <div>
			      <label>
							From
			        <input
			        	name="from" type="datetime-local"
			        	value={this.state.gte.toISOString().substr(0,this.state.lt.toISOString().length-1)}
								onChange={this.handleChange}
							/>
			      </label>
			    </div>
			    <div>
			      <label>
							To
			        <input 
			        	name="to" type="datetime-local"
			        	value={this.state.lt.toISOString().substr(0,this.state.lt.toISOString().length-1)}
								onChange={this.handleChange}
							/>
			      </label>
			    </div>
			  </form>
			</ChartComponent>
		)
	}
}
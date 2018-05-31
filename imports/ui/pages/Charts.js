import React, { Component } from 'react'
import { Mongo } from 'meteor/mongo'
import ChartComponent from '../components/ChartComponent'

export default class Charts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gte: new Date(new Date().setDate(new Date().getDate()-1)),
      lte: new Date(),
      selectedOption: 'last24Hours',
      width: 1,
      unit: 60,
      now: new Date()
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

  handleChange(event) {
  	var value = event.target.value
    switch(value) {
	    case 'lastYear':
		    this.setState({
		      width: 1,
		      unit: 60*60*24*365,
		    	selectedOption: value
		    })
	    	break
	    case 'last6Months':
		    this.setState({
		      width: 6,
		      unit: 60*60*24*30,
		    	selectedOption: value
		    })
	    	break
	    case 'lastMonth':
		    this.setState({
		      width: 1,
		      unit: 60*60*24*30,
		    	selectedOption: value
		    })
	    	break
	    case 'lastWeek':
		    this.setState({
		      width: 1,
		      unit: 60*60*24*7,
		    	selectedOption: value
		    })
	    	break
	    case 'last24Hours':
		    this.setState({
		      width: 1,
		      unit: 60*60*24,
		    	selectedOption: value
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
	    this.setState({
	      width: event.target.value
	    })
	  }
    if ( this.state.selectedOption == 'Span' && event.target.name == 'unit' ) {
	    this.setState({
	      unit: event.target.value
	    })
	  }
    if ( this.state.selectedOption == 'Period' && event.target.name == 'from' ) {
	    this.setState({
	      gte: new Date(event.target.value)
	    })
	  }
    if ( this.state.selectedOption == 'Period' && event.target.name == 'to' ) {
	    this.setState({
	      lte: new Date(event.target.value)
	    })
	  }
  }

	//not used
  handleSubmit(event) {
    event.preventDefault()
  }

  //as children of the chart there are some configuration controls.
  //There are some real time trending options (last Year...Last 24 Hours and the more flexible Span)
  //And an historical option (Period) that allows the user to select the period to scope.
	render() {
		return ( 
			<ChartComponent 
				gte={this.state.gte} 
				lte={this.state.lte}
				selectedOption={this.state.selectedOption}
				width={this.state.width}
				unit={this.state.unit}
				now={this.state.now}
			>
			  <form onSubmit={this.handleSubmit}>
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
			        <input type="radio" value="Span" 
								checked={this.state.selectedOption === 'Span'} 
								onChange={this.handleChange} />
								Enter Span
			      </label>
			    </div>
			    {
			    	this.state.selectedOption == "Span" &&
			    	<div>
				  		<div>
	  			      <label>
	  							Width
	  			        <input
	  			        	name="width" type="number"
	  			        	value={this.state.width}
	  								onChange={this.handleChange}
	  							/>
	  			      </label>
	  			    </div>
	  			    <div>
	  			      <label>
	  							Unit
	  			        <select
	  			        	name="unit"
	  			        	value={this.state.unit}
	  								onChange={this.handleChange}
	  							>
	  								<option value={1}>Seconds</option>
	  								<option value={60*1}>Minutes</option>
	  								<option value={60*60}>Hours</option>
	  								<option value={60*60*24}>Days</option>
	  								<option value={60*60*24*7}>Weeks</option>
	  								<option value={60*60*24*30}>Months</option>
	  								<option value={60*60*24*365}>Years</option>
	  							</select>
	  			      </label>
	  					</div>
	  				</div>
  			  }
			    <div>
			      <label>
			        <input type="radio" value="Period" 
								checked={this.state.selectedOption === 'Period'} 
								onChange={this.handleChange} />
								Enter Period
			      </label>
			    </div>
			    {
			    	this.state.selectedOption == "Period" &&
			    	<div>
					    <div>
					      <label>
									From
					        <input
					        	name="from" type="datetime-local"
					        	value={this.state.gte.toISOString().substr(0,this.state.gte.toISOString().length-1)}
										onChange={this.handleChange}
									/>
					      </label>
					    </div>
					    <div>
					      <label>
									To
					        <input 
					        	name="to" type="datetime-local"
					        	value={this.state.lte.toISOString().substr(0,this.state.lte.toISOString().length-1)}
										onChange={this.handleChange}
									/>
					      </label>
					    </div>
					  </div>
					}
			  </form>
			</ChartComponent>
		)
	}
}
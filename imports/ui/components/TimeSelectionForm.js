import React, { Component } from 'react'

export default class TimeSelectionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      from: new Date(new Date().setDate(new Date().getDate()-1)),
      to: new Date(),
      width: 1,
	    unit: 60*60*24,
      selectedOption: 'last24Hours'
    }
  }

  componentDidMount() {
  	//a timer update the actual moment time each 500ms. This is the timebase of the real time charting.
  	this.timer = setInterval(() => {
  		if (this.state.selectedOption != "Period") {
	  		var to = new Date().getTime()
	  		var from = to - this.state.width*this.state.unit*1000
  			this.props.changeEvent({
					from: from, 
					to: to
	  		}) 
  		} else {
	  		this.props.changeEvent({
					from: this.state.from, 
					to: this.state.to
	  		})
	  	}
  	}
  	, 500)
  }

  componentWillUnmount(){
	  clearInterval(this.timer)
  }

  render () {

		this.handleChange = (props, event) => {
			var value = event.target.value
		  switch(value) {
		    case 'lastYear':
			    return({
			      width: 1,
			      unit: 60*60*24*365,
			    	selectedOption: value
			    })
		    	break
		    case 'last6Months':
			    return({
			      width: 6,
			      unit: 60*60*24*30,
			    	selectedOption: value
			    })
		    	break
		    case 'lastMonth':
			    return({
			      width: 1,
			      unit: 60*60*24*30,
			    	selectedOption: value
			    })
		    	break
		    case 'lastWeek':
			    return({
			      width: 1,
			      unit: 60*60*24*7,
			    	selectedOption: value
			    })
		    	break
		    case 'last24Hours':
			    return({
			      width: 1,
			      unit: 60*60*24,
			    	selectedOption: value
			    })
		    	break
		    case 'Span':
			    return({
			    	selectedOption: value
			    })
		   		break
		    case 'Period':
			    return({
			    	selectedOption: value
			    })
		   		break
		  }

		  if ( props.selectedOption == 'Span' && event.target.name == 'width' ) {
		  	return({
		      width: event.target.value,
		    })
		  }
		  if ( props.selectedOption == 'Span' && event.target.name == 'unit' ) {
		  	return({
		      unit: event.target.value,
		    })
		  }
		  if ( props.selectedOption == 'Period' && event.target.name == 'from' ) {
		    return({
		      from: new Date(event.target.value),
		    })
		  }
		  if ( props.selectedOption == 'Period' && event.target.name == 'to' ) {
		    return({
		      to: new Date(event.target.value),
		    })
		  }
		}


		this.handleSubmit = (event) => {
		  event.preventDefault()
		}

		this.Items = (props) => {
			return (
				<form onSubmit={this.handleSubmit}>
				  <div>
				    <label>
				      <input type="radio" value="lastYear" 
								checked={props.selectedOption === 'lastYear'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Last Year
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="last6Months" 
								checked={props.selectedOption === 'last6Months'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Last 6 Months
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="lastMonth" 
								checked={props.selectedOption === 'lastMonth'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Last Month
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="lastWeek" 
								checked={props.selectedOption === 'lastWeek'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Last Week
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="last24Hours" 
								checked={props.selectedOption === 'last24Hours'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Last 24 Hours
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="Span" 
								checked={props.selectedOption === 'Span'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Enter Span
				    </label>
				  </div>
				  {
				  	props.selectedOption == "Span" &&
				  	<div>
				  		<div>
					      <label>
									Width
					        <input
					        	name="width" type="number"
					        	value={props.width}
										onChange={(e) => props.changeEvent(this.handleChange(props, e))}
									/>
					      </label>
					    </div>
					    <div>
					      <label>
									Unit
					        <select
					        	name="unit"
					        	value={props.unit}
										onChange={(e) => props.changeEvent(this.handleChange(props, e))}
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
								checked={props.selectedOption === 'Period'} 
								onChange={(e) => props.changeEvent(this.handleChange(props, e))} />
								Enter Period
				    </label>
				  </div>
				  {
				  	props.selectedOption == "Period" &&
				  	<div>
					    <div>
					      <label>
									From
					        <input
					        	name="from" type="datetime-local"
					        	value={new Date(props.from.getTime() - (props.from.getTimezoneOffset() * 60000)).toISOString().substr(0,19)}
										onChange={(e) => props.changeEvent(this.handleChange(props, e))}
									/>
					      </label>
					    </div>
					    <div>
					      <label>
									To
					        <input 
					        	name="to" type="datetime-local"
					        	value={new Date(props.to.getTime() - (props.to.getTimezoneOffset() * 60000)).toISOString().substr(0,19)}
										onChange={(e) => props.changeEvent(this.handleChange(props, e))}
									/>
					      </label>
					    </div>
					  </div>
					}
				</form>
			)
		}

  	var args = {
			from: this.state.from,
			to: this.state.to,
			width: this.state.width,
			unit: this.state.unit,
			selectedOption: this.state.selectedOption,
			changeEvent: (st) => this.setState(st)  		
  	}

  	return (
  		<div>
  	 		<h5>{this.props.title}</h5>
	  		{this.Items(args)}
  		</div>
  	)
  }

}


TimeSelectionForm.defaultProps = {
	title: "Time Scaling"
}
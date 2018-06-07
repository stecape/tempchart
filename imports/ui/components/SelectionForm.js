import React, { Component } from 'react'

getDetail = (interval) => {
	return interval < 173000000 ? "high" : interval < 5357000000 ? "medium" : "low"
}

handleChange = (props, event) => {
	var value = event.target.value
  switch(value) {
    case 'lastYear':
	    return({
	      width: 1,
	      unit: 60*60*24*365,
	    	selectedOption: value,
	    	detail: this.getDetail(60*60*24*365*1 * 1000)
	    })
    	break
    case 'last6Months':
	    return({
	      width: 6,
	      unit: 60*60*24*30,
	    	selectedOption: value,
	    	detail: this.getDetail(60*60*24*30*6 * 1000)
	    })
    	break
    case 'lastMonth':
	    return({
	      width: 1,
	      unit: 60*60*24*30,
	    	selectedOption: value,
	    	detail: this.getDetail(60*60*24*30*1 * 1000)
	    })
    	break
    case 'lastWeek':
	    return({
	      width: 1,
	      unit: 60*60*24*7,
	    	selectedOption: value,
	    	detail: this.getDetail(60*60*24*7 * 1000)
	    })
    	break
    case 'last24Hours':
	    return({
	      width: 1,
	      unit: 60*60*24,
	    	selectedOption: value,
	    	detail: this.getDetail(60*60*24 * 1000)
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
  	console.log(event.target.value, props.unit)
    return({
      width: event.target.value,
    	detail: this.getDetail(event.target.value * props.unit * 1000)
    })
  }
  if ( props.selectedOption == 'Span' && event.target.name == 'unit' ) {
  	console.log(event.target.value, props.width)
    return({
      unit: event.target.value,
    	detail: this.getDetail(event.target.value * props.width * 1000)
    })
  }
  if ( props.selectedOption == 'Period' && event.target.name == 'from' ) {
    return({
      gte: new Date(event.target.value),
    	detail: this.getDetail(new Date(props.lte).getTime() - new Date(event.target.value).getTime())
    })
  }
  if ( props.selectedOption == 'Period' && event.target.name == 'to' ) {
    return({
      lte: new Date(event.target.value),
    	detail: this.getDetail(new Date(event.target.value).getTime() - new Date(props.gte).getTime())
    })
  }
}


handleSubmit = (event) => {
  event.preventDefault()
}

export default function SelectionForm (props) {
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
			        	value={props.gte.toISOString().substr(0,props.gte.toISOString().length-1)}
								onChange={(e) => props.changeEvent(this.handleChange(props, e))}
							/>
			      </label>
			    </div>
			    <div>
			      <label>
							To
			        <input 
			        	name="to" type="datetime-local"
			        	value={props.lte.toISOString().substr(0,props.lte.toISOString().length-1)}
								onChange={(e) => props.changeEvent(this.handleChange(props, e))}
							/>
			      </label>
			    </div>
			  </div>
			}
		</form>
	)
}
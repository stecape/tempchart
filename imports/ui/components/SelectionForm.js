import React, { Component } from 'react'

export default class SelectionForm extends Component {

	render () {
		return (
			<form onSubmit={this.handleSubmit}>
			  <div>
			    <label>
			      <input type="radio" value="lastYear" 
							checked={this.props.selectedOption === 'lastYear'} 
							onChange={this.props.handleChange} />
							Last Year
			    </label>
			  </div>
			  <div>
			    <label>
			      <input type="radio" value="last6Months" 
							checked={this.props.selectedOption === 'last6Months'} 
							onChange={this.props.handleChange} />
							Last 6 Months
			    </label>
			  </div>
			  <div>
			    <label>
			      <input type="radio" value="lastMonth" 
							checked={this.props.selectedOption === 'lastMonth'} 
							onChange={this.props.handleChange} />
							Last Month
			    </label>
			  </div>
			  <div>
			    <label>
			      <input type="radio" value="lastWeek" 
							checked={this.props.selectedOption === 'lastWeek'} 
							onChange={this.props.handleChange} />
							Last Week
			    </label>
			  </div>
			  <div>
			    <label>
			      <input type="radio" value="last24Hours" 
							checked={this.props.selectedOption === 'last24Hours'} 
							onChange={this.props.handleChange} />
							Last 24 Hours
			    </label>
			  </div>
			  <div>
			    <label>
			      <input type="radio" value="Span" 
							checked={this.props.selectedOption === 'Span'} 
							onChange={this.props.handleChange} />
							Enter Span
			    </label>
			  </div>
			  {
			  	this.props.selectedOption == "Span" &&
			  	<div>
			  		<div>
				      <label>
								Width
				        <input
				        	name="width" type="number"
				        	value={this.props.width}
									onChange={this.props.handleChange}
								/>
				      </label>
				    </div>
				    <div>
				      <label>
								Unit
				        <select
				        	name="unit"
				        	value={this.props.unit}
									onChange={this.props.handleChange}
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
							checked={this.props.selectedOption === 'Period'} 
							onChange={this.props.handleChange} />
							Enter Period
			    </label>
			  </div>
			  {
			  	this.props.selectedOption == "Period" &&
			  	<div>
				    <div>
				      <label>
								From
				        <input
				        	name="from" type="datetime-local"
				        	value={this.props.gte.toISOString().substr(0,this.props.gte.toISOString().length-1)}
									onChange={this.props.handleChange}
								/>
				      </label>
				    </div>
				    <div>
				      <label>
								To
				        <input 
				        	name="to" type="datetime-local"
				        	value={this.props.lte.toISOString().substr(0,this.props.lte.toISOString().length-1)}
									onChange={this.props.handleChange}
								/>
				      </label>
				    </div>
				  </div>
				}
			</form>
		)
	}
}
import React, { Component } from 'react'

export default class DetailSelectionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      detail: "highest"
    }
  }

	static getDerivedStateFromProps(nextProps, prevState){

		if (nextProps.detail != prevState.detail) {
			return {
				detail: nextProps.detail
			}
		}
		
		return null

	}

  render () {

		this.handleSubmit = (event) => {
		  event.preventDefault()
		}

		this.Items = (props) => {
			return (
				<form onSubmit={this.handleSubmit}>
				  <div>
				    <label>
				      <input type="radio" value="highest" 
								checked={props.detail === 'highest'} 
								onChange={(e) => props.changeEvent({detail: "highest"})} />
								Highest
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="minutely" 
								checked={props.detail === 'minutely'} 
								onChange={(e) => props.changeEvent({detail: "minutely"})} />
								Minutely
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="hourly" 
								checked={props.detail === 'hourly'} 
								onChange={(e) => props.changeEvent({detail: "hourly"})} />
								Hourly
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="daily" 
								checked={props.detail === 'daily'} 
								onChange={(e) => props.changeEvent({detail: "daily"})} />
								Daily
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="weekly" 
								checked={props.detail === 'weekly'} 
								onChange={(e) => props.changeEvent({detail: "weekly"})} />
								Weekly
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="monthly" 
								checked={props.detail === 'monthly'} 
								onChange={(e) => props.changeEvent({detail: "monthly"})} />
								Monthly
				    </label>
				  </div>
				  <div>
				    <label>
				      <input type="radio" value="yearly" 
								checked={props.detail === 'yearly'} 
								onChange={(e) => props.changeEvent({detail: "yearly"})} />
								Yearly
				    </label>
				  </div>
				</form>
			)
		}

		var args = {
			detail: this.state.detail,
			changeEvent: (st) => this.props.changeEvent(st)
		}

  	return (
  	 <div>
  	 	<h5>{this.props.title}</h5>
  	 	{this.Items(args)}
  	 </div>
  	)
  }

}

DetailSelectionForm.defaultProps = {
	title: "Data Detail Level"
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/Loading.css'
export default class Loading extends Component {

	constructor (props) {
		super (props)

		this.state = {
			text: props.text,
			interval: props.interval
		}
	}

	componentDidMount() {
		var stopper = this.props.text + '...'
		this.interval = window.setInterval( () => {
			if (this.state.text === stopper) {
				this.setState ({ text: this.props.text })
			} else {
				this.setState(function (prevState) {
					return {text: prevState.text + '.'}
				})
			}
		},this.props.interval) 
	}

	componentWillUnmount() {
		window.clearInterval(this.interval)
	}

	render () {
		return (
			<div className="page">
				<h1 className="label">
					{this.state.text}
				</h1>
			</div>
		)
	}
}

Loading.propTypes = {
	text: PropTypes.string.isRequired,
	interval: PropTypes.number.isRequired
}

Loading.defaultProps = {
	text: 'Loading',
	interval: 300
}
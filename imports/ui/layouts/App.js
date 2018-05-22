import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Chartist from '../pages/Chartist'
import Charts from '../pages/Charts'
import Echarts from '../pages/Echarts'
import HighCharts from '../pages/HighCharts'

export default class App extends Component {
	render() {
		return(
			<Router>
				<div>
				<Link to="/chartist">Chartist</Link>{' '}
				<Link to="/charts">Charts</Link>{' '}
				<Link to="/echarts">Echarts</Link>{' '}
				<Link to="/highcharts">Highcharts</Link>
				<Switch>
					<Route exact path="/" render = { () => { return "" } } />
					<Route path="/chartist" component={Chartist} />
					<Route path="/charts" component={Charts} />
					<Route path="/echarts" component={Echarts} />
					<Route path="/highcharts" component={HighCharts} />
					<Route render={() => {return <div>404 - Page not found</div>}} />
				</Switch>
				</div>
			</Router>
		)
	}
}
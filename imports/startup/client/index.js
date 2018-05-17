import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import App from '../../ui/layouts/App'

Meteor.startup(() => {
	render(
		(
			<BrowserRouter>
				<Route path="/" component={App}/>
			</BrowserRouter>
		),
		document.getElementById('app')
	)
})
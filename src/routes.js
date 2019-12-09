import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import Student from './components/Student';

const Routes = props => (
	<Router {...props}>
		<Route path='/' component={App} />
		<Route path='/about' component={About} />
		<Route path='/students' component={Student} />
		<Route path='*' component={NotFound} />
	</Router>
);

export default Routes;

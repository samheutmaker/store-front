import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Layout from './layout/Layout.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx'


var Store = React.createClass({
	render: function() {
		<Router history={hashHistory}>
			<Route path='/' component={Layout}>
				<Route path='/' component={Home} />
			</Route>
		</Router>
	}
});


render((
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
    	<Route path='/home' component={Home} />
    	<Route path='/about' component={About} />
    </Route>
  </Router>
), document.getElementById('app'))








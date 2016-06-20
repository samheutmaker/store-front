import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Layout from './layout/Layout.jsx';
import Home from './pages/home.jsx';
import About from './pages/about.jsx'
import Account from './pages/account.jsx'
import Checkout from './pages/checkout.jsx'
import Product from './pages/product.jsx'




render((
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
    	<Route path='/checkout' component={Checkout} />
    	<Route path='/home' component={Home} />
    	<Route path='/about' component={About} />
    	<Route path='/account' component={Account} />
    	<Route path='/product/:id' component={Product} />
    </Route>
  </Router>
), document.getElementById('app'))








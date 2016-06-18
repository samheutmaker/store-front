var $ = require('jquery');
window.jQuery = $;
window.$ = $;

import React from 'react';
import { Link } from 'react-router';
import Login from './Login.jsx'
import RequestMixin from './../mixins/requests.js';
import UtilityMixin from './../mixins/utility.js';


 export default React.createClass({
 	displayName: 'Layout',
	mixins: [RequestMixin, UtilityMixin],
	getInitialState: function() {
	    return {
	    	user: null,
	    	cart: [],
	    	products: [],
	    	productsHash: {},
	        loginOpen: false,

	    };
	},
	componentDidMount: function() {	
		this.loadAll();
	},
	loadAll: function (){
		var promiseHolder = [this.getUserInfo(), this.getUserCart(), this.getAllProducts()];

		Promise.all(promiseHolder)
		.then(() => {
			console.log('Complete');
		}, (err) => {
			console.log(err);
		});
	},
	getUserInfo: function() {
		return new Promise((resolve, reject) => {
			this.getUserInfoRequest()
			.then((data) => {
				this.setUserSession({user: data});
				resolve();
			})
			.catch((e) => {
				reject(e);
			})
		});
	},
	getUserCart: function () {
		return new Promise((resolve, reject) => {
			this.getUserCartRequest()
			.then((data) => {
				this.setState({
					cart: (data && data.length) ? data : []
				}, () => {
					resolve();
				});
			}).catch((e) => {
				reject(e);
			})
		});
	},
	getAllProducts: function() {
		return new Promise((resolve, reject) => {
			this.getAllProductsRequest()
			.then((data) => {
				if(data && data.length) {
					var hash = {};

					data.forEach((product, productIndex) => {
						hash[product._id] = product;
					});

					this.setState({
						products: (data && data.length) ? data : [],
						productsHash: hash
					}, () => {
						resolve();
					});	
				}
			}).catch((e) => {
				reject(e);
			})
		});
	},
	toggleLogin: function() {
		this.setState({
			loginOpen: !this.state.loginOpen
		});
	},
	setUserSession: function(userInfo) {
		if(userInfo.token) {
			localStorage.setItem('token', userInfo.token);	
		}

		if(userInfo.user) {
			this.setState({
				user: userInfo.user,
				loginOpen: false
			}, () => {});
		}
	},
	renderUserInfo: function() {
		if(this.state.user) {
			return (
				<div className="actions-container">
					Hello, {this.state.user.name.first} 
					&nbsp;&nbsp;|&nbsp;&nbsp;
					<Link to="account">
						Account
					</Link>
				</div>
			);
		} else {
			return (
				<div className="actions-container" onClick={this.toggleLogin}>
						Login
				</div>
			);
		}
	},
	render: function () {

		return (
			<div className="page-container">
				<nav>
					<ul className="nav-button-list">
						<li className="nav-button">
							<Link to="home">
								Home
							</Link>
						</li>
						<li className="nav-button">
							<Link to="about">
								About
							</Link>
						</li>
					</ul>
					{this.renderUserInfo()}
					<div style={(this.state.loginOpen) ? {} : {display: 'none'}}>
						<Login 
							page={this}
							afterAuthentication={this.setUserSession}
						/>		
					</div>
				</nav>
				{(this.props.children) ? React.cloneElement(this.props.children, {page: this}) : null}
			</div>
		);
	}
});

 
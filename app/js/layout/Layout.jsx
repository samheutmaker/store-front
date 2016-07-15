var $ = require('jquery');
window.jQuery = $;
window.$ = $;

import React from 'react';
import { Link } from 'react-router';
import { RouteTransition } from 'react-router-transition';
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
	    	userShipping: [],
	    	productsHash: {},
	    	stripeAccount: {},
	    	order: {
	    		card: null,
	    		address: null
	    	},
	        loginOpen: false,
	        scrollTop: 0

	    };
	},
	componentDidMount: function() {	
		this.loadAll();
		$(document).scroll(() => {
			if($(document).scrollTop() > 40 && $(document).scrollTop() < 80 ) {
				this.setState({scrollTop: $(document).scrollTop()});	
			}
		});
		

	},
	loadAll: function (){
		var promiseHolder = [this.getUserInfo(), this.getUserCart(), this.getAllProducts(), this.getAllUserShippingAddresses(), this.getStripeAccount()];

		Promise.all(promiseHolder)
		.then(() => {
			console.log('Complete');
			console.log(this.makeCartTotal());
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
			});
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
				}

				this.setState({
					products: (data && data.length) ? data : [],
					productsHash: (hash) ? hash : {}
				}, () => {
					resolve();
				});

			}).catch((e) => {
				reject(e);
			});
		});
	},
	getAllUserShippingAddresses: function(){
		return new Promise((resolve, reject) => {
			this.getAllUserShippingAddressesRequest()
			.then((data) => {
				this.setState({
					userShipping: (data && Array.isArray(data)) ? data : []
				}, () => {
					resolve();
				});	
			}).catch((e) => {
				reject(e);
			});
		});
	},
	getStripeAccount: function() {
		return new Promise((resolve, reject) => {
			this.getStripeAccountRequest()
			.then((data) => {

				if(data && data.sources) {
					var newOrder = this.state.order;
					
					data.sources.data.forEach((card, cardIndex) => {
						if(card.id == data.default_source) {
							newOrder.card = card		
						}
					});
					
					this.setState({
						stripeAccount: data,
						order: newOrder
					}, () => {
						resolve();
					});
				}
			});
		});
	},
	makeCartTotal: function() {
		if(this.state.cart && this.state.cart.length) {

			var cartTotal = this.state.cart
			.map((item, itemIndex) => {
				return item.item.cost * (item.quantity || 1);
			})
			.reduce((cur, next) => {
				return cur + next;
			}, 0);


			return cartTotal;
		}
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
		if(this.state.user && this.state.user.name) {
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
				<nav style={(this.state.scrollTop > 50) ? {position: 'fixed', backgroundColor: '#C1DCFF'} : {}}>
					<ul className="nav-button-list">
						<li className="nav-button">
							<Link to="home">
								Home
							</Link>
						</li>
						<li className="nav-button">
							<Link to="clothes">
								Clothes
							</Link>
						</li>
						<li className="nav-button">
							<Link to="about">
								About
							</Link>
						</li>
						<li className="nav-button">
							<Link to="checkout">
								Checkout
							</Link>
						</li>
						<li className="nav-button">
							<Link to="admin">
								Admin
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
				

				  <RouteTransition
				    pathname={this.props.location.pathname}
				    atEnter={{ opacity: 0 }}
				    atLeave={{ opacity: 0 }}
				    atActive={{ opacity: 1 }}
				  >
				    {(this.props.children) ? React.cloneElement(this.props.children, {page: this}) : null}
				  </RouteTransition>
				
			</div>
		);
	}
});

 
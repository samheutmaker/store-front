var $ = require('jquery');
window.jQuery = $;
window.$ = $;

import React from 'react';
import { Link } from 'react-router';
import Login from './Login.jsx'
import RequestMixin from './../mixins/requests.js';


 export default React.createClass({
 	displayName: 'Layout',
	mixins: [RequestMixin],
	getInitialState: function() {
	    return {
	    	user: null,
	        loginOpen: false,

	    };
	},
	componentDidMount: function() {
		this.getUserInfo()
		.then((res) => {
			this.setUserSession({user: res});
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
			}, () => {
				console.log(this.state.user);
			});
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
								Home
							</Link>
						</li>
						<li className="nav-button">
							<Link to="home">
								Home
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
				{React.cloneElement(this.props.children, {page: this})}
			</div>
		);
	}
});

 
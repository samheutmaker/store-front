import React from 'react';
import { Link } from 'react-router';
import Login from './Login.jsx'

var $ = require('jquery');
window.jQuery = $;
window.$ = $;

 export default React.createClass({
 	displayName: 'Layout',
	getInitialState: function() {
	    return {
	         loginOpen: false,

	    };
	},
	componentDidMount: function() {

	},
	toggleLogin: function() {
		this.setState({
			loginOpen: !this.state.loginOpen
		});
	},
	setUserSession: function(userInfo) {
		if(userInfo) {
			sessionStorage.setItem('token', userInfo.token);

			this.setState({
				user: userInfo.user
			}, () => {
				console.log(this.state.user);
			});
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
						<li className="nav-button" onClick={this.toggleLogin}>
							<Link to={''}>
								Login
							</Link>
						</li>
					</ul>
					<div style={(this.state.loginOpen) ? {} : {display: 'none'}}>
						<Login 
							page={this}
							afterAuthentication={this.setUserSession}
						/>		
					</div>
					
				</nav>
				{this.props.children}
			</div>
		);
	}
});

 
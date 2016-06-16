import React from 'react';
import RequestMixin from './../mixins/requests.js';

 export default React.createClass({
 	displayName: 'Login',
 	mixins: [RequestMixin],
 	propTypes: {
 		page: React.PropTypes.object.isRequired,
 		afterAuthentication: React.PropTypes.func.isRequired,
 	},
	getInitialState: function() {
	    return {
	    	email: null,
	    	password: null
	    };
	},
	authenticate: function() {
		var email = this.state.email;
		var password = this.state.password;

		if(email && password) {
			var loginData = {
				email: email,
				password: password
			};

			this.loginRequest(loginData)
			.then((res) => {
				if(res.token && res.user) {
					if(this.props.afterAuthentication && typeof this.props.afterAuthentication) {
						this.props.afterAuthentication(res);
					}
				}
			})
			.catch((err) => {
				console.log(err);
			});
		}
	},
	render: function () {
		return (
			<div className="login-container">
				<input onChange={(e) => {
					this.setState({
						email: e.target.value
					});
				}} /><br/>
				<input onChange={(e) => {
					this.setState({
						password: e.target.value
					});
				}} />
				<div onClick={this.authenticate}>Login</div>
			</div>
		);
	}
});

 
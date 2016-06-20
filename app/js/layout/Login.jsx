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
	    	login: {
	    		email: null,
	    		password: null
	    	},
	    	register: {
	    		email: null,
	    		password: null,
	    		secondPassword: null,
	    		firstName: null,
	    		lastName: null,
	    		gender: null
	    	}
	    };
	},
	authenticate: function() {
		var email = this.state.login.email;
		var password = this.state.login.password;

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
	registerNewUser: function(){

		var email = this.state.register.email;
		var password = this.state.register.password;
		var secondPassword = this.state.register.secondPassword;
		var name = this.state.register.name;
		var gender = this.state.register.gender;


		if(!(secondPassword == password) ) {
			return console.log('passwords do not match');
		} 

		var postData = {
			email: email,
			password: password,
			name: {
				first: this.state.register.firstName,
				last: this.state.register.lastName
			},
			gender: gender
		};

		this.registerNewUserRequest(postData)
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
	},
	updateUserLogin: function(e, prop) {
		if(prop && typeof prop == 'string') {
			var newLogin = this.state.login;
			newLogin[prop] = e.target.value;
			this.setState({
				login: newLogin
			}, () => {});
		}
	},
	renderLogin: function(){
		return (
			<div className="login-container">
				<input onChange={(e) => {
					this.updateUserLogin.bind(e, 'email');
				}} /><br/>
				<input onChange={(e) => {
					this.updateUserLogin.bind(e, 'password');
				}} />
				<div onClick={this.authenticate}>Login</div>
			</div>
		);
	},
	updateUserRequest: function(e, prop) {
		if(prop && typeof prop == 'string') {
			var newRegister = this.state.register;
			newRegister[prop] = e.target.value;
			this.setState({
				register: newRegister
			}, () => {});
		}
	},
	renderRegister: function() {
		return (
			<div className="login-container">
				<input onChange={(e) => {
					this.updateUserRequest(e, 'email');
				}} /><br/>
				<input onChange={(e) => {
					this.updateUserRequest(e, 'password');
				}} /><br/>
				<input onChange={(e) => {
					this.updateUserRequest(e, 'secondPassword');
				}} /><br/>
				<input onChange={(e) => {
					this.updateUserRequest(e, 'gender');
				}} /><br/>
				<input onChange={(e) => {
					this.updateUserRequest(e, 'firstName');
				}} /><br/>
				<input onChange={(e) => {
					this.updateUserRequest(e, 'lastName');
				}} /><br/>
				<div onClick={this.registerNewUser}>Register</div>
			</div>
		);
	},
	render: function () {
		return (
			<div>
				{this.renderRegister()}
			</div>
		);
	}
});

 
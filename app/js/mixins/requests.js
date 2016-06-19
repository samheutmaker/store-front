var $ = require('jquery');
window.jQuery = $;
window.$ = $;
$.ajaxPrefilter(function(options) {
	if (!options.beforeSend) {
		options.beforeSend = function(xhr) {
			xhr.setRequestHeader('token', localStorage.getItem('token') || null);
		}
	}
});
const Requests = {
	loginRequest: function(loginObj) {
		return new Promise((resolve, reject) => {
			if (loginObj && loginObj.email && loginObj.password) {
				var login = 'Basic ' + btoa(loginObj.email + ':' + loginObj.password);
				var url = BASE_URI + '/auth/login';
				$.ajax({
					type: 'GET',
					url: url,
					headers: {
						authorization: login
					},
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	getUserInfoRequest: function() {
		return new Promise((resolve, reject) => {
			if (localStorage.getItem('token')) {
				var url = BASE_URI + '/user/info';
				$.ajax({
					type: 'GET',
					url: url,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	getUserCartRequest: function() {
		return new Promise((resolve, reject) => {
			if (localStorage.getItem('token')) {
				var url = BASE_URI + '/user/cart';
				$.ajax({
					type: 'GET',
					url: url,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	getAllProductsRequest: function() {
		return new Promise((resolve, reject) => {
			var url = BASE_URI + '/products';
			$.ajax({
				type: 'GET',
				url: url,
				success: (res) => {
					resolve(res);
				},
				error: (err) => {
					reject(err);
				}
			});
		});
	},
	addItemToCartRequest: function(postData) {
		return new Promise((resolve, reject) => {
			if (postData.itemId && postData.size && localStorage.getItem('token')) {
				postData.quantity ? null : postData.quantity = 1;
				var url = BASE_URI + '/user/cart/add';
				$.ajax({
					type: 'POST',
					data: postData,
					url: url,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	removeItemFromCartRequest: function(postData) {
		return new Promise((resolve, reject) => {
			if (postData.itemId && postData.size && localStorage.getItem('token')) {
				var url = BASE_URI + '/user/cart/remove';
				$.ajax({
					type: 'POST',
					data: postData,
					url: url,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	getAllUserShippingAddressesRequest: function(){
		return new Promise((resolve, reject) => {
			if (localStorage.getItem('token')) {
				var url = BASE_URI + '/user/shipping/address/all';
				$.ajax({
					type: 'GET',
					url: url,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	createNewUserShippingAddressRequest: function(postData){
		return new Promise((resolve, reject) => {
			if (postData && localStorage.getItem('token')) {
				var url = BASE_URI + '/user/shipping/address/new';
				$.ajax({
					type: 'POST',
					url: url,
					data: postData,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	removeUserShippingAddressRequest: function(addressId){
		return new Promise((resolve, reject) => {
			if (addressId && localStorage.getItem('token')) {
				var url = BASE_URI + '/user/shipping/address/remove/' + addressId;
				$.ajax({
					type: 'POST',
					url: url,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
	updateUserShippingAddressRequest: function(postData) {
		return new Promise((resolve, reject) => {
			if (postData && localStorage.getItem('token')) {
				var url = BASE_URI + '/user/shipping/address/update';
				$.ajax({
					type: 'PUT',
					url: url,
					data: postData,
					success: (res) => {
						resolve(res);
					},
					error: (err) => {
						reject(err);
					}
				});
			} else {
				resolve('Missing Params');
			}
		});
	},
};
module.exports = exports = Requests;
var $ = require('jquery');
window.jQuery = $;
window.$ = $;

$.ajaxPrefilter(function( options ) {
    if ( !options.beforeSend) {
        options.beforeSend = function (xhr) { 
            xhr.setRequestHeader('token', localStorage.getItem('token') || null);
        }
    }
});



const Requests = {
	loginRequest: function(loginObj){
		return new Promise((resolve, reject) => {
			if(loginObj && loginObj.email && loginObj.password) {

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
			}
		});	
	},
	getUserInfo: function(){
		return new Promise((resolve, reject) => {
			if(localStorage.getItem('token')) {
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
				resolve();
			}
		});
	},
	getUserCart: function(){
		return new Promise((resolve, reject) => {
			if(localStorage.getItem('token')) {
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
				resolve();
			}
		});
	}
};

module.exports = exports = Requests;
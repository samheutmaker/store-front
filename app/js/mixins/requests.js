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
	}
};

module.exports = exports = Requests;
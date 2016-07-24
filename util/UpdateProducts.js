const pollForUpdatesRequest = require(__dirname + '/PollForProductUpDates');
const cron = require('node-cron');
const exec = require('child_process').exec;

module.exports = exports = () => {
	cron.schedule('* * * * *', function() {
		pollForUpdatesRequest()
			.then((products) => {
				console.log(products);
				console.warn('Products Updated');
				exec('gulp webpack:dev', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					console.log(`stdout: ${stdout}`);
					console.log(`stderr: ${stderr}`);
				});
			});
	});
}

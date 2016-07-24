const pollForUpdatesRequest = require(__dirname + '/PollForProductUpDates');
const cron = require('node-cron');
const exec = require('child_process').exec;

module.exports = exports = () => {
	cron.schedule('* * * * *', function() {
		pollForUpdatesRequest()
			.then((products) => {
				exec('gulp build:dev', (error, stdout, stderr) => {
					if (error) {
						console.error(`exec error: ${error}`);
						return;
					}
					console.log('Products Updated');
					console.log(`stdout: ${stdout}`);
					console.log(`stderr: ${stderr}`);
				});
			});
	});
}


module.exports = {
	apps: [
		{
			name: 'slackweather',
			script: 'bin/run.js',
			env_production: {
				NODE_ENV: 'production',
				SLACK_SERVER_URL: 'http://<IP_OF_IRIS_MAIN>:3000',
			},
		},
	],
	deploy: {
		production: {
			user: 'node',
			host: '<YOUR SERVER IP>',
			ref: 'origin/master',
			repo: 'https://github.com/rakitha737/slackweather.git',
			path: '/srv/production',
			'post-deploy':
        'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
		},
	},
}

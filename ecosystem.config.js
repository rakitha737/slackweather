module.exports = {
	apps: [
		{
			name: 'slackweather',
			script: 'bin/run.js',
			env_production: {
				NODE_ENV: 'production',
				SLACK_SERVER_URL: 'http://18.224.1.150:3000',
			},
		},
	],
	deploy: {
		production: {
			user: 'node',
			host: '3.16.123.163',
			ref: 'origin/master',
			repo: 'git@github.com:rakitha737/slackweather.git',
			path: '/srv/production',
			'post-deploy':
        'cp ../.env ./ && npm install && pm2 startOrRestart ecosystem.config.js --env production',
		},
	},
}

require('dotenv').config()

const bunyan = require('bunyan')

const serviceAccessToken= require('crypto').randomBytes(16).toString('hex').slice(0,32)

const log = {
	development: () => {
		return bunyan.createLogger({ name: 'Slackbot-Weather-development', level: 'debug' })
	},
	production: () => {
		return bunyan.createLogger({ name: 'Slackbot-Weather-production', level: 'info' })
	},
	test: () => {
		return bunyan.createLogger({ name: 'Slackbot-Weather-test', level: 'fatal' })
	},
}

module.exports = {
	geoLocationToken: process.env.GOOGLE_GEO_CODE_TOKEN,
	openWeatherToken: process.env.OPEN_WEATHER_TOKEN,
	slackBotApiToken: process.env.SLACK_API_TOKEN,
	serviceAccessToken: serviceAccessToken,
	log: (env) => {
		if (env) return log[env]()
		return log[process.env.NODE_ENV || 'development']()
	}
}

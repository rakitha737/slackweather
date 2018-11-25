'use strict'

const request = require('superagent')
const config = require('../config')
const service = require('../server/service')(config)
const http = require('http')
const log= config.log()

const server = http.createServer(service)
server.listen()
const serverURL = process.env.SLACK_SERVER_URL
	? process.env.SLACK_SERVER_URL
	: 'http://127.0.0.1:3000'
server.on('listening', function() {
	log.info(`Slack-Weather is listening on port ${server.address().port}`)

	const announce = () => {
		request
			.put(`${serverURL}/service/weather/${server.address().port}`)
			.set('X-SLACK-SERVICE-API-TOKEN', config.serviceAccessToken)
			.set('X-SLACK-BOT-API-TOKEN', config.slackBotApiToken)
			.end((err, res) => {
				if (err || !res) {
					log.debug(err)
					log.info('Error connecting to SlackBot Main')
				} else {
					log.info(res.body)
				}
			})
	}
	announce()
	setInterval(announce, 15 * 1000)
})

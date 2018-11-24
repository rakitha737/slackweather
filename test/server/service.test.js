'use strict'
//  "test": "set NODE_ENV=test eslint bin server && nyc mocha --recursive test",
require('should')
const config= require('../../config')
const request = require('supertest')
const service = require('../../server/service')(config)

describe('The express service', () => {
	describe('GET/ foo', () => {
		it('should return HTTP 404', done => {
			request(service)
				.get('/foo')
				.expect(404, done)
		})
	})
})

describe('GET /service/:location', () => {
	it('should return HTTP 200 with valid result', done => {
		request(service)
			.get('/service/Colombo')
			.set('X-SLACK-SERVICE-API-TOKEN', config.serviceAccessToken)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				res.body.result.should.exist
				return done()
			})
	})
	it('should return HTTP 403 if no valid token was passed', (done) => {
		request(service)
			.get('/service/Colombo')
			.set('X-SLACK-SERVICE-API-TOKEN', 'wrong token')
			.expect(403)
			.end(done)
	})
})

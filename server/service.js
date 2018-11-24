'use strict'

const express = require('express')
const request = require('superagent')
const moment = require('moment')
const numeral = require('numeral')
const service = express()

module.exports = (config) => {
  const log= config.log()
  service.get('/service/:location', (req, res) => {
    request.get(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      req.params.location +
      '&key=' +
      config.geoLocationToken,
      (err, response) => {
        if (err) {
          log.error(err)
          return res.sendStatus(500)
        }
        // res.json(response.body.results[0].geometry.location)

        const location = response.body.results[0].geometry.location
        // const timeStamp = +moment().format('X')

        request.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${
          location.lng
          }&units=Imperial&APPID=${config.openWeatherToken}`,
          (err, response) => {
            if (err) {
              log.error(err)
              return res.sendStatus(404)
            }
            const temp = numeral(response.body.main.temp).format('0')

            res.json({
              result: `${response.body.weather[0].description} at ${temp} \xB0F`,
            })
          }
        )
      }
    )
    //   res.json({ result: req.params.location })
  })
  return service
}
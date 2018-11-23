require('dotenv').config()

module.exports = {
  geoLocationToken: process.env.GOOGLE_GEO_CODE_TOKEN,
  openWeatherToken: process.env.OPEN_WEATHER_TOKEN,
}

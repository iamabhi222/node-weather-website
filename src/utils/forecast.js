const request = require('request')


const forecast = (longitude,latitude,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=84f91a2630cd7129405ff49e1e78e0f5&query=' + latitude + ',' + longitude
                           // (error, response) =>
  request({ url, json: true }, (error, { body } ) => {
    if(error) {
      callback('Unable to connect!',undefined)
   // else if (response.body.error)
    } else if (body.error) {
      callback('Unable to find Coordinate!',undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' Degress out. It feels like ' + body.current.feelslike + ' Degress out.')
    }
  })
}

module.exports = forecast

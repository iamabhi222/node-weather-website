const request = require('request')


const geoCode = (address,callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaWFtYWJoaTIyMiIsImEiOiJja2U4dTFhZmMwenNxMnFtaXFnODBzdXMwIn0.mR7aWcsWPL-QymEb4zwLzw&limit=1'

  request({ url, json: true }, (error, { body } ) => {
    if(error) {
      callback('Unable to connect!',undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location!',undefined)
    } else {
      callback(undefined,{
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}


module.exports = geoCode

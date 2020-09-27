require('dotenv').config();
const request = require('request');
const MAPBOX_API_TOKEN = process.env.MAPBOX_API_TOKEN || '';
const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_API_TOKEN}&limit=1`;
  
    request({url, json: true}, (error, {body})=>{
  
      if(error) {
        callback('Error - Unable to connect to location service!', undefined);
      } else if (body.features.length === 0) {
        callback('Error - Unable to find location. Try another service', undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitute: body.features[0].center[0],
          location: body.features[0].place_name
        })
      }
    });
  }

  module.exports = geocode;


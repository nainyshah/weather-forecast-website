const request = require("request");
const geoCode = (address, callback) => {
  const mapBoxBaseUrl = "https://api.mapbox.com/geocoding/v5/";
  const mapBoxUrl =
    "mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3llZHJhemExMiIsImEiOiJjazhpcnMxZWEwNDFpM2ZuNm9yMnVhbno5In0.A8bAQNdnkOz8lZbjT3LTgg";
  request(
    { baseUrl: mapBoxBaseUrl, url: mapBoxUrl, json: true },
    (error, response, body) => {
      if (error) {
        callback("Unable to connect to the MapBox Service..", undefined);
      } else {
        if (response && response.statusCode == 200) {
          if (response.body.features.length > 0) {
            const geoCode = {
              latitude: response.body.features[0].center[1],
              longitude: response.body.features[0].center[0],
              place: response.body.features[0].place_name
            };
            callback(undefined, geoCode);
          } else {
            callback("Unable to find location. Try another search.", undefined);
          }
        } else {
          callback(body.message, undefined);
        }
      }
    }
  );
};

module.exports = geoCode;

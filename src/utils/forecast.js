const request = require("request");

const forecast = (lon, lat, callback) => {
  const baseUrl = "http://api.openweathermap.org/data/2.5/";
  const url =
    "weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&APPID=ff3d6fce1ce3cfaf8e430935bcc2a8e2";
  request(
    { baseUrl: baseUrl, url: url, json: true },
    (error, response, body) => {
      //   console.log(error);
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else {
        if (response && response.statusCode == 200) {
          const forecast =
            "It is currently " +
            body.main.temp +
            " degree in [" +
            body.name +
            "], and weather is " +
            body.weather[0].description +
            ".";
          callback(undefined, forecast);
        } else {
          callback(body.message, undefined);
        }
      }
    }
  );
};

module.exports = forecast;

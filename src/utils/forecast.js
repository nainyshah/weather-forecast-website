const request = require("request");

const forecast = (lon, lat, callback) => {
  const baseUrl = "http://api.openweathermap.org/data/2.5/";
  const url =
    "weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&APPID=ff3d6fce1ce3cfaf8e430935bcc2a8e2";
  console.log(baseUrl + url);
  request(
    { baseUrl: baseUrl, url: url, json: true },
    (error, response, body) => {
      //   console.log(error);
      if (error) {
        callback("Unable to connect to weather service!", undefined);
      } else {
        if (response && response.statusCode == 200) {
          const forecast = {
            foreCast:
              body.weather[0].description +
              " throughout the day.It is currently " +
              body.main.temp +
              " degrees out. The higest today is " +
              body.main.temp_max +
              " with a lowest of " +
              body.main.temp_min +
              ".",
            imgSrc:
              "http://openweathermap.org/img/wn/" +
              body.weather[0].icon +
              "@2x.png"
          };

          callback(undefined, forecast);
        } else {
          callback(body.message, undefined);
        }
      }
    }
  );
};

module.exports = forecast;

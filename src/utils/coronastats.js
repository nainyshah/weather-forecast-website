const request = require("request");

const coronaStats = (countryName, callback) => {
  const baseUrl = "https://covid-193.p.rapidapi.com";
  const url = "/statistics?country=" + encodeURIComponent(countryName);
  const apiKey = "9b14e54f43msh25dc8c0677cb3b8p1f39c5jsn4dd2be92fb4a";
  const options = {
    method: "GET",
    url: baseUrl + url,
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": apiKey
    },
    json: true
  };
  request(options, (error, response, body) => {
    if (error) {
      callback("Unable to connect to corono statistics service!", undefined);
    } else {
      if (response && response.statusCode == 200) {
        console.log(body.response.length);
        if (body.response.length > 0) {
          const coronaStats = {
            country: body.response[0].country,
            cases: body.response[0].cases,
            deaths: body.response[0].deaths,
            day: body.response[0].day
          };

          callback(undefined, coronaStats);
        } else {
          callback("No Record Found!", undefined);
        }
      } else {
        callback(body.message, undefined);
      }
    }
  });
};

module.exports = coronaStats;

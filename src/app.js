const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const coronaStats = require("./utils/coronastats");

const app = express();
const port = process.env.PORT || 3000;
// Define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialViewsPath = path.join(__dirname, "../templates/partials");
// configuration for handlebars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialViewsPath);
// Setup static director
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    body: "This is all about weather forecast",
    footer: "Created by Syed Raza"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    body:
      "This site created by Syed Raza. It uses data from mapbox.com and openweathermap.org!",
    footer: "Created by Syed Raza"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    body: "Feel free to ask any question.",
    footer: "Created by Syed Raza"
  });
});
app.get("/coronastatistics", (req, res) => {
  res.render("coronastats", {
    title: "Corona Stats",
    body: "You can check Corona virus stats.",
    footer: "Created by Syed Raza"
  });
});
app.get("/corona", (req, res) => {
  // res.send(req.query.country);
  if (!req.query.country) {
    return res.send({
      error: "You must provide a country name."
    });
  }
  const country = req.query.country.replace(" ", "-");
  // res.send(country);
  coronaStats(country, (error, { country, cases, deaths, day } = {}) => {
    if (error) {
      return res.send({
        error
      });
    } else {
      res.send({
        country,
        cases,
        deaths,
        day
      });
    }
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }
  geoCode(req.query.address, (error, { longitude, latitude, place } = {}) => {
    if (error) {
      return res.send({
        error
      });
    } else {
      forecast(longitude, latitude, (error, { foreCast, imgSrc }) => {
        if (error) {
          return res.send({
            error
          });
        } else {
          res.send({
            forecast: foreCast,
            icon: imgSrc,
            place,
            address: req.query.address
          });
        }
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    footer: "Created by Syed Raza"
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});

console.log("Client side javascript is loaded!");

const getWeatherData = location => {
  locationC.textContent = "Loading weather for " + location + "......";
  forecastC.textContent = "";
  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      //   console.log(data);
      if (data.error) {
        console.log(data.error);
        locationC.textContent = data.error;
      } else {
        locationC.textContent = data.place;
        forecastC.textContent = data.forecast;
      }
    });
  });
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const locationC = document.querySelector("#locationC");
const forecastC = document.querySelector("#forecastC");
locationC.textContent = "";
forecastC.textContent = "";
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  getWeatherData(search.value);
});

weatherForm.addEventListener("reset", e => {
  e.preventDefault();
  search.value = "";
  locationC.textContent = "";
  forecastC.textContent = "";
});

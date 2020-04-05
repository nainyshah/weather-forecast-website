console.log("Client side coronajs is loaded!");

const getCoronaData = country => {
  coronaMsg.textContent = "Loading Corona status for " + country + "......";

  fetch("/corona?country=" + country).then(response => {
    response.json().then(data => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        coronaMsg.textContent = data.error;
      } else {
        coronaMsg.innerHTML =
          "<b>Country:</b> " +
          data.country.replace("-", " ") +
          "<br><b> Date : </b>" +
          data.day;
        cases.innerHTML =
          "<dl> <u><b>Total Cases :</b></u> " +
          data.cases.total +
          " </dl> " +
          "<dd><b> New Cases </b> : " +
          data.cases.new +
          "</dd> " +
          "<dd><b> Active Cases </b> : " +
          data.cases.active +
          "</dd> " +
          "<dd><b> critical Cases </b>: " +
          data.cases.critical +
          "</dd> " +
          "<dd><b> recovered Cases </b>: " +
          data.cases.recovered +
          "</dd> ";

        deaths.innerHTML =
          "<dl><u> <b>Total Deaths :</b></u> " +
          data.deaths.total +
          " </dl> " +
          "<dd><b> New  </b> : " +
          data.deaths.new +
          "</dd> ";
      }
    });
  });
};

const coronaForm = document.querySelector("form");
const search = document.querySelector("input");

const coronaMsg = document.querySelector("#coronaMsg");
const cases = document.querySelector("#cases");
const deaths = document.querySelector("#deaths");
coronaMsg.textContent = "";
cases.innerHTML = "";
deaths.innerHTML = "";
coronaForm.addEventListener("submit", e => {
  e.preventDefault();
  coronaMsg.textContent = "";
  cases.innerHTML = "";
  deaths.innerHTML = "";
  getCoronaData(search.value);
});

coronaForm.addEventListener("reset", e => {
  e.preventDefault();
  search.value = "";
  coronaMsg.textContent = "";
  cases.textContent = "";
  deaths.textContent = "";
});

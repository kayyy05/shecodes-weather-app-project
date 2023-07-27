let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let time = new Date().toLocaleTimeString("en-US", {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
});

let currentTime = `${day} ${time}`;

let currentDate = document.querySelector("#day-time");
currentDate.innerHTML = currentTime;

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city").value;
  let title = document.querySelector("h1");
  title.innerHTML = input;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=1e473372851a26d6162e6984afe7be2f`;

  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureHeading = `${temperature}°C`;
    let units = document.querySelector("#units");
    units.innerHTML = temperatureHeading;
  });
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", search);

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
  let input = document.querySelector("#search-city");
  let title = document.querySelector("h1");
  title.innerHTML = input;

  let apiKey = `1fae33afca1700740bab533a4ot300d8`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${input}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.temperature.current);
    temperature.innerHTML = document.querySelector("#units");
    let humidity = response.data.temperature.humidity;
    humidity.innerHTML = document.querySelector("#humidity");
    let wind = response.data.wind.speed;
    wind.innerHTML = document.querySelector("#wind");
  });
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", search);

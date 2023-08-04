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

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/03n@2x.png"
        alt="cloud"
        width="60"
      />
      <div class="forecast-temp">
        <span id="max-forecast-temp">16°C</span>
        <span id="min-forecast-temp">11°C</span>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "64469ac67e6dc941feb5b50915a18dc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let name = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let descriptionElement = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed * 3.6);
  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

  celsiusTemp = response.data.main.temp;

  icon.setAttribute("src", iconUrl);
  icon.setAttribute("alt", response.data.weather[0].description);
  document.querySelector("h1").innerHTML = name;
  document.querySelector("#temp-digits").innerHTML = temperature;
  document.querySelector("#condition").innerHTML = descriptionElement;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind}km/h`;

  getForecast(response.data.coord);
}

function search(input) {
  let apiKey = "1e473372851a26d6162e6984afe7be2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  search(cityInput.value);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperature = document.querySelector("#temp-digits");
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = document.querySelector("#temp-digits");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", search);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-unit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Lusaka");

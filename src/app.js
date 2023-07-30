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

  let apiKey = "1e473372851a26d6162e6984afe7be2f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(function (response) {
    let temperature = Math.round(response.data.main.temp);
    let descriptionElement = response.data.weather[0].description;
    let humidity = response.data.main.humidity;
    let wind = Math.round(response.data.wind.speed * 3.6);
    let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

    icon.setAttribute("src", iconUrl);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    document.querySelector("#temp-digits").innerHTML = temperature;
    document.querySelector("#condition").innerHTML = descriptionElement;
    document.querySelector("#humidity").innerHTML = `${humidity}%`;
    document.querySelector("#wind").innerHTML = `${wind}km/h`;
  });
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", search);

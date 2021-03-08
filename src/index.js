function showCurrentTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}


function displayTemperature(response) {
  let displayedTemperature = document.querySelector("#displayed-temperature");
  displayedTemperature.innerHTML = Math.round(response.data.main.temp);
  let mainCity = document.querySelector("#main-city");
  mainCity.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = showCurrentTime(response.data.dt * 1000);
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function searchForCity(city) {
  let apiKey = "5f096b83bdc84f26ba30a112e06d40d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let typedCity = document.querySelector("#typed-city");
  searchForCity(typedCity.value);

}

searchForCity("New York");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
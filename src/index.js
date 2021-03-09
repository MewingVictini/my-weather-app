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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
      hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`; 
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
  
  celsiusTemperature = response.data.main.temp;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null; 
  
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index]; 
    forecastElement.innerHTML += `<div class="col-2">
                                <div class="days-wrapper">
                                  <h3>
                                    ${formatHours(forecast.dt * 1000)}
                                  </h3>
                                  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
                                      alt=""
                                      class="icons">
                                  <div class="weather-forecast-temp">
                                    <strong>${Math.round(forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
                                  </div>
                                </div>
                              </div>`;
  }
}

function searchForCity(city) {
  let apiKey = "5f096b83bdc84f26ba30a112e06d40d5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let typedCity = document.querySelector("#typed-city");
  searchForCity(typedCity.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let displayedTemperature = document.querySelector("#displayed-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.add("temperature-conversion");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  displayedTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.remove("temperature-conversion");
  let displayedTemperature = document.querySelector("#displayed-temperature");
  displayedTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", convertToCelsius);

searchForCity("New York");
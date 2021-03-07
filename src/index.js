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
}


let apiKey = "5f096b83bdc84f26ba30a112e06d40d5";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
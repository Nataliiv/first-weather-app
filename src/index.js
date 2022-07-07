function currentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thuesday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentTime = `${currentDay} ${currentHours}:${currentMinutes}`;
  return currentTime;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2" style="width: 150px">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
              alt="" 
              width="46px"
               />
          <span class="weather-forecast-temperatures-max">${Math.round(forecastDay.temp.max)}°C </span>/
          <span class="weather-forecast-temperatures-min">${Math.round(forecastDay.temp.min)}°C </span>
      </div>
      `;
    }
  });
  
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3743a596ca777c1b75d0b29a0dd4cdfd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lat}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperatureCity = document.querySelector(".temperature");
  let descriptionCity = document.querySelector("#description");
  let humidityCity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureCity.innerHTML = Math.round(celsiusTemperature);
  descriptionCity.innerHTML = response.data.weather[0].description;
  humidityCity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = currentDate(new Date());
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3743a596ca777c1b75d0b29a0dd4cdfd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#citysearch");
  search(cityInputElement.value);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", handleSubmit);

search("Komotini");


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




function searchCity(event) {
  event.preventDefault();
  let apiKey = "3743a596ca777c1b75d0b29a0dd4cdfd";
  let city = document.querySelector("#citysearch").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let input = document.querySelector("#citysearch");
  let h1 = document.querySelector("#city");
  h1.innerHTML = input.value;
  axios.get(apiUrl).then(showTemperature);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log(response);
  let temperatureCity = document.querySelector(".temperature");
  let descriptionCity = document.querySelector("#description");
  let humidityCity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureCity.innerHTML = Math.round(response.data.main.temp);
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
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3743a596ca777c1b75d0b29a0dd4cdfd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", getCurrentPosition);

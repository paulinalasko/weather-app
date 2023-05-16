/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable eqeqeq */
// eslint-disable-next-line no-unused-vars
const myKey = config.MY_KEY;
const getDOM = (() => {
  const body = document.querySelector('.body');
  const searchButton = document.querySelector('.search-button')
  const clearButton = document.querySelector('.clear-button')

  body.addEventListener('load', getWeather('Denver', 'CO', 'US'));
  searchButton.addEventListener('click', e => {
    e.preventDefault();

    let searchCity = document.getElementById('search-city').value
    let searchState = document.getElementById('search-state').value
    let searchCountry = document.getElementById('search-country').value
    clearDom();
    getWeather(searchCity, searchState, searchCountry);
  });
  clearButton.addEventListener('click', clearSearch)
  document.addEventListener('DOMContentLoaded', function hideImage () {
    const weatherImages = document.querySelectorAll('.icon');
    weatherImages.style.display = 'inline';
  });
})();

// Async function to fetch current forecast from user input
async function getWeather (searchCity, searchState, searchCountry) {
  try {
    // Fetch data and wait for JSON data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + searchCity + ',' + searchState + ',' + searchCountry + `&units=imperial&APPID=${myKey}`, { mode: 'cors' })
    const weatherData = await response.json();
    console.log(weatherData);

    // Fetch forecast data
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&units=imperial&appid=${myKey}`, { mode: 'cors' })
    const forecastData = await forecastResponse.json();
    console.log(forecastData);

    // Construct object for current weather
    const weatherObject = {
      place: weatherData.name + ', ' + searchState.toUpperCase() + ' ' + searchCountry.toUpperCase(),
      mainWeather: weatherData.weather[0].main,
      description: weatherData.weather[0].description.replace(/\b\w/g, letter => (letter.toUpperCase())),
      temp: Math.round(weatherData.main.temp),
      humidity: 'Humidity: ' + weatherData.main.humidity + '% ',
      wind: Math.round(weatherData.wind.speed) + ' mph',
    }

    displayWeather(weatherObject);
    renderDailyForecast(forecastData);
  } catch (err) {
    console.log('Something went wrong with fetching the weather data...', err)
  }
  return getWeather;
}
function displayWeather (weatherObject) {
  const displayDiv = document.querySelector('.display-current-weather');

 // Create elements in DOM for weather
  const city = document.createElement('p');
  city.classList.add('city-title');
  city.textContent = weatherObject.place;
  displayDiv.appendChild(city);
  const date = document.createElement('p')
  date.textContent = getCurrentDate();
  displayDiv.appendChild(date);
  const main = document.createElement('p');
  main.textContent = weatherObject.description;
  const currentWeatherIcon = document.querySelector('.current-weather-image');
  displayDiv.appendChild(main);
  displayDiv.appendChild(currentWeatherIcon)

  const containerOne = document.createElement('div');
  containerOne.classList.add('current-weather-box');
  containerOne.classList.add('dom-div');
  const tempImage = document.createElement('img');
  tempImage.classList.add('icon');
  tempImage.classList.add('grid-icon');
  tempImage.src = './assets/thermometer-50.png';
  const cityTemp = document.createElement('p');
  cityTemp.classList.add('grid-element')
  cityTemp.textContent = weatherObject.temp + ' Degrees';
  containerOne.appendChild(tempImage);
  containerOne.appendChild(cityTemp);

  const humidityImage = document.createElement('img');
  humidityImage.classList.add('icon');
  humidityImage.classList.add('grid-icon');
  humidityImage.src = './assets/icons8-humidity-48.png';
  const cityHumidity = document.createElement('p');
  cityHumidity.classList.add('grid-element')
  cityHumidity.textContent = weatherObject.humidity;
  containerOne.appendChild(humidityImage);
  containerOne.appendChild(cityHumidity);

  const windImage = document.createElement('img');
  windImage.classList.add('icon');
  windImage.classList.add('grid-icon');
  windImage.src = './assets/icons8-wind-50.png';
  const cityWind = document.createElement('p');
  cityWind.classList.add('grid-element')
  cityWind.textContent = weatherObject.wind;
  containerOne.appendChild(windImage);
  containerOne.appendChild(cityWind);
  displayDiv.appendChild(containerOne);
}

function renderDailyForecast (forecastData) {
  // Render each day of the week
  const dayOne = document.querySelector('.day-one');
  const dayOneTempHigh = document.querySelector('.one-temp-high');
  const dayOneTempLow = document.querySelector('.one-temp-low');
  dayOne.textContent = getDay(forecastData, 1);
  dayOneTempHigh.textContent = Math.round(forecastData.daily[1].temp.max) + '°';
  dayOneTempLow.textContent = Math.round(forecastData.daily[1].temp.min) + '°';

  const dayTwo = document.querySelector('.day-two');
  const dayTwoTempHigh = document.querySelector('.two-temp-high');
  const dayTwoTempLow = document.querySelector('.two-temp-low');
  dayTwo.textContent = getDay(forecastData, 2);
  dayTwoTempHigh.textContent = Math.round(forecastData.daily[2].temp.max) + '°';
  dayTwoTempLow.textContent = Math.round(forecastData.daily[2].temp.min) + '°';

  const dayThree = document.querySelector('.day-three');
  const dayThreeTempHigh = document.querySelector('.three-temp-high');
  const dayThreeTempLow = document.querySelector('.three-temp-low');
  dayThree.textContent = getDay(forecastData, 3);
  dayThreeTempHigh.textContent = Math.round(forecastData.daily[3].temp.max) + '°';
  dayThreeTempLow.textContent = Math.round(forecastData.daily[3].temp.min) + '°';

  const dayFour = document.querySelector('.day-four');
  const dayFourTempHigh = document.querySelector('.four-temp-high');
  const dayFourTempLow = document.querySelector('.four-temp-low');
  dayFour.textContent = getDay(forecastData, 4);
  dayFourTempHigh.textContent = Math.round(forecastData.daily[4].temp.max) + '°';
  dayFourTempLow.textContent = Math.round(forecastData.daily[4].temp.min) + '°';

  const dayFive = document.querySelector('.day-five');
  const dayFiveTempHigh = document.querySelector('.five-temp-high');
  const dayFiveTempLow = document.querySelector('.five-temp-low');
  dayFive.textContent = getDay(forecastData, 5);
  dayFiveTempHigh.textContent = Math.round(forecastData.daily[5].temp.max) + '°';
  dayFiveTempLow.textContent = Math.round(forecastData.daily[5].temp.min) + '°';

  const daySix = document.querySelector('.day-six');
  const daySixTempHigh = document.querySelector('.six-temp-high');
  const daySixTempLow = document.querySelector('.six-temp-low');
  daySix.textContent = getDay(forecastData, 6);
  daySixTempHigh.textContent = Math.round(forecastData.daily[6].temp.max) + '°';
  daySixTempLow.textContent = Math.round(forecastData.daily[6].temp.min) + '°';

  // Render Images
  let url;
  const currentWeatherIcon = document.querySelector('.current-weather-image');
  url = updateWeatherIcon(forecastData, 0);
  currentWeatherIcon.src = url;

  const dayOneIcon = document.querySelector('.weather-icon-1');
  url = updateWeatherIcon(forecastData, 1);
  dayOneIcon.src = url;

  const dayTwoIcon = document.querySelector('.weather-icon-2');
  url = updateWeatherIcon(forecastData, 2);
  dayTwoIcon.src = url;

  const dayThreeIcon = document.querySelector('.weather-icon-3');
  url = updateWeatherIcon(forecastData, 3);
  dayThreeIcon.src = url;

  const dayFourIcon = document.querySelector('.weather-icon-4');
  url = updateWeatherIcon(forecastData, 4);
  dayFourIcon.src = url;

  const dayFiveIcon = document.querySelector('.weather-icon-5');
  url = updateWeatherIcon(forecastData, 5);
  dayFiveIcon.src = url;

  const daySixIcon = document.querySelector('.weather-icon-6');
  url = updateWeatherIcon(forecastData, 6);
  daySixIcon.src = url;

  function updateWeatherIcon (data, i) {
    let url;
    const weatherDescription = data.daily[i].weather[0].main
    if ((weatherDescription.toString().toLowerCase()) == 'clouds' || (weatherDescription.toString().toLowerCase()) == 'overcast clouds') {
      url = './assets/icons8-clouds-40.png';
    }
    if ((weatherDescription.toString().toLowerCase()) == 'clear') {
      url = './assets/icons8-sun-40.png';
    }
    if ((weatherDescription.toString().toLowerCase()) == 'rain') {
      url = './assets/icons8-rain-40.png';
    }
    if ((weatherDescription.toString().toLowerCase()) == 'snow') {
      url = './assets/icons8-snow-storm-40.png';
    }
    if ((weatherDescription.toString().toLowerCase()) == 'thunderstorm') {
      url = './assets/icons8-storm-40.png';
    }
    if ((weatherDescription.toString().toLowerCase()) == 'partly cloudy') {
      url = './.icons8-partly-cloudy-day-40.png'
    }
    return url
  }
}
// Get day of week based off data
function getDay (data, i) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(data.daily[i].dt * 1000);
  const dayName = days[d.getDay()];
  return dayName;
}

function getCurrentDate () {
  let today = new Date();

  let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let d = new Date();
  let day = weekday[d.getDay()];

  let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let mm = new Date();
  let name = month[mm.getMonth()];

  let dd = String(today.getDate()).padStart(2, '0');

  let yyyy = today.getFullYear();

  today = day + ', ' + name + ' ' + dd + 'th' + ' ' + yyyy;
  return today;
}

function clearSearch () {
  document.getElementById('search-city').value = ''
  document.getElementById('search-state').value = ''
  document.getElementById('search-country').value = ''
  // document.querySelectorAll('.icon') = ''
  // document.querySelectorAll('.dom-div') = ''
  clearDom();
}

function clearDom () {
  const domList = document.querySelectorAll('p');
  const icons = document.querySelectorAll('img');
  const gridIcons = document.querySelectorAll('.grid-icon')
  if (domList !== null) {
    for (let i = 0; i < domList.length; i++) {
      domList[i].remove();
    }
  }
  if (icons !== null) {
    for (let i = 0; i < icons.length; i++) {
      icons[i].src = '';
    }
  }
  if (gridIcons !== null) {
    for (let i = 0; i < gridIcons.length; i++) {
      gridIcons[i].remove();
    }
  }
}
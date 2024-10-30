async function getWeather(location) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=344fea06af6447c092b141515241405&q=${location}&aqi=no`, { mode: 'cors' });

    if (!response.ok) {
      throw new Error('Location not found');
    }

    const weatherData = await response.json();
    console.log(weatherData);

    const locationName = weatherData.location.name;
    const condition = weatherData.current.condition.text;
    const icon = `https:${weatherData.current.condition.icon}`;
    const temperature = weatherData.current.temp_c;
    const humidity = weatherData.current.humidity;

    document.querySelector('.location').textContent = locationName;
    document.querySelector('.condition').textContent = condition;
    document.querySelector('.icon').src = icon;
    document.querySelector('.temperature').textContent = `${temperature}°C`;
    document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
  } catch (error) {
    console.error(error);
    alert('Invalid location. Please enter a valid location.');
  }
}

async function getForecast(location) {
  try {
    // Fetch 7-day forecast data
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=344fea06af6447c092b141515241405&q=${location}&days=7&aqi=no&alerts=no`, { mode: 'cors' });

    if (!response.ok) {
      throw new Error('Location not found');
    }

    const forecastData = await response.json();
    console.log("Forecast Data:", forecastData); // Log data for verification

    const forecastDays = forecastData.forecast.forecastday;
    const forecastContentDiv = document.querySelector('.forecast-content');
    forecastContentDiv.innerHTML = ''; // Clear previous content

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Loop through each day in the forecast (up to 7 days)
    forecastDays.forEach(day => {
      const date = new Date(day.date);
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      const forecastIcon = `https:${day.day.condition.icon}`;
      const avgTemp = day.day.avgtemp_c;

      // Create elements for each day's forecast
      const dayDiv = document.createElement('div');
      dayDiv.className = 'day-forecast';

      const dateElement = document.createElement('p');
      dateElement.textContent = dayOfWeek;
      dayDiv.appendChild(dateElement);

      const iconElement = document.createElement('img');
      iconElement.src = forecastIcon;
      dayDiv.appendChild(iconElement);

      const tempElement = document.createElement('p');
      tempElement.textContent = `${avgTemp}°C`;
      dayDiv.appendChild(tempElement);

      forecastContentDiv.appendChild(dayDiv);
    });
  } catch (error) {
    console.error(error);
  }
}


function searchWeather() {
  const mainDiv = document.querySelector('.search-weather');

  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';
  mainDiv.appendChild(searchContainer);

  const inputWeather = document.createElement('input');
  inputWeather.className = "input-weather";
  inputWeather.placeholder = "Enter location";
  searchContainer.appendChild(inputWeather);

  const weatherButton = document.createElement('button');
  weatherButton.className = 'weather-button';
  weatherButton.innerHTML = '<img src="search.png" />';
  searchContainer.appendChild(weatherButton);

  weatherButton.addEventListener('click', () => {
    const location = inputWeather.value;
    if (location) {
      getWeather(location);
      getForecast(location);
    } else {
      alert('Please enter a location');
    }
  });
}

function mainContent() {
  const mainDiv = document.querySelector('.main-content');

  const location = document.createElement('p');
  location.className = "location";
  mainDiv.appendChild(location);

  const condition = document.createElement('p');
  condition.className = "condition";
  mainDiv.appendChild(condition);

  const icon = document.createElement('img');
  icon.className = "icon";
  mainDiv.appendChild(icon);

  const temperature = document.createElement('p');
  temperature.className = "temperature";
  mainDiv.appendChild(temperature);

  const humidity = document.createElement('p');
  humidity.className = "humidity";
  mainDiv.appendChild(humidity);
}

searchWeather();
mainContent();
getWeather('London');
getForecast('London');




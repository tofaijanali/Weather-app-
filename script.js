const apiKey = 'd9fb7c4d6c27124c5495690a011363ab';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherInfo = document.getElementById('weather-info');
const weatherIcon = document.getElementById('weather-icon'); 

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (data.cod === 200) {
      displayWeather(data);
    } else {
      alert('City not found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('An error occurred. Please try again later.');
  }
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `🌬️ Wind Speed: ${data.wind.speed} m/s`;


  const iconCode = data.weather[0].icon;
  weatherIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${iconCode}@2x.png)`;

  weatherInfo.style.display = 'block';
}

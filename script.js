const API_KEY = "your_api_key_here"

const searchForm = document.getElementById("searchForm")
const cityInput = document.getElementById("cityInput")
const searchBtn = document.getElementById("searchBtn")

const weatherCard = document.getElementById("weatherCard")
const message = document.getElementById("message")

const cityName = document.getElementById("cityName")
const countryName = document.getElementById("countryName")
const temperature = document.getElementById("temperature")
const humidity = document.getElementById("humidity")
const feelsLike = document.getElementById("feelsLike")
const weatherDescription = document.getElementById("weatherDescription")
const weatherIcon = document.getElementById("weatherIcon")

async function getWeather(city) {

    if (!city) {
        message.textContent = "Please enter a city name."
        message.className = "message error"
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
    message.textContent = "Please add your OpenWeatherMap API key in script.js."
    message.className = "message error"
    return;
}

    try {
        searchBtn.disabled = true;
        searchBtn.textContent = "Loading..."
        message.textContent = "Fetching weather data..."
        message.className = "message"

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url)

        const data = await response.json()

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to fetch weather data."
            );
        }

        cityName.textContent = data.name
        countryName.textContent = data.sys.country

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`

        humidity.textContent =
            `${data.main.humidity}%`

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`

        weatherDescription.textContent =
            data.weather[0].description

       // Set weather icon dynamically
const iconCode = data.weather[0].icon;

weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

weatherIcon.alt = data.weather[0].description;

// Handle icon loading error
weatherIcon.onerror = () => {
    weatherIcon.alt = "Weather icon unavailable";
};
        weatherCard.hidden = false

        message.textContent = "Weather updated successfully."
        message.className = "message"

    } catch (error) {

        weatherCard.hidden = true

        message.textContent =
            error.message === "city not found"
                ? "City not found. Please enter a valid city name."
                : error.message

        message.className = "message error"

        console.error("Weather API Error:", error)

    } finally {

        searchBtn.disabled = false;
        searchBtn.textContent = "Search"

    }
}

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const city = cityInput.value.trim()

    getWeather(city);

});

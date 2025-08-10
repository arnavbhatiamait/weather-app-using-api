# Weather App (HTML/CSS/JavaScript + Weather API)

A simple, responsive weather app that fetches real-time weather data for any city using a public weather API and displays temperature, conditions, humidity, and wind speed with dynamic icons and a clean UI.

- Live site: https://arnavbhatiamait.github.io/weather-app-using-api

## Features

- Search weather by city name with instant results.
- Shows temperature (°C), weather condition/description, humidity, and wind speed.
- Dynamic weather icon updates based on condition (e.g., Clear, Clouds, Rain).
- Lightweight, mobile-friendly layout using plain HTML/CSS/JS.
- Deployed via GitHub Pages.

## Tech Stack

- HTML for structure
- CSS for styling and responsive layout
- JavaScript (Fetch API, async/await) for API calls and DOM updates
- Weather API provider (e.g., OpenWeatherMap or equivalent)

## Getting Started

1) Clone the repository
- git clone https://github.com/arnavbhatiamait/weather-app-using-api.git
- cd weather-app-using-api

2) Open locally
- Open index.html in a browser.

3) Configure API key
- Sign up at your chosen weather API provider (e.g., OpenWeatherMap) to get a free API key.
- In index.js, set your API key, for example:
  - const API_KEY = 'YOUR_API_KEY';
  - Use metric units: ...&units=metric

4) Run
- Enter a city name in the search box and submit to see live weather data update the UI.

## Usage

- Type a city name (e.g., “Bengaluru”, “New York”) and press the search button/icon.
- The app fetches JSON from the weather API and updates:
  - City name
  - Temperature (°C)
  - Weather condition and icon
  - Humidity and wind speed

## Project Structure

- index.html — App markup and search input.
- styles.css — Layout, typography, and responsive styles.
- index.js — API calls, DOM manipulation, and icon logic.
- Images (e.g., weather-icon.png, sun.png, moon.png) — UI and condition-based assets.

## API Notes

- Typical current-weather endpoints return fields like name, main.temp, main.humidity, wind.speed, and weather.main or weather.description.
- Append units=metric to get Celsius values.

## Deployment

- Hosted with GitHub Pages:
  - Live site: https://arnavbhatiamait.github.io/weather-app-using-api
- To deploy updates:
  - Commit and push changes to the default branch.
  - Ensure GitHub Pages is enabled for the repository in Settings → Pages.

## Improvements Roadmap

- Input validation and user-friendly error handling for unknown city/network issues.
- Geolocation-based “Use my location” button.
- Extended forecast (hourly/5-day) and extra metrics (pressure, visibility).
- Theme toggle (light/dark) based on time of day with sun/moon assets.
- Optional provider switch (e.g., Open-Meteo) to avoid API keys.

## License

- MIT (or update with your chosen license).

## Acknowledgments

- Weather data via OpenWeatherMap (or your selected API).
- Common vanilla JS patterns for fetch and DOM updates inspired the implementation.

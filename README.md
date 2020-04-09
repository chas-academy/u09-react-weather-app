# U09-React-weather-app

## API
Openweathermaps

## TO DO
- Start with API Call (Emil)(Done for Forecast component).
- Convert to Celcius or Fahrenheit depending on state (Includes automa from API).
- Figure out Geolocation (Viktor).

## Components
- Header (Includes h1 with heading for site and button to change units (C/F) in.)
- Current weather
- Forecast

## Design
- Check Geolocation when site entered.
- If no long or lattitude then Default to Sthlm
api.openweathermap.org/data/2.5/weather?q=Stockholm
- If geolocation then
api.openweathermap.org/data/2.5/weather?lat=35&lon=139
- 5 day forecast under with 3 hours intervall

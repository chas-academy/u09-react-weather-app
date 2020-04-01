# U09-React-weather-app

## API
Openweathermaps

## TO DO
- Start with API Call.
- Convert to Celcius or Fahrenheit depending on state.
- Figure out Geolocation.

## Components
- Header
- Current weather
- Forecast

## API calls
api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}

## Design
- Check Geolocation when site entered.
- If no long or lattitude then Default to Sthlm
api.openweathermap.org/data/2.5/weather?q=Stockholm
- If geolocation then
api.openweathermap.org/data/2.5/weather?lat=35&lon=139
- 5 day forecast under with 3 hours intervall
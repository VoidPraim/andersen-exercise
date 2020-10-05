class WeatherService {
  async getCurrentWeather(city) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const {name, main} = await response.json();
    return {name, main};
  }
}

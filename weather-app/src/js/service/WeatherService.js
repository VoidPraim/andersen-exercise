class WeatherService {
  async getCurrentWeather(city) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    const {name, main} = await response.json();
    return {name, main};
  }

  async checkMatches(city) {
    const response = await fetch(`https://openweathermap.org/data/2.5/find?q=${city}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`);
    const {list} = await response.json();
    return list;
  }
}

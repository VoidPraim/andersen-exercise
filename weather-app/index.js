var weatherService = new WeatherService();

  const manager = new WeatherManager(weatherService);
  manager.create();
  manager.show();

function searchWeather() {
  
}

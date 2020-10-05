class WeatherManager {
  constructor(service) {
    this.service = service;
  }

  create() {
    this.wrapBlock = document.createElement('div');
    this.wrapBlock.classList.add('wrap')
    this.#createInputBlock();
    this.#createInfoBlock();
  }

  #createInputBlock() {
    const inputBlock = document.createElement('div');
    inputBlock.classList.add('city_input_block');

    this.currentCityInput = document.createElement('input');
    this.currentCityInput.classList.add('city_input');

    this.searchButton = document.createElement('div');
    this.searchButton.classList.add('find_weather_button');
    this.searchButton.innerText = SEARCH_BUTTON_TEXT;
    this.searchButton.addEventListener('click', this.#onSearchClick.bind(this));

    inputBlock.append(this.currentCityInput);
    inputBlock.append(this.searchButton);

    this.wrapBlock.append(inputBlock);
  }

  #createInfoBlock() {
    this.infoBlock = document.createElement('div');
    this.infoBlock.classList.add('weather_info_block');
    this.infoBlock.style.visibility = 'hidden';

    const cityTimeBlock = this.#createCityTimeInfoBlock();
    this.infoBlock.append(cityTimeBlock);

    const mainInfoBlock = this.#createMainInfoBlock();
    this.infoBlock.append(mainInfoBlock);

    this.wrapBlock.append(this.infoBlock);
  }

  #createCityTimeInfoBlock() {
    const cityTimeBlock = document.createElement('div');
    cityTimeBlock.classList.add('city_info');

    this.cityName = document.createElement('div');
    this.cityName.classList.add('city_name');

    this.timeValue = document.createElement('div');
    this.timeValue.classList.add('time_value');

    cityTimeBlock.append(this.cityName);
    cityTimeBlock.append(this.timeValue);

    return cityTimeBlock;
  }

  #createMainInfoBlock() {
    const mainInfoBlock = document.createElement('div');
    mainInfoBlock.classList.add('main_info');


    const properties = this.#createMainWeatherProperties();

    mainInfoBlock.append(properties);

    return mainInfoBlock;
  }

  #createMainWeatherProperties() {
    const wrap = new DocumentFragment();

    const feelsLikeProperty = document.createElement('div');
    feelsLikeProperty.classList.add('weather_property');

    this.feelsLikePropertyValue = document.createElement('span');
    this.feelsLikePropertyValue.classList.add('value');

    feelsLikeProperty.append(FEELS_LIKE_TEXT);
    feelsLikeProperty.append(this.feelsLikePropertyValue);

    const pressureProperty = document.createElement('div');
    pressureProperty.classList.add('weather_property');

    this.pressurePropertyValue = document.createElement('span');
    this.pressurePropertyValue.classList.add('value');

    pressureProperty.append(PRESSURE_TEXT);
    pressureProperty.append(this.pressurePropertyValue);

    const humidityProperty = document.createElement('div');
    humidityProperty.classList.add('weather_property');

    this.humidityPropertyValue = document.createElement('span');
    this.humidityPropertyValue.classList.add('value');

    humidityProperty.append(HUMIDITY_TEXT);
    humidityProperty.append(this.humidityPropertyValue);

    const tempProperty = document.createElement('div');
    tempProperty.classList.add('weather_property');

    this.tempPropertyValue = document.createElement('span');
    this.tempPropertyValue.classList.add('value');

    tempProperty.append(TEMP_TEXT);
    tempProperty.append(this.tempPropertyValue);

    const tempMaxProperty = document.createElement('div');
    tempMaxProperty.classList.add('weather_property');

    this.tempMaxPropertyValue = document.createElement('span');
    this.tempMaxPropertyValue.classList.add('value');

    tempMaxProperty.append(MAX_TEMP_TEXT);
    tempMaxProperty.append(this.tempMaxPropertyValue);

    const tempMinProperty = document.createElement('div');
    tempMinProperty.classList.add('weather_property');

    this.tempMinPropertyValue = document.createElement('span');
    this.tempMinPropertyValue.classList.add('value');

    tempMinProperty.append(MIN_TEMP_TEXT);
    tempMinProperty.append(this.tempMinPropertyValue);

    wrap.append(feelsLikeProperty);
    wrap.append(pressureProperty);
    wrap.append(humidityProperty);
    wrap.append(tempProperty);
    wrap.append(tempMinProperty);
    wrap.append(tempMaxProperty);

    return wrap;
  }

  show() {
    document.body.append(this.wrapBlock);
  }

  async setData() {
    this.currentWeather = await this.service.getCurrentWeather(this.currentCityInput.value);
  }

  fillData() {
    this.cityName.innerText = this.currentWeather.name;

    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    this.timeValue.innerText = time;

    this.feelsLikePropertyValue.innerText = Math.round(+this.currentWeather.main.feels_like - 273.15);
    this.humidityPropertyValue.innerText = this.currentWeather.main.humidity;
    this.pressurePropertyValue.innerText = this.currentWeather.main.pressure;

    this.tempPropertyValue.innerText = Math.round(+this.currentWeather.main.temp - 273.15);
    this.tempMaxPropertyValue.innerText = Math.round(+this.currentWeather.main.temp_max - 273.15);
    this.tempMinPropertyValue.innerText = Math.round(+this.currentWeather.main.temp_min - 273.15);

  }

  async #onSearchClick() {
    await this.setData();

    if (this.currentWeather.name !== this.currentCityInput.value) {
      alert(`Данные найдены по городу ${this.currentCityInput.value}`)
    }
    else {
      this.infoBlock.style.visibility = 'visible';
      this.fillData()
    }
  }
}

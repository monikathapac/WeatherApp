const form=document.querySelector(".search_form");
const input=document.querySelector(".search_input");
const place = document.querySelector(".weather_place");
const dateTime = document.querySelector(".date_time");
const temperature = document.querySelector(".weather_temperature");
const mainWeather = document.querySelector(".main_weather");
const icon = document.querySelector(".icon");
const maximum = document.querySelector(".temp_max");
const minimum = document.querySelector(".temp_min");
const humidity = document.querySelector(".weather_humidity");
const windSpeed = document.querySelector(".wind_speed");
//apiKey="1cadd2fd8bd256b2cedd5acd69acb315";
//units=metric for converting kelvin to celcius
let city="Jamnagar";

form.addEventListener("submit", (e)=>{
    e.preventDefault();
   city=input.value;
    console.log(city);
getWeatherData();
input.value="";

}
);

const showName = (code) => {
  const fullname = new Intl.DisplayNames([code], { type: "region" }); //js predefined api
  return fullname.of(code);
};

const getWeatherData = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1cadd2fd8bd256b2cedd5acd69acb315`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { main, weather, sys, dt, wind } = data;
    const currTime = new Date(dt * 1000).toLocaleTimeString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    place.innerHTML = `${data.name}, ${showName(sys.country)}`;
    dateTime.textContent = currTime;
    temperature.innerHTML = `${main.temp.toFixed(1)}&#176`;
    mainWeather.textContent = weather[0].main;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" />`; //link from api same
    //next div
    humidity.textContent = main.humidity;
    maximum.innerHTML = `${main.temp_max.toFixed(0)}&#176`;
    minimum.innerHTML = `${main.temp_min.toFixed(0)}&#176`;
    windSpeed.textContent = `${wind.speed}m/s`;
  } catch (error) {
    console.log(error);
  }
};
document.body.addEventListener("load", getWeatherData());

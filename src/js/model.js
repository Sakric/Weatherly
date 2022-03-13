import { async } from "regenerator-runtime";
import { getJSON } from "./helpers";
const API_KEY = "499d5dbc497572b8c13133b22a5c4a89";

export const state = {
  current: {
    main: "",
    description: "",
  },
  hourly: [],
};

const renderInfoCurrent = function (data) {
  state.current = {
    location: data.name,
    main: data.weather[0].main,
    description: data.weather[0].description,
    temp: Math.round(data.main.temp),
    feelsLike: data.main.feels_like,
    time: getTime(data.dt),
    visibility: data.visibility / 1000,
    wind: Math.round(data.wind.speed),
    deg: data.wind.deg,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    sunrise: getTime(data.sys.sunrise),
    sunset: getTime(data.sys.sunset),
    lat: data.coord.lat,
    lon: data.coord.lon,
  };
};

const renderInfoDaily = function (data) {
  state.daily = data.daily
    .filter((el, index) => index < 7)
    .map((el) => {
      return {
        main: el.weather[0].main,
        description: el.weather[0].description,
        date: getDate(el.dt),
        tempDay: Math.round(el.temp.day),
        tempNight: Math.round(el.temp.night),
      };
    });
};

const getTime = function (unix) {
  const milliseconds = unix * 1000;
  const dateObject = new Date(milliseconds);

  return dateObject.toLocaleString("en-GB", {
    hour: "numeric",
    minute: "numeric",
  });
};

const getDate = function (unix) {
  const milliseconds = unix * 1000;
  const dateObject = new Date(milliseconds);

  return {
    weekday: dateObject.toLocaleString("en-GB", {
      weekday: "long",
    }),
    day: dateObject
      .toLocaleString("en-GB", {
        day: "numeric",
      })
      .padStart(2, "0"),
    month: dateObject
      .toLocaleString("en-GB", {
        month: "numeric",
      })
      .padStart(2, "0"),
  };
};

export const callAPI = async function (lat, lon) {
  try {
    const API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}
      `;
    const API_DAILLY = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}
      `;

    const dataCurrent = await getJSON(API_CURRENT);
    const dataDaily = await getJSON(API_DAILLY);

    renderInfoCurrent(dataCurrent);
    renderInfoDaily(dataDaily);
  } catch (err) {
    throw err;
  }
};

export const callCityAPI = async function (city) {
  try {
    const API_CITY_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const dataCurrent = await getJSON(API_CITY_CURRENT);

    renderInfoCurrent(dataCurrent);

    const API_DAILLY = `https://api.openweathermap.org/data/2.5/onecall?lat=${state.current.lat}&lon=${state.current.lon}&units=metric&appid=${API_KEY}
  `;
    const dataDaily = await getJSON(API_DAILLY);

    renderInfoDaily(dataDaily);
  } catch (err) {
    throw err;
  }
};

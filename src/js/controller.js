import { async } from "regenerator-runtime";
import { getJSON } from "./helpers.js";
import * as model from "./model.js";
import View from "./View.js";

const search = document.querySelector(".search");

const getCords = function (position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  controlWeather(lat, lon);
};

const controlWeather = async function (lat, lon) {
  try {
    View.renderSpinner();
    await model.callAPI(lat, lon);
    View.renderWeather(model.state);
    renderMap();

    // add hash, maybe in the future
    // window.location.hash = model.state.current.location.replace(" ", "_");
  } catch (err) {
    View.renderError();
  }
};

const callCity = async function (city) {
  try {
    View.renderSpinner();
    await model.callCityAPI(city);
    View.renderWeather(model.state);
    renderMap();

    // add hash, maybe in the future
    // window.location.hash = model.state.current.location.replace(" ", "_");
  } catch (err) {
    View.renderError();
  }
};

search.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = search.querySelector(".search__field").value;
  if (!query) return;
  search.querySelector(".search__field").value = "";
  callCity(query);
});

const renderMap = function () {
  const cords = [model.state.current.lat, model.state.current.lon];
  const map = L.map("map").setView(cords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(cords)
    .addTo(map)
    .bindPopup(
      `${model.state.current.location} ${model.state.current.temp}°C (Click on me)`
    )
    .openPopup();

  map.on("click", function (e) {
    const { lat, lng } = e.latlng;
    controlWeather(lat, lng);
  });
};

const buttonCurrentClick = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCords);
  } else {
    callCity("London");
  }
};

const init = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCords);
  } else {
    callCity("London");
  }
  View.addHandlerClick(buttonCurrentClick);
  View.addHandlerClickListItems(callCity);
  View.addEventListenerList();
};
init();

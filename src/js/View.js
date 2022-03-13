import sunrise from "../img/sunrise.png";
import sunset from "../img/sunset.png";
import wind from "../img/wind.png";
import arrow from "../img/arrow.png";
import Clear from "../img/Clear.png";
import Clouds from "../img/Clouds.png";
import Drizzle from "../img/Drizzle.png";
import Rain from "../img/Drizzle.png";
import Snow from "../img/Snow.png";
import Thunderstorm from "../img/Thunderstorm.png";
import Spinner from "../img/Spinner.png";
import ErrorImg from "../img/error.png";
import Germany from "../img/Germany.jpg";
import Spain from "../img/Spain.png";
import Lithuania from "../img/Lithuania.jpg";
import G_B from "../img/GB.png";
import France from "../img/France.png";

class View {
  _data;
  _parentElement = document.querySelector(".content");
  _imgNames = {
    Clear: Clear,
    Clouds: Clouds,
    Rain: Drizzle,
    Drizzle: Drizzle,
    Snow: Snow,
    Thunderstorm: Thunderstorm,
  };

  renderWeather(data) {
    this._data = data;

    const markup = this._generateMarkupWeather();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }

  addHandlerClick(handler) {
    const buttonCurrent = document.getElementById("current");
    const logo = document.getElementById("logo");
    buttonCurrent.addEventListener("click", handler);
    logo.addEventListener("click", handler);
  }

  addHandlerClickListItems(handler) {
    const content = document.querySelector(".content");
    content.addEventListener("click", function (e) {
      const btn = e.target.closest(".list__content");
      if (!btn) return;
      handler(btn.dataset.location);
    });
  }

  addEventListenerList() {
    const buttonList = document.getElementById("list");
    buttonList.addEventListener("click", this._renderList.bind(this));
  }

  _renderList() {
    this._clear();
    const markup = `
    <div class="card__big__list">
    <div class="card__body">
      <h3>List</h2>
        <div class="card__content__list">
          <button class="list__content" data-location="Berlin">
            <p>Berlin, Germany</p>
            <img class="list__icon" src="${Germany}">
          </button>
          <button class="list__content" data-location="Paris">
            <p>Paris, France</p>
            <img class="list__icon" src="${France}">
          </button>
          <button class="list__content" data-location="Vilnius">
            <p>Vilnius, Lithuania</p>
            <img class="list__icon" src="${Lithuania}">
          </button>
          <button class="list__content" data-location="Madrid">
            <p>Madrid, Spain</p>
            <img class="list__icon" src="${Spain}">
          </button>
          <button class="list__content" data-location="London">
            <p>London, United Kingdom</p>
            <img class="list__icon" src="${G_B}">
          </button>
        </div>
    </div>
  </div>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    this._clear();
    const markup = `
      <div class="spinner">
        <img class="icon__spinner" src="${Spinner}">
      </div>
      `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    this._clear();
    const markup = `
    <div class="card__big error">
    <div class="card__body__error">
      <div class="error__text">
        <h2>Error (404)</h2>
        <p>Something went wrong! Try again.</p>
      </div>
      <img class="icon__error" src="${ErrorImg}">
    </div>
  </div>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkupWeather() {
    return `
      <div class="card">
            <div class="card__body">
              <h3>Weather</h3>
              <div class="card__content">
                <div class="card_city">
                  <h2 class="main__name">${this._data.current.location}</h3>
                    <h2 class="main__temp">${this._data.current.temp}°C</h2>
                    <h2 class="main_desc">${this._data.current.description}</h2>
                </div>
                <img class="icon__main" src="${
                  this._imgNames[`${this._data.current.main}`]
                }">
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__body">
              <h3>Stats</h3>
              <div class="card__content__stats">
                <div class="card__stat">
                  <h2><span>Humidity</span></h2>
                  <h2>${this._data.current.humidity} %</h2>
                </div>
                <hr>
                <div class="card__stat">
                  <h2><span>Visibility</span></h2>
                  <h2>${this._data.current.visibility} km</h2>
                </div>
                <hr>
                <div class="card__stat">
                  <h2><span>Pressure</span></h2>
                  <h2>${this._data.current.pressure} hPa</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__body">
              <h3>Sun</h3>
              <div class="card__content__rise">
                <div class="sun__time">
                  <img  class="icon__sunrise" src="${sunrise}">
                  <h2><span>Sunrise</span></h2>
                  <h2>${this._data.current.sunrise}</h2>
                </div>
                <div class="sun__hr"></div>
                <div class="sun__time">
                  <img class="icon__sunrise" src="${sunset}">
                  <h2><span>Sunset</span></h2>
                  <h2>${this._data.current.sunset}</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__body">
              <h3>Wind</h3>
              <div class="card__content__rise">
                <div class="sun__time">
                  <img class="icon__sunrise" src="${wind}">
                  <h2><span>Wind</span></h2>
                  <h2>${this._data.current.wind} m/s</h2>
                </div>
                <div class="sun__hr"></div>
                <div class="sun__time">
                  <img class="icon__arrow" src="${arrow}" style="transform: rotate(-${
      this._data.current.deg
    }deg)">
                  <h2><span>Degree</span></h2>
                  <h2>${this._data.current.deg}°</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="card__big">
            <div class="card__body">
              <h3>Daily</h3>
              <div class="card__content__daily">
                ${this._data.daily
                  .map(this._generateMarkupDaily.bind(this))
                  .join("")}
                </div>
              </div>

            </div>
          </div>

          <div id="map" class="card__big">
      `;
  }

  _generateMarkupDaily(day, index) {
    return `
      <div class="daily__content">
      <h2><span class="date">${`${day.date.weekday.slice(0, 3)} ${
        day.date.day
      }.${day.date.month}`}</span></h2>
      <img class="icon__daily" src="${this._imgNames[`${day.main}`]}">
      <h2><span>${day.tempDay}°C <span class="night">${
      day.tempNight
    }°C</span></span></h2>
      <h2>${day.main}</h2>
      </div>
      ${index <= 5 ? '<div class="sun__hr"></div>' : ""}
      `;
  }
}

export default new View();

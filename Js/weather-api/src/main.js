const btnContainer = document.querySelector('.btnlist');
const contentContainer = document.querySelector('.weatherblock');
const box = document.querySelector('.box');
const url = "http://api.openweathermap.org/data/2.5/weather?"
const unitsMetric = "&units=metric";
const appId = "&appid=bc51ce4292a1207cc0f4276247d806ab";
let strg = localStorage.getItem("location");

class Button {
  constructor (elem) {
    this.elem = elem;
  }

  handleEvent (event){
    if (event.target != btnContainer) {
      if (!event.target.classList.contains("current")) {
        showSelected(btnContainer.children);
        event.target.style.display = "block";
        event.target.classList.toggle("current");
        localStorage.setItem("location",`${event.target.innerText}`);

        fetch(`${url}q=${event.target.innerText}${unitsMetric}${appId}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              buildWeather(data);
            });

      } else {
        showAll(btnContainer.children);
      }
    }

  }
};

let btn = new Button(btnContainer);
btnContainer.addEventListener('click', btn);

function buildWeather (obj) {
  let windDir;
  let date = new Date();
  date.setSeconds(date.getSeconds() + obj.timezone);
  

  if (obj.wind.deg < 90){
    windDir = "N";
  } else if(obj.wind.deg < 180) {
    windDir = "E";
  }else if(obj.wind.deg < 270){
    windDir = "S";
  } else{
    windDir = "W";
  }

  contentContainer.innerHTML = `
  <img src="http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png" class="statusimg">
  <h3>${Math.round(obj.main.temp)}°С</h3>
  <p>${obj.weather[0].description}</p>`;

  box.innerHTML=`
  <p>${date.toLocaleString('en-US',{year: 'numeric', month: 'long',day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, timeZone:'UTC'})}</p>
  <h3>${obj.name}, ${obj.sys.country}</h3>
  <div class="flex"><img src="http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png"><h3>${Math.round(obj.main.temp)}°С</h3></div>
  <p>Feels like ${Math.round(obj.main.feels_like)}°С. ${obj.weather[0].main}. ${obj.weather[0].description}</p>
  <div class="wind">
  <div class="windrow">
  <p><img src="arrow.png" class='arrow' style="transform: rotate(${obj.wind.deg}deg)">  ${obj.wind.speed}m/s ${windDir}</p><p>${obj.main.pressure} hPa</p><p>Humidity:${obj.main.humidity}%</p>
  </div>
  <p>Dew point: ${Math.round(obj.main.temp)}°С  Visibillity: ${obj.visibility/1000} Km</p>
  </div>
  `
}

function showSelected(elems) {
    for (let elem of elems) {
        elem.classList.remove('current');
        elem.style.display = "none";
    }
};

function showAll (elems) {
  for (let elem of elems) {
    elem.classList.remove('current');
    elem.style.display = "block";
  }
};

function success (pos) {
  let crd = pos.coords;
  fetch(`${url}lat=${crd.latitude}&lon=${crd.longitude}${unitsMetric}${appId}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              buildWeather(data);
            });
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  console.warn('Last chosen location opened');
};

fetch(`${url}q=${strg}${unitsMetric}${appId}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              buildWeather(data);
            });

navigator.geolocation.getCurrentPosition(success, error);
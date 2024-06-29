
// Selecting all the elements I need to work with




const cityInput = document.querySelector("input");
const search = document.querySelector(".search");
const day_foreCast = document.querySelector("#day-forecast");
const Appi_key = "3f3a9ec87f18b0c1136f4da517785b1a";

// This function works on city input and fetches data from API
const search_name_Api = () => {
    const City_name = cityInput.value.trim(); // Use the input value for the city name
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${City_name}&limit=1&appid=${Appi_key}`;

    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                console.log("Data fetched", data);
                const { lon, lat, name } = data[0];
                data_api(lon, lat, name);
            } else {
                console.error("City not found");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
//this function brings data of daily wether taking input from first API longitude,lattitude ,name
const data_api = (lon, lat, name) => {    
  const Api_Url = "https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Appi_key}&units=metric";
  
  fetch(Api_Url)
      .then((response) => response.json())
      .then((data) => {
          console.log("5-day weather data for", name, ":", data.list);
          const dailyData = [];
          const todayData = data.list[0];  // Assuming the first entry is the current weather

          for (let i = 0; i < data.list.length; i += 8) {
              dailyData.push(data.list[i]);
          }

          console.log("Daily weather data:", dailyData);
          updateTodayForecast(todayData);
          updateDOM(dailyData);
      })
      .catch((error) => {
          console.error("Error fetching weather data:", error);
      });
}

// This function brings data of daily weather taking input from first API longitude, latitude, name
const data_api = (lon, lat, name) => {
    const Api_Url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Appi_key}&units=metric`;

    fetch(Api_Url)
        .then((response) => response.json())
        .then((data) => {
            console.log("5-day weather data for", name, ":", data.list);
            const dailyData = [];
            const todayData = data.list[0]; // Assuming the first entry is the current weather

            for (let i = 0; i < data.list.length; i += 8) {
                dailyData.push(data.list[i]);
            }

            console.log("Daily weather data:", dailyData);
            updateTodayForecast(todayData, name);
            updateDOM(dailyData);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}

// This function helps to show data in today's forecast to show today's weather
const updateTodayForecast = (todayData, name) => {
    const temp = todayData.main.temp;
    const wind = todayData.wind.speed;
    const humidity = todayData.main.humidity;
    const iconCode = todayData.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    document.querySelector('#today-weather-icon img').src = iconUrl;
    document.querySelector('[data-value="temperature"]').textContent = temp;
    document.querySelector('[data-value="wind-speed"]').textContent = wind;
    document.querySelector('[data-value="humidity-level"]').textContent = humidity;
    document.querySelector('#city').textContent = name;
}

// This function helps to show data in the 5-day forecast
const updateDOM = (dailyData) => {
    day_foreCast.innerHTML = '';
    dailyData.forEach((day) => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temp = day.main.temp;
        const wind = day.wind.speed;
        const description = day.weather[0].description;
        const iconCode = day.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        // Fetching the final data into a created div with class day
        dayElement.innerHTML = `
            <h3>${date}</h3>
            <img src=${iconUrl} alt="${description}">
            <p>Temperature: ${temp}°C</p>
            <p>Description: ${description}</p>
            <p>Wind speed: ${wind} km/h</p>
        `;

        day_foreCast.appendChild(dayElement);
    });
}



//selecting all the eluments i need to work with

const cityInput = document.querySelector("input");
const search = document.querySelector(".search");
const Appi_key = "3f3a9ec87f18b0c1136f4da517785b1a";

 //this function works on city input and fetches data from API
const search_name_Api = () => {   
    const City_name = cityInput.value.trim();  // Use the input value for the city name
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




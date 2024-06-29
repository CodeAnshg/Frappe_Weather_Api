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

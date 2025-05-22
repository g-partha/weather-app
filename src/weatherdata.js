import { getCellFromDailyWeatherTable, searchButton, searchInput } from './gui';
import { locationDisplay, weatherIcon, metricToggle, usToggle } from './gui';

async function getWeather(location, unitSystem) {
  try {
    const result = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unitSystem}&key=PRRQ83876JF763S3NNWV8GCDV&contentType=json`,
    );
    return await result.json();
  } catch (error) {
    console.log(error);
  }
}

export async function showWeather(locationInput, unitSystemInput) {
  try {
    const data = await getWeather(locationInput, unitSystemInput);

    locationDisplay.textContent = data.resolvedAddress;
    const weatherIconImage = await import(`./weather-icons/${data.days[0].icon}.png`);
    weatherIcon.src = weatherIconImage.default;

    getCellFromDailyWeatherTable(0, 0).textContent = 'Today';
    getCellFromDailyWeatherTable(0, 1).textContent = data.days[0].tempmin;
    getCellFromDailyWeatherTable(0, 2).textContent = data.days[0].tempmax;
    getCellFromDailyWeatherTable(0, 3).textContent = data.days[0].precip;

    getCellFromDailyWeatherTable(1, 0).textContent = data.days[1].datetime;
    getCellFromDailyWeatherTable(1, 1).textContent = data.days[1].tempmin;
    getCellFromDailyWeatherTable(1, 2).textContent = data.days[1].tempmax;
    getCellFromDailyWeatherTable(1, 3).textContent = data.days[1].precip;

    getCellFromDailyWeatherTable(2, 0).textContent = data.days[2].datetime;
    getCellFromDailyWeatherTable(2, 1).textContent = data.days[2].tempmin;
    getCellFromDailyWeatherTable(2, 2).textContent = data.days[2].tempmax;
    getCellFromDailyWeatherTable(2, 3).textContent = data.days[2].precip;

    getCellFromDailyWeatherTable(3, 0).textContent = data.days[3].datetime;
    getCellFromDailyWeatherTable(3, 1).textContent = data.days[3].tempmin;
    getCellFromDailyWeatherTable(3, 2).textContent = data.days[3].tempmax;
    getCellFromDailyWeatherTable(3, 3).textContent = data.days[3].precip;
  }
  catch (error) {
    console.log('Error in showWeather', error);
  }
}

let currentUnitSystem = 'metric';
let currentLocation;

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  currentLocation = searchInput.value;
  showWeather(currentLocation, currentUnitSystem);
});

metricToggle.addEventListener("click", () => {
  if(currentUnitSystem === 'us'){
    currentUnitSystem = 'metric';
  showWeather(currentLocation, currentUnitSystem);
  }
})

usToggle.addEventListener("click", () => {
  if(currentUnitSystem === 'metric'){
    currentUnitSystem = 'us';
  showWeather(currentLocation, currentUnitSystem);
  }
})
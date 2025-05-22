//Following import is for test purpose only
// import sampleResult from './sampleresult.json';
//Above import is for test purpose only

import { getCellFromDailyWeatherTable, searchButton, searchInput } from './gui';
import { locationDisplay } from './gui';

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
  try{
  const data = await getWeather(locationInput, unitSystemInput);

  // Following declaration is for test purpose only
  // const data = sampleResult;
  // Above declaration is for test purpose only

  locationDisplay.textContent = data.resolvedAddress;
  
  getCellFromDailyWeatherTable(0, 0).textContent = data.days[0].datetime;
  getCellFromDailyWeatherTable(0, 1).textContent = data.days[0].tempmin;
  getCellFromDailyWeatherTable(0, 2).textContent = data.days[0].tempmax;
  getCellFromDailyWeatherTable(0, 3).textContent = data.days[0].precip;


  }
  catch(error){
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

//Add one switch for changing unit system which will:
// 1. Check if currentLocation is true
// 2. If currentLocation is true, will call showWeather with current location and seleted unit system ('metric'/ 'us')
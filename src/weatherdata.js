//Following import is for test purpose only
import sampleResult from './sampleresult.json';
//Above import is for test purpose only

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
  // const data = await getWeather(locationInput, unitSystemInput);

  // Following declaration is for test purpose only
  const data = sampleResult;
  // Above declaration is for test purpose only

  console.log(
    `Max temperature in ${data.resolvedAddress} on ${data.days[0].datetime} is ${data.days[0].tempmax}`,
  );
  }
  catch(error){
    console.log('Error in showWeather', error);
  }

}

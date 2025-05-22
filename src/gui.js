export const searchInput = document.querySelector('input#search-input');
export const searchButton = document.querySelector('button#search-button');
export const locationDisplay = document.querySelector('div#location-display');
const dailyWeatherTableArray = [[], [], []];

for(let i = 0; i < 3; i++){
    for(let j = 0; j < 4; j++){
        dailyWeatherTableArray[i][j] = document.querySelector(`table#daily-weather-table > tbody > tr:nth-child(${i + 1}) > :nth-child(${j + 1})`);
    }
}

export function getCellFromDailyWeatherTable(row, column){
    return dailyWeatherTableArray[row][column];
}

console.log(dailyWeatherTableArray);
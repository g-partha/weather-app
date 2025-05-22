export const searchInput = document.querySelector('input#search-input');
export const searchButton = document.querySelector('button#search-button');
export const locationDisplay = document.querySelector('div#location-display span');
export const weatherIcon = document.querySelector('#weather-icon');
export const metricToggle = document.querySelector('#metric');
export const usToggle = document.querySelector('#us');

const dailyWeatherTableArray = [[], [], [], []];

for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
        dailyWeatherTableArray[i][j] = document.querySelector(`table#daily-weather-table > tbody > tr:nth-child(${i + 1}) > :nth-child(${j + 1})`);
    }
}

export function getCellFromDailyWeatherTable(row, column){
    return dailyWeatherTableArray[row][column];
}
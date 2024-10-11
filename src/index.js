const cityInput = document.getElementById('cityInput');
const SHOULD_BE_IN_ENV='JPPTP2Z7DMHG2KAFAX5B7745S'
let weatherData = '';

axios.defaults.headers.common["x-api-key"] = SHOULD_BE_IN_ENV;


const getWeatherData = async (cityName) => {
    try {
        const validCityName = encodeURIComponent(cityName); 
        //encodeURIComponent allows a string to be inserted into a URI template literal
        const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${validCityName}`), 


        //loading
        weatherData = response.data
        showWeather();

		console.log(weatherData.currentConditions); 
		console.log(weatherData); 
    } catch (error) {
        console.log(error);
	}
}

//Regex filter for numbers and special characters

const cityValidationRegex = /^[a-zA-Z\s'-]+$/; 
function validateCity(){
    const cityMessage= document.getElementById("cityMessage");
    cityInput.addEventListener('input', ()=>{
        if (!cityValidationRegex.test(cityInput.value)){
            cityMessage.textContent = "Enter a valid city name"
        } else
        cityMessage.textContent="Enter your city and press enter"
    })
}
document.addEventListener('DOMContentLoaded', () => {
    validateCity();
    
});
const iconWeather = document.querySelector('#icon-weather');
const divTemp = document.querySelector('#divTemp')
const divLocation = document.querySelector('#divLocation')
const divWeatherDesc = document.querySelector('#divWeatherDesc')
const divFeelsLike =  document.querySelector('#divFeelsLike')

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const cityName = cityInput.value.trim();
        if (cityValidationRegex.test(cityName)) {
            getWeatherData(cityName);
            showWeather(weatherData);

        } else {
            cityMessage.textContent = "Enter a valid city name";
    }
    }
    
});

function showWeather() {
    if (!weatherData || !weatherData.currentConditions) {
        return; // Don't update if weatherData is not available
    }

    const divTemp = document.querySelector('#divTemp');
    const divLocation = document.querySelector('#divLocation');
    const divWeatherDesc = document.querySelector('#divWeatherDesc');
    const divFeelsLike = document.querySelector('#divFeelsLike');
    const iconWeather = document.querySelector('#divIconWeather');

    divTemp.textContent = `Temperature: ${weatherData.currentConditions.temp}°`;
    divLocation.textContent = `Location: ${weatherData.resolvedAddress}`;
    divWeatherDesc.textContent = `Weather: ${weatherData.description}`;
    divFeelsLike.textContent = `Feels Like: ${weatherData.currentConditions.feelslike}°`;
    //iconWeather.textContent= weatherData.iconWeather

}
// - [ ] toggle C/F
// - [ ] change backgorund based on conditions
// - [ ] 




//function loading(state) [ ]
const cityInput = document.getElementById('cityInput');
const SHOULD_BE_IN_ENV='JPPTP2Z7DMHG2KAFAX5B7745S'
let weatherData = '';

const getWeatherData = async (cityName) => {
    try {
        const validCityName = encodeURIComponent(cityName); 
        //encodeURIComponent allows a string to be inserted into a URI template literal
        const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${validCityName},US?key=${SHOULD_BE_IN_ENV}`);
        //loading
        weatherData = await data.json();
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


cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        const cityName = cityInput.value.trim();
        if (cityValidationRegex.test(cityName)) {
            getWeatherData(cityName);
        } else {
            cityMessage.textContent = "Enter a valid city name";
        }
    }
});

// - [ ] toggle C/F
// - [ ] change backgorund based on conditions
// - [ ] 

// weatherData.resolvedAddress
// weatherData.description
// weatherData.currentConditions.icon
// weatherData.currentConditions.feelslike



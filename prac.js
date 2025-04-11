const apiKey = "8f27ae47e19977bcecf34477136ec6a5";
const weatherData = document.getElementById("weather-data");
const formEl = document.querySelector("form");
const cityInputEl = document.getElementById("city-input");

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);

        if(!response.okay) {
            throw new Error("Your network connection is not ok")
        }

        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].descriptiopn;
        const icon = data.weather[0].icon;
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity} %`,
            `Wind speed: ${data.wind.speed} m/s`
        ];

        weatherDataEl.querySelector(".icon").innerHTML= `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector(".temparature").textContent = `${temperature}`
        weatherDataEl.querySelector(".temparature").textContent = `${description}`
        weatherDataEl.querySelector(".details").innerHTML = details.map((details) => `<div>${details}</div>`).join("");
        
    } catch (error) {
        // weatherDataEl.querySelector(".icon").innerHTML = ""
        // weatherDataEl.querySelector(".temparature").textContent = "An error happend, please try again later";
        // weatherDataEl.querySelector(".temparature").textContent = "'"
        // weatherDataEl.querySelector(".details").innerHTML = "";
    }

    weatherDataEl.querySelector(".icon").innerHTML = ""
    weatherDataEl.querySelector(".temparature").textContent = ""
    weatherDataEl.querySelector(".description").textContent ="An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = ""
}
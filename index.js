const userTab = document.querySelector("[data-userWeather");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-conatiner");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-conatiner");
const grantAccessButton = document.querySelector("[data-grantAccess]");
const searchInput = document.querySelector("[data-searchInput]");
const cityName = document.querySelector("[data-cityName]")
const countryIcon = document.querySelector("[data-countryIcon]");
const desc = document.querySelector("[data-weatherDesc]");
const weatherIcon = document.querySelector("[data-weatherIcon]");
const temp = document.querySelector("[data-temp]");
const windspeed = document.querySelector("[data-windSpeed]");
const humidity = document.querySelector("[data-humidity]");
const cloudiness = document.querySelector("[data-cloudiness]");
const error = document.querySelector(".error");

// *initial variables needed 
//? api key 
//? current tab
// console.log("hello jee");

let currentTab = userTab;

const API_key = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");
getFromSessionStorage();

// * 1 kaam or pending hai 
function switchTab(clickedTab) {

    // apiErrorContainer.classList.remove("active");

    if (clickedTab !== currentTab) {

        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
        error.classList.remove("active");

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else {
            // * main tab phele search vale tab pr tha,, ab your weather visable karna hai  

            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // ! in your weather tab > display weather
            // ? check local storage first > for coordinates if we have saved them there.
            getFromSessionStorage();
        }
        console.log("Current Tab", currentTab);
    }
}

userTab.addEventListener("click", () => {
    // *pass clicked tab as input parameter
    switchTab(userTab);
});
searchTab.addEventListener("click", () => {
    // *pass clicked tab as input parameter
    switchTab(searchTab);
});

// ? check if cordinates are already present in  session storage
function getFromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        // * agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates)
    }
}
async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // *make grant location invisible
    grantAccessContainer.classList.remove("active");
    // * make loader visible
    loadingScreen.classList.add("active");
    //?API CALL
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
        // console.log("error is coming in fetching the weather data: ", e);

    }
}
function renderWeatherInfo(weatherInfo) {
    //* ftch the elements
    // const cityName = document.querySelector("[data-cityName]")
    // const countryIcon = document.querySelector("[data-countryIcon]");
    // const desc = document.querySelector("[data-weatherDesc]");
    // const weatherIcon = document.querySelector("[data-weatherIcon]");
    // const temp = document.querySelector("[data-temp]");
    // const windspeed = document.querySelector("[data-windSpeed]");
    // const humidity = document.querySelector("[data-humidity]");
    // const cloudiness = document.querySelector("[data-cloudiness]");

    // * fetch values from weatherInfo
    //! ?. is used to feth items from json files
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log("No geolocation support available");
        alert("No geolocation support available");
    }
}
// function showPositions(possition) {
//     let lat = possition.coords.latitude;
//     let longi = possition.coords.longitude;

//     console.log(lat, longi);
// }
function showPosition(possition) {
    const userCoordinates = {
        lat: possition.coords.latitude,
        lon: possition.coords.longitude
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
grantAccessButton.addEventListener("click", getLocation);

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName == "") {
        return
    }
    else {
        fetchsearchWeatherInfo(cityName);
    }
})
async function fetchsearchWeatherInfo(city_name) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        if (typeof data?.main?.temp === "undefined") {
            error.classList.add("active");
        }
        else {
            userInfoContainer.classList.add("active");
            renderWeatherInfo(data);
        }
    }
    catch (err) {
        alert(err.message);
    }

}







// function renderWeatherInfomation(data) {
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} C`;
//     document.body.appendChild(newPara);

// }
// async function fetchWeatherDetails() {
//     try {
//         // let latitude =15.3333;
//         // let longitude = 74.0833;
//         let city_name = "delhi";

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}&units=metric`);
//         const data = await response.json();
//         // console.log("Weather data:->" + data);
//         //? this shows objects
//         console.log("Weather data:->", data);

//         renderWeatherInfo(data);


//         // let newPara = document.createElement('p');
//         // newPara.textContent = `${data?.main?.temp.toFixed(2)} C`;
//         // document.body.appendChild(newPara);
//     }
//     catch (e) {
//         console.log("error is coming in fetching the weather data: ", e);
//     }
// }
// async function getCustomWeatherDetails() {
//     try {
//         let latitude = 15.6333;
//         let longitude = 18.3333;
//         let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`);
//         let data = await result.json();
//         console.log(data);
//     }
//     catch (e) {
//         console.log("error is coming in fetching the weather data: ", e);
//     }

// }

var icon = document.querySelector("#icon");
// var icon = document.getElementById("icon");
icon.onclick = function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "./sun.png"
    }
    else {
        icon.src = "./moon.png"
    }
}
// icon.addEventListener("click", tfun());
// function tfun() {
//     document.body.classList.toggle("dark-theme");
//     if(document.body.classList.contains("dark-theme")){
//         icon.src="./sun.png"
//     }
//     else{
//         icon.src="./moon.png"
//     }
// }



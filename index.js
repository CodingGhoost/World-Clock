const timeForm = document.querySelector(".timeForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "YDKFJWm3U4WuzFb5IhSZ0Q==aTbSm7iAErRM2XUK";

timeForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const timeData = await getTimeData(city);
            displayTimeInfo(timeData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city")
    }
});

async function getTimeData(city){

    const apiUrl = `https://api.api-ninjas.com/v1/worldtime?city=${city}`;

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {'X-Api-Key': apiKey},
        contentType: 'application/json'
    });

    if(!response.ok){
        throw new Error("Could not fetch time data");
    }

    return await response.json();
}

function displayTimeInfo(data){

    console.log(data);
    
    const {name: city, 
           date: date, day_of_week: weekday, 
           hour: hour, minute: minute, timezone: tZone} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const dateDisplay = document.createElement("p");
    const weekdayDisplay = document.createElement("p");
    const timeDisplay = document.createElement("p");
    const tzoneDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    dateDisplay.textContent = date;
    weekdayDisplay.textContent = weekday;
    timeDisplay.textContent = `${hour}:${minute}`;
    tzoneDisplay.textContent = tZone;

    cityDisplay.classList.add("cityDisplay");
    dateDisplay.classList.add("dateDisplay");
    weekdayDisplay.classList.add("weekdayDisplay");
    timeDisplay.classList.add("timeDisplay");
    tzoneDisplay.classList.add("tzoneDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(dateDisplay);
    card.appendChild(weekdayDisplay);
    card.appendChild(timeDisplay);
    card.appendChild(tzoneDisplay);
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
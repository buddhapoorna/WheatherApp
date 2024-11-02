const form = document.getElementById("form");
const latitudeInput = document.getElementById("latitude");
const longitudeInput = document.getElementById("longitude");
const resultContainer = document.querySelector(".info");
const errorMessage = document.getElementById("error-message");

const aqiResult = document.getElementById("aqi");
const coResult = document.getElementById("co");
const no2Result = document.getElementById("no2");
const o3Result = document.getElementById("o3");
const pm25Result = document.getElementById("pm25");
const pm10Result = document.getElementById("pm10");
const so2Result = document.getElementById("so2");

let lastRequestTime = 0;  // Store the time of the last request
const requestInterval = 5000;  // Minimum interval between requests in milliseconds (5 seconds)

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.style.display = "none";  // Hide error message initially
  resultContainer.style.display = "none";  // Hide result initially

  const currentTime = Date.now();
  if (currentTime - lastRequestTime < requestInterval) {
    errorMessage.textContent = "Please wait before making another request.";
    errorMessage.style.display = "block";
    return;
  }
  lastRequestTime = currentTime;

  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;

  const url = `https://air-quality.p.rapidapi.com/history/airquality?lon=${longitude}&lat=${latitude}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '4c35fe5f37msh0fdba54a0d958d9p1c76f1jsne4d26da8c6c1', // here add your x-rapidapi-key from rapidapi website login there and search for air quality cheaker 
      'x-rapidapi-host': 'air-quality.p.rapidapi.com' // Specify the host for the air quality API from RapidAPI
    }
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(result => {
      if (result.data && result.data.length > 0) {
        let readings = result.data[0];
        aqiResult.textContent = readings.aqi;
        coResult.textContent = readings.co;
        no2Result.textContent = readings.no2;
        o3Result.textContent = readings.o3;
        pm25Result.textContent = readings.pm25;
        pm10Result.textContent = readings.pm10;
        so2Result.textContent = readings.so2;
        resultContainer.style.display = 'flex';
      } else {
        errorMessage.textContent = "No data available for the given coordinates.";
        errorMessage.style.display = "block";
      }
    })
    .catch(error => {
      errorMessage.textContent = "Error fetching air quality data: " + error.message;
      errorMessage.style.display = "block";
    });
});

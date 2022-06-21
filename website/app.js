/* Global Variables */
let zip = document.querySelector("#zip");
let generate = document.querySelector("#generate");
let entryHolder = document.querySelector("#entryHolder");
let feelings = document.querySelector("#feelings");
let main = document.querySelector('main');

// Personal API Key for OpenWeatherMap API
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=721e619d4aeee7c3a28a87c81f601cc1&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + (d.getMonth() + 1)+ "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", clickListener);
/* Function called by event listener */
async function clickListener() {
  // check input have only number and not empty
  if (zip.value != '' && !isNaN(zip.value)) {
    await getDataFromApi().then((data)=>{
    // post data to the server
      postData('/addData', { date: newDate, temp: data.main.temp, feelings: feelings.value})
    }).then(()=>{
      UpdateGUI();
    })
  }
}

/* Function to GET Web API Data*/
let getDataFromApi = async () => {
  return await fetch(apiUrl + zip.value + apiKey)
    .then((data) => {
      return data.json();
    })
    .catch((error) => console.error(error));
};

/* Function to POST data */
// Async POST
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
};

/* Function to GET Project Data */
let getDataFromserver = async () => {
  return await fetch('/getData')
    .then((data) => {
      return data.json();
    })
    .catch((error) => console.log(error));
};

async function UpdateGUI(){
  await getDataFromserver().then((allData)=>{
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temp)} degrees`;
    document.getElementById('content').innerHTML = `Feeling: ${allData.feelings}`;
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
  }).catch((error) => console.log(error))
}
projectData = {}

// Port
const port = 3000;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
//api -> server -> gui
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
  console.log(`server is running`);
})

// Initialize all route with a callback function
app.get('/getdata', getData);
app.post('/adddata', addData);

// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);
}

// Post Route
function addData(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['feelings'] = req.body.feelings;
  res.send(projectData);
}
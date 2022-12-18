/*
    Created By : Vikram Markali
*/

// importig required packages...
const express = require("express");
const https  = require("https");
const bodyParser = require("body-parser");

// creating the object of express.js...
const app = express();
app.use(bodyParser.urlencoded({extended: true}));   //use body parser for input...
app.use(express.static("public"));  //set folder for static files...

// request for user input...
app.get("/",function(req, res){

    res.sendFile(__dirname + "/index.html");

});

// taking input from user...
app.post("/",function(req,res){

    // console.log(req.body.city)
    const query = req.body.city;
    const apiKey = "71a8ffacec2e160e12daead4b18f5380";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    
    // fetching the api...
    https.get(url, function(response){
        console.log(response.statusCode)

        // coverting the api data into json format...
        response.on("data", function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

            // writing the output on browser...
            res.write("<p>weather is currently " + desc + "</p>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " Degree celcius..</h1>");
            res.write("<img src="+ imageURL +">");
            res.send();
        });
    });
})

//hosting details...

const hostName = "0.0.0.0";
const port = 3000;

// assigning the port for working...
app.listen(port,hostName,function(){
    console.log("Server started at https://${hostName}:${port}/");
});

 
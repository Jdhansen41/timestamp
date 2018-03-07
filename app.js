var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());


//CALL TO RETURN JSON
app.get('/:dateValues', function(req,res,next){
   var dateValues = req.params.dateValues;
   
   //Options for formatting date 
   var dateFormat = {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
   }
   if(isNaN(dateValues)){
       //if it's a string, create a new date from it and format it using toLocaleDateString
       var naturalDate = new Date(dateValues);
       var unixDate;  
       
       if(naturalDate == "Invalid Date"){
           naturalDate = null;
           unixDate = null;
       }else{
           naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
       unixDate = new Date(dateValues).getTime()/1000;
       }
   }else{
       //if param is a number
       var unixDate = dateValues; //unix date is just the number
       var naturalDate = new Date(dateValues * 1000);
       naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
   }
   
   res.json({unix: unixDate, natural: naturalDate});
});



app.listen(process.env.PORT, process.env.IP, function(){ //What actually sets up the server
    console.log("Server is running");
});
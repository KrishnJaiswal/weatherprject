const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  console.log(req.body.cityName);
  const query=req.body.cityName;
  const unit="metric";
  const apiKey="810fb92fe23ebb5f7138ae06703b3b5b"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
  https.get(url,function(response){
    console.log(response.statusCode)
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const weatherTemp=weatherData.main.temp
      const weatherDescription=weatherData.weather[0].description
      console.log(weatherData);
      const weathericon=weatherData.weather[0].icon
      const imgUrl="http://openweathermap.org/img/wn/"+weathericon+"@2x.png";
      console.log(weatherTemp+"and"+weatherDescription);
      res.write("<p>The weather is currently"+weatherDescription+"<\p>");
      res.write("<h1>The temperature of "+query+weatherTemp+" degree celcius<\h1>");
      res.write("<img src="+imgUrl+">")
      res.send();
    })
  })
});
//

//
//
// })
//
app.listen(3000,function(){
  console.log("Server is running on Port:3000.");
})





const express = require('express')
const axios = require('axios')
const port = 3000;

const app = express();
const bodyParser = require('body-parser');
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("https");
const { error } = require('console');



const apiKey = '9e1ad7b033ff33905c3e7b861e8b432b'
const city = 'Nur-Sultan'
const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

app.set('view engine', 'ejs');
app.post('/', function(req,res) {
    console.log(req.body.geolocation)
            var city = req.body.city;
    
    const address = req.query.address;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    axios.get(url).then(resp => {
        const data = resp.data;
        console.log(data)
        const city = data.name;
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const temp = data.main.temp;
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString()
        res.render('index', {data: data, latitude:lat, longitude:lon, city:city, data:data, temp:temp, sunsetTime:sunsetTime})
    }).catch(err => {
        res.send('Invalid city name')
    })
    // var city = req.body.city;
    
    // const address = req.query.address;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    // axios.get(url).then(resp => {
    //     const data = resp.data;
    //     const city = data.name;
    //     const lat = data.coord.lat;
    //     const lon = data.coord.lon;
    //     const temp = data.main.temp;
    //     const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString()
    //     res.render('index', {data: data, latitude:lat, longitude:lon, city:city, data:data, temp:temp, sunsetTime:sunsetTime})
    // }).catch(err => {
    //     res.send('Invalid city name')
    // })
})

app.get('/', (req, res) => {
    res.render('search')
})
app.listen(port, () => console.log(`Server started on port ${port}.`))

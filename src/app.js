require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: '🌞 Weather Application 🌞',
        name: 'Tushar'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: '🌞 About 🌞',
        name: 'Tushar'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: '🌞 Help 🌞',
        message: 'Build using Node, Express. Weather Information from WeatherStack.com. Location service from mapbox.com',
        name: 'Tushar'
    })
});

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Address param is missing'
        })
    }

    geocode(req.query.address, (error, {latitude, longitute, location} = {})=>{
        if(error) {
          return res.send({
              error,
              type: 'geocode'
          });
        }
        forecast(latitude, longitute, (error, forecastData)=>{
          if(error) {
            return res.send({
                error,
                type: 'forecast'
            });
          }
          console.log(location);
          console.log(`${forecastData.description}. It's currently ${forecastData.temprature}°. It feels like ${forecastData.feelslike}°.`);

          res.send({
            location,
            address: req.query.address,
            temprature: forecastData.temprature,
            feelslike: forecastData.feelslike,
            description: forecastData.description,
            icon: forecastData.icon,
            time: forecastData.time
            });
        });
           
      });
});

app.get('/products', (req, res)=>{
    
    if(!req.query.search) {
        return res.send({
            error: 'Search Param is missing'
        });
    }
    res.send({
        product: req.query.search
    });
});

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help Not Found',
        message: 'Help article requested is not found',
        name: 'Tushar'
    })
});

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Page Not Found',
        message: 'Page requested is not found',
        name: 'Tushar'
    })
});

app.listen(process.env.PORT, ()=>{
    console.log('Server is up on port 3000');
});
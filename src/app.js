const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

const port = process.env.PORT || 3000

// define paths for express config.
const publicDirectoryName = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)   //changing the default path from views folder to templates folder.
hbs.registerPartials(partialPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryName))  //giving express access to public folder.

app.get('',(req, res) => {
  res.render('index', {   //looks for views folder in root directory.
    title: 'Home',
    name: 'Abhishek'
  })
})

app.get('/about',(req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Abhishek'
  })
})

app.get('/help',(req, res) => {
  res.render('help', {
    helpText: 'This is help!',
    title: 'Help',
    name: 'Abhishek'
  })
})

app.get('/weather', (req, res) => {

  // res.send({    //looks in public folder for match.
  // forecast: 'It is missing',
  // location: 'Dumka'

  const address = req.query.address
    if(!address) {
      return res.send({
        error: 'provide an address!'
      })
    }
      geocode(address,(error, { longitude, latitude, location } = {}) => {
        if(error) {
        return res.send({
          // error: error
          error
        })
      }
      forecast(longitude,latitude,(error,forecast_data) => {
        if(error) {
          return res.send({ error })
        }
        res.send({
          forecast: forecast_data,
          location,
          address
        })
      })
    })
  })


  app.get('/product', (req,res) => {
  if(!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    name: 'Abhishek',
    title: 'Help/404',
    errorMessage: 'Help article not found!'
  })
})

app.get('*', (req,res) => {
  res.render('404', {
    name: 'Abhishek',
    title: '404',
    errorMessage: 'Page not found!'
  })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

const express = require('express')
const cors = require('cors')
const logger = require('express-logger')
const morgan = require('morgan')

//for making http calls in node rather than axios..çç
const fetch = require('node-fetch')

const app = express()

// set port for your server
app.set('port', process.env.PORT || 200)

// debugging and logging
switch (app.get('env')) {
  case 'development':
    // compact, colorful dev logging
    app.use(morgan('dev'))
    //Use this when u want to pass in a request body
    //app.use(express.json({ limit: "50mb", extended: true }));
    break
  case 'production':
    // module 'express-logger' supports daily log rotation
    app.use(
      logger({
        path: __dirname + '/log/requests.log',
      })
    )
    break
}

// adding cors to api routes to accept requests from other origins
app.use('/api', cors())

app.get('/api/rates', (req, res) => {
  // destructure query params
  let { base, currency } = req.query

  // checks if the user entered a string and converts to uppercase
  base = typeof base !== undefined ? base.trim().toUpperCase() : ''

  // comsume api and return responses accordingly
  fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
    .then((res) => res.json())
    .then((json) => {
      currency = typeof currency !== undefined ? currency.trim().split(',') : []

      // created an empty object to store currency rates
      let rates = {}
      currency.forEach((rate) => {
        finalRate = rate.toUpperCase() || undefined
        if (rate.length >= 1) {
          rates[finalRate] = json.rates[finalRate] || 'not available for now'
        } else {
          rates[finalRate] = json.rates[finalRate]
        }
      })

      const data = {
        results: {
          base: base,
          date: json.date,
          rates: rates,
        },
      }
      // return a response with a status of 200
      return res.send(data).status(200)
    })
    .catch((err) => {
      // return an error with 404
      return res.send(err)
    })
})

// 404
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not found')
})

// 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send(err)
})

// PORT
app.listen(app.get('port'), () => {
  console.log(
    `Express started on http://localhost:${app.get(
      'port'
    )}; press Ctrl-C to terminate.`
  )
})

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000
// imports the API from the routes/api folder
const scores = require('./routes/api/golf')

// sets up CORS for Cross-Origin-Resource-Sharing
app.use(cors())

// converts API responses to JSON for easy use
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// initializes our database using the credentials
// imports our database credentials (stored separately for security)
const db = require('./config/keys').mongoURI
mongoose.set('useFindAndModify', false)
mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Mongo Database connected'))
  .catch(err => console.log(err))

// creates a route where we can interact with our API
app.use('/api/golf', scores)

// intializes the server and logs a message
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
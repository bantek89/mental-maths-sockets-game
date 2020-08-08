/*
 * Copyright 2019 Atom Learning
 *
 */
const express = require('express')
const path = require('path')

const config = require('./config/server_config')
const apiRoute = require('./routes/api')
const competition = require("./server/competition");

//Set up express & sessions
const app = express()

//Don't advertise that this is express
app.disable('x-powered-by')

//Deply static files and views
app.use(express.static(config.web.public_location))

//Deploy API
app.use('/api', apiRoute.getRoute())

app.get('/', (req, res, next) => {
  res.sendFile(path.join(config.web.public_location, 'index.html'))
})

/**
 * Start server
 * @type type
 */
const server = app.listen(config.web.port, function (err) {
  if (err) return err
  const port = server.address().port
  console.log('(HTTP) App now running on port', port)
})

competition.setServer(server);

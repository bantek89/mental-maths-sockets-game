const config = exports

const path = require('path')

config.web = {}

config.web.port = process.env.WEB_PORT || 4444
config.web.public_location = path.join(__dirname, '..', '/public')

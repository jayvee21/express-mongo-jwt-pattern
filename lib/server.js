/**
 * API server
 */

// Dependencies
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const conf = require('./conf') 

/**
 * API container (to be export)
 */
var server = {}
server.apiServer = express()
// Cors
server.apiServer.use(cors())
// Body-parser
server.apiServer.use(bodyParser.urlencoded({ extended: false}))
server.apiServer.use(bodyParser.json())

/**
 * Static index page
 */
server.apiServer.get('/', function(req, res){
    res.setHeader('Content-type',  'application/json')
    res.end( JSON.stringify({ 'message' : 'Welcome to API' }) )
})

// Routers

let userRouter = require('./routers/users')
server.apiServer.use( '/users', userRouter )


/**
 * Init script
 * Start the API
 */
server.init = function() {
    server.apiServer.listen( conf.port, () => console.log( `API is running at Port: ${conf.port}` ) )
}


// Export the API container
module.exports = server
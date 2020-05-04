/**
 * Primary file
 */

// Dependencies
var server = require('./lib/server')

// Declare the app
var app = {}

/**
 * Init script
 */
app.init = function(){
    // start the API server
    server.init()
}


// Execute 
app.init()  


module.exports = app
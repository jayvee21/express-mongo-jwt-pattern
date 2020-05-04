/**
 * Helpers for various tasks
 */

// Dependencies


// Container for the module to be export
var helpers = {}



/**
 * Handle server responses for the API
 */
helpers.handleServerResponse = function(response, statusCode, payload){

    statusCode = typeof(statusCode) == 'number' ? statusCode : 200
    payload = typeof(payload) == 'object' ? payload : {}
    var payloadString = JSON.stringify( payload )
    // Return the response
    response.setHeader('Content-type','application/json')
    response.writeHead(statusCode)
    response.end(payloadString)

}

// Export the helper objects
module.exports = helpers
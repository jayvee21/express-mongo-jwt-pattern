/**
 * Helpers for various tasks
 */

// Dependencies


// Container for the module to be export
var helpers = {}
const tokenService = require('./middleware/tokenService')


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


/**
 * Guard data from user 
 * required: token, user_id
 */
helpers.guardDataAccess = async ( token, userId, callback ) => {
    let tokenObj = await tokenService.decode( token )

    tokenObj = typeof( tokenObj ) == 'object' ? tokenObj : false
    
    if( tokenObj ){
        // Check if the userID on the token is the same on data user_id
        if( tokenObj.id == userId ) {
            callback(tokenObj)
        }else{
            callback(tokenObj)
        }
        
    }else{
        callback(tokenObj)
    }
}

// Export the helper objects
module.exports = helpers
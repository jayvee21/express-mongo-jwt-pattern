/**
 * Handler for user related requests
 */

// Dependencies


// Container for the module (to be export)
var users = {}



/**
 * Get - User
 * Required fields: none
 * Optional fields: none 
 */
users.get = function( req, callback ) {

    /**
     * Callback arguments
     * arg: statusCode as number
     * arg: Object payload
     */
    callback(200, {'data': 'Sample user data'})

}



module.exports = users


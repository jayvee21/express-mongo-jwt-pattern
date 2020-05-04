/**
 * Router that will handle all User's request
 */

// Dependencies
const express = require('express')
let router = express.Router()
let userHandler = require('./../handlers/usersHandler')
let helpers = require('./../helpers') 
/**
 * Get user
 */

router.get('/', function(req, res){

    // Pass the request to the handler
    userHandler.get( req, function( statusCode, payload ){
        // Pass the callback status code and payload on helpers and helpers will handleend back the response to the API
        helpers.handleServerResponse(res, statusCode, payload)
    })

})



// Export the router
module.exports = router


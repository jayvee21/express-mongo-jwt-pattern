/**
 * Router that will handle all User's request
 */

// Dependencies
const express = require('express')
let router = express.Router()
let userHandler = require('./../handlers/usersHandler')
let helpers = require('./../helpers') 
let tokenVerifier = require('./../middleware/tokenVerifier')
/**
 * List Users
 */
router.get('/', function(req, res){

    // Pass the request to the handler
    userHandler.get( req, function( statusCode, payload ){
        // Pass the callback status code and payload on helpers and helpers will handleend back the response to the API
        helpers.handleServerResponse(res, statusCode, payload)
    })

})

/**
 * Post User
 * User creation
 */
router.post('/', function(req, res){

    // Pass the request to the handler
    userHandler.create( req, function( statusCode, payload ){
        // Pass the call back (status code and payload) on helpers,
        // Helpers will handle the response to the client.
        helpers.handleServerResponse(res, statusCode, payload)
    })

})

/**
 * Login user
 */
router.post('/login', (req, res)=>{

    // Pass the request to the handler
    userHandler.login( req,  ( statusCode, payload )=>{
        // Pass the call back (status code and payload) on helpers,
        // Helpers will handle the response to the client.
        helpers.handleServerResponse(res, statusCode, payload)
    })

})

/**
 * Get user details
 * @required: headers : jwt_key
 */
router.get('/:id', tokenVerifier.checkToken, ( req, res ) => {
   
    // Pass the request to the handler
    userHandler.getDetails( req,  ( statusCode, payload )=>{
        // Pass the call back (status code and payload) on helpers,
        // Helpers will handle the response to the client.
        helpers.handleServerResponse(res, statusCode, payload)
    })
    
})

// Export the router
module.exports = router


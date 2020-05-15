/**
 * Handler for user related requests
 */

// Dependencies
var UsersModel = require('./../models/UserModel')

// Container for the module (to be export)
var users = {}



/**
 * Get - User List
 * Required fields: none
 * Optional fields: none 
 */
users.get =  function( req, callback ) {

    /**
     * Callback arguments
     * arg: statusCode as number
     * arg: Object payload
     */
    UsersModel.find({}, (err, userDoc) =>{
        if(!err && userDoc){
            callback(200, userDoc)
        }else{
            callback(400, err)
        }
    })
   
}

/**
 * Post - User creation
 * Required fields: firstName, lastName, email and password
 * Optional: none
 */
users.post = async function  (req, callback){
    // Create new User Record
    let newUser =  UsersModel( req.body )
    try{
        let createdUser = await newUser.save()
        let token = await createdUser.generateAuthToken()
        // Delete password from response
        delete createdUser.password
        callback(200, {createdUser, token})
    }catch( e ){
        console.log(e)
        callback( 400, e ) 
    }
}


/**
 * PUT - User update
 */




module.exports = users


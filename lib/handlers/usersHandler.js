/**
 * Handler for user related requests
 */

// Dependencies
var UsersModel = require('./../models/UserModel')

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
    UsersModel.find({}, (err, documents) =>{
        if(!err && documents){
            callback(200, documents)
        }else{
            callback(400, err)
        }
    })
   
}

/**
 * Post - User
 * Required fields: firstName, lastName, email and password
 * Optional: none
 */
users.post = function(req, callback){
    // Sanitation checking

    // Construct the User data
    let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hashedPassword: req.body.password,
        email: req.body.email
    }
    // Create new User Record
    let newUser = new UsersModel( userData )
    newUser.save().then( document => {
      callback(200, document)
    }, function( errRejected ){
        console.log('rejected', errRejected)
        callback( 400, errRejected )
    }).catch( err =>{
        console.log('catch', err)
        callback(500, {'error': "Could not save the new user record. Check database connection.", 'catch': err})

    })
}




module.exports = users


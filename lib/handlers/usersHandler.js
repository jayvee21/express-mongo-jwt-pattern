/**
 * Handler for user related requests
 */

// Dependencies
var UsersModel = require('./../models/UserModel')
var helpers = require('./../helpers')
// Container for the module (to be export)
var users = {}



/**
 * Get - User List
 * Required fields: none
 * Optional fields: none 
 * Response: Callback( statusCode, object payload)
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
 * Required fields: firstName, lastName, email and password (as payload)
 * Optional: none
 * Response: Callback( statusCode, object payload)
 */
users.create = async (req, callback) => {
    // Create new User Record
    let newUser =  UsersModel( req.body )
    try{
        let createdUser = await newUser.save()
        let token = await createdUser.generateAuthToken()

        // Delete password from response
        let userObj = createdUser.toObject()
        delete userObj.password

        callback(200, {userObj, token})
    }catch( e ){
        console.log(e)
        callback( 400, e ) 
    }
}


/**
 * Post Login - User Login
 * Required fields:  email and password (as payload)
 * Response: Callback( statusCode, object payload)
 */

users.login = async ( req, callback ) =>{

    try{
        // Use the statics method created inside the User model.
        // Pass the email and password
        let user = await UsersModel.findByCredentials( req.body.email, req.body.password )
        // Since generatAuthToken is method. it is encapsulated in the "user" result above
        let token = await user.generateAuthToken()

        // Do not include the password from the response
        let userObj = user.toObject()
        delete userObj.password

        callback(200, {userObj, token})
    }catch(e){
        console.log(e) // to debug error.
        // UserModel.findByCredentials - will throw an error if the user cant be found
        callback(400, {'error': 'Invalid Login'})
    }
}

/**
 * Get - User details
 * Required field: jwt_key (as header)
 */
users.getDetails = async ( req, callback ) =>{

    
    // Find the user
    const userId = req.params.id

    const userData = await UsersModel.findById(userId)

    // Prevent accessing data that is not associated with them, check if a truthful request.
    helpers.guardDataAccess( req.headers.jwt_key, userData._id.toString(), ( tokenObj )=>{

        if(tokenObj){
            // Delete password from the response
            let userObj = userData.toObject()
            delete userObj.password
            console.log("decoded token object", tokenObj)
            callback(200,userObj)
        }else{
            callback(403, {'error': 'Unauthorize acess.'})
        }

    })
    
}



// Export module
module.exports = users


/**
 * Users model
 */

// Dependencies
const mongodb = require('./../mongodb')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const tokenService = require('./../middleware/tokenService')
// Construct the Users schema
let UserSchema = new mongodb.Schema({
    fullName : {
        type: String,
        trim: true,
        required: [ true, "name field is required"]
    },
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value){
            // Use the validator module to validate if email provided is valid
            if( !validator.isEmail( value ) ){
                throw new Error('Invalid email')
            }
        }
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password must be atleast 8 characters.']
    }
})


// Generate a token
UserSchema.methods.generateAuthToken = async function(){
    const user = this
    delete user.password
    const token  = await tokenService.sign( { name: user.fullName, id: user._id.toString() } )
    return token
}

// Find user record
UserSchema.statics.findByCredentials = async function( email, password ) {
    
    const user = await User.findOne({ email }) // Await User is referenced below (  const User = mongodb.model('Users', UserSchema) )

    if( !user ){
        throw new Error('User does not exist.')
    }

    const isMatch = await bcrypt.compare( password, user.password )
    if( !isMatch ){
        throw new Error('Invalid Login')
    }
    return user;
}

/**
 * Middleware
 */

 // Hash the password before saving.
 UserSchema.pre('save', async function(next){
     // User is the object data before creating a document or updating.
     const user = this

     // Will true for update and create. If field password is included

     if( user.isModified('password')  ){
         user.password = await bcrypt.hash( user.password, 8 )
     }
     
     next()
 })

 const User = mongodb.model('Users', UserSchema)

// Export the Model
module.exports = User
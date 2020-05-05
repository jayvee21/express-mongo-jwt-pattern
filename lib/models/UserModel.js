/**
 * Users model
 */

// Dependencies
var mongodb = require('./../mongodb')


// Construct the Users schema
let UsersSchema = new mongodb.Schema({
    firstName : {
        type: String,
        default: "",
        required: [ true, "First name field is required"]
    },
    lastName : {
        type: String,
        default: "",
        required: [ true, "Last name field is required"]
    },
    email : {
        type: String,
        default: "",
        required: [ true, "Email field is required"]
    },
    hashedPassword : {
        type: String,
        default: "",
        required:  [ true, "Hashed Password field is required"]
    }
})


// Export the Model
module.exports = mongodb.model('Users', UsersSchema)
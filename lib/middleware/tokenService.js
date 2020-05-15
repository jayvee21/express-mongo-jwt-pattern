/**
 * Primary library for token related service
 * sign - Creating a new token ( e.g Successful login )
 * verify - Verifying given token
 * decode - Decoding token into object
 */

var fs = require('fs')
var path = require('path')
var conf = require('./../conf')
const privateKey = fs.readFileSync( path.join( __dirname, '/../certificates/private.key' ) )
const publicKey = fs.readFileSync( path.join( __dirname, '/../certificates/public.key' ) )
const jwt = require('jsonwebtoken')
var tokenLib = {}

tokenLib.sign =  (payload) => {
        // Token signing options
        let signOptions = {
            issuer: conf.tokenService.issuer,
            subject: conf.tokenService.subject,
            audience : "api.hq",
            expiresIn: "30d",
            algorithm: "RS256"
        }
        return jwt.sign(payload, privateKey, signOptions)
}

tokenLib.verify = async ( token, callback ) => {
    // Token signing options
    let verifyOption = {
        issuer: conf.tokenService.issuer,
        subject: conf.tokenService.subject,
        audience: "api.hq",
        expiresIn: "30d",
        algorithm: ["RS256"]
    }

    try{
        let issued_token = await jwt.verify(token, publicKey, verifyOption)
        callback(false, issued_token)
    }catch(err) {
        callback(true)
    }
}

tokenLib.decode = (token) => {
    return jwt.decode(token, {complete: true}); // returns null if token is invalid
}

// Export container module
module.exports = tokenLib
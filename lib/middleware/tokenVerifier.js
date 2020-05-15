/**
 * Lib file verifying token from the user
 */

 // Dependemcies
 const tokenService = require('./tokenService')

 module.exports = {
     checkToken : function( req, res, next ) {

        // Check if TOKEN is present on token
        let token = typeof( req.headers.jwt_token ) != 'undefined' 
                    && typeof(req.headers.jwt_token) == 'string' 
                    && req.headers.jwt_token.trim().length > 0 
                    ? req.headers.jwt_token.trim() : false

        if(token ){
            tokenService.verify( token, function(err, isValidToken){
                
                if(!err && isValidToken){
                    next()
                }else{
                    return res.status(403).json({ 'Error': 'Not a valid client.' });
                }
            })
        }else{
            return res.status(403).json({'Error': 'Valid headers not present or invalid header value given.'});
        }
     }
 }
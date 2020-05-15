/**
 * Lib file verifying token from the user
 */

 // Dependemcies
 const tokenService = require('./tokenService')

 module.exports = {
     checkToken : function( req, res, next ) {

        // Check if TOKEN is present on token
        let token = typeof( req.headers.jwt_key ) != 'undefined' 
                    && typeof(req.headers.jwt_key) == 'string' 
                    && req.headers.jwt_key.trim().length > 0 
                    ? req.headers.jwt_key.trim() : false

        if( token ){
            tokenService.verify( token, function(err, isValidToken){
                
                if(!err && isValidToken){
                    next()
                }else{
                    return res.status(403).json({ 'Error': 'Invalid authen given.' });
                }

            })
        }else{
            return res.status(403).json({'Error': 'Missing required field: jwt_key in headers.'});
        }
     }
 }
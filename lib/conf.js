/**
 * Primary configuration of the API
 */
/**
 * Primary configuration of the API
 */

// Container for config
var environments = {}
environments.staging = {

    'port' : 3000,
    'secretKey': 'This is a sample key',  // Generate a strong key
    'tokenService': {
        'issuer' : 'Your app name', // For JWT serialization purpose
        'subject' : 'Your app subject' // For JWT serialization purpose
    },
    'audience': {
        'web.uptime.com': {
            'secretKey': 'client_secret_key'
        }
    }

}


// Production environment
environments.production = {

    'port' : 80,
    'secretKey': 'This is a sample key',  // Generate a strong key
    'tokenService': {
        'issuer' : 'Your app name', // For JWT serialization purpose
        'subject' : 'Your app subject' // For JWT serialization purpose
    },
    'audience': {
        'web.uptime.com': {
            'secretKey': 'client_secret_key'
        }
    }

}

// Determine which env was passed a command-line argument
var currentEnvironment = typeof(environments[process.env.NODE_ENV] == 'string')
                        ? process.env.NODE_ENV : ''

// Check that the current environment is one of the environments above, if not, default to staging
var environmentToExport = typeof(currentEnvironment)== 'object' ? environments[currentEnvironment] : environments.staging



// Export config
module.exports = environmentToExport
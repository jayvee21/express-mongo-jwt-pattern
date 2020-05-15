/**
 * Primary configuration of the API
 */

// Container for config
var environments = {}
environments.staging = {

    'port' : 3000,
    'tokenService': {
        'issuer' : 'yourAppName', // For JWT serialization purpose
        'subject' : 'web.api' // For JWT serialization purpose
    }

}


// Production environment
environments.production = {

    'port' : 80,
    'tokenService': {
        'issuer' : 'yourAppName', // For JWT serialization purpose
        'subject' : 'web.api' // For JWT serialization purpose
    }

}

// Determine which env was passed a command-line argument
var currentEnvironment = typeof(environments[process.env.NODE_ENV] == 'string')
                        ? process.env.NODE_ENV : ''

// Check that the current environment is one of the environments above, if not, default to staging
var environmentToExport = typeof(currentEnvironment)== 'object' ? environments[currentEnvironment] : environments.staging



// Export config
module.exports = environmentToExport
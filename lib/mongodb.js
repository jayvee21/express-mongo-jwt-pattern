/**
 * Mongoo DB connection
 */

// Dependencies
let mongoose = require('mongoose')



// Instantiate connections
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
    if(err){
        console.log("Could not connect to the database") 
    }
})

// Export mongoose connections
module.exports = mongoose
/**
 * Mongoo DB connection
 */

// Dependencies
let mongoose = require('mongoose')



// Instantiate connections
mongoose.connect('mongodb://127.0.0.1:27017/api_sample', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, function(err){
    if(err){
        console.log("Could not connect to the database") 
    }
})

// Export mongoose connections
module.exports = mongoose
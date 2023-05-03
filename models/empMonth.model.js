const mongoose = require('mongoose');   
 
var empMonthSchema = new mongoose.Schema({
    month : {
        type: String, 
    }, 
    photo : {
        type: String, 

    }
}); 
 
 

module.exports =  mongoose.model('empMonth', empMonthSchema); 
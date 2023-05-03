const mongoose = require('mongoose');   
//Schema=mongoose.Schema;
 
var notesSchema = new mongoose.Schema({
    
    title: {
        type: String
    },
    reminder : {
        type: String 
    },
    color : {
        type: String
    },
    description: {
        type: String
    },  
    date : {
        type: Date,
        default: Date.now()
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
            //type:String
    }
}); 
 
 

module.exports =  mongoose.model('Notes', notesSchema);
//const User = mongoose.model('User', userSchema);  
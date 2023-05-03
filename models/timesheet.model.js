const mongoose = require('mongoose');   
//Schema=mongoose.Schema;
 
var timesheetSchema = new mongoose.Schema({
    loginName : {
        type: String 
    },
    date : {
        type: String  
    },
	dateplusEmpId: {
        type: String,
		unique: true
    },
    month : {
        type: String 
    }, 
    project : {
        type: String
    },
    hours: {
        type: Number
    }, 
    description: {
        type: String
    },  
    newFormAppend :[
         
    ],  
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
        //type:String
    }
}); 
 
 

module.exports =  mongoose.model('Timesheet', timesheetSchema);
//const User = mongoose.model('User', userSchema);  
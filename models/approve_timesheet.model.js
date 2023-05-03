const mongoose = require('mongoose');   
//Schema=mongoose.Schema;
 
var approveTimesheetSchema = new mongoose.Schema({
    
    userName: {
        type: String
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId, 
    },
    month : {
        type: String
    },
    status: {
        type: String
    },  
    reason : {
        type: String
    }, 
    userIdPlusMonth: {
        type: String,
		unique: true
    },
    markAsRead: {
        type: String
    }, 
}); 
 
 

module.exports =  mongoose.model('ApproveTimesheet', approveTimesheetSchema);
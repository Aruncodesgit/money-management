const mongoose = require('mongoose');

var leaveSchema = new mongoose.Schema({
    loginId: {
        type: String
    },
    empName : {
        type: String
    },
    leaderName : {
        type: String
    },
    type: {
        type: String
    }, 
    from: {
        type: String
    }, 
    to: {
        type: String
    },
    reason: {
        type: String
    }, 
    user_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required :true
    },
    status : {
        type: String
    },
    comment : {
        type: String
    },
    daysCount : {
        type:Number
    }
});

mongoose.model('Leave', leaveSchema);
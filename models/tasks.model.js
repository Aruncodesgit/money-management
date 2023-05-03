const mongoose = require('mongoose');

var tasksSchema = new mongoose.Schema({
    task_id : {
        type: mongoose.Schema.Types.ObjectId, 
    },
    projName: {
        type: String
    }, 
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
    },
	uniqueField: {
        type: String,
		unique: true
    },
    username : {
        type: String 
    },
    description : {
        type: String
    }, 
    taskStatus : {
        type: String
    },
	percentage: {
        type: String
    },
    leader_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Leader",
        required :true
    }
	
});

mongoose.model('Tasks', tasksSchema);
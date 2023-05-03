const mongoose = require('mongoose');

var projectsSchema = new mongoose.Schema({
    name: {
        type: String
    }, 
    startDate: {
        type: String
    },
    endDate: {
        type: String
    }, 
    description : {
        type: String
    }, 
    status : {
        type: String
    }, 
    logo : {
        type: String
    } ,
	leaderName: {
		type: String
	},
    leader_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Leader",
        required :true
    }, 
    daysCount: {
        type: Number
    }, 
	projectMonth: {
		type: String
	},
    // assignedTo : [
    //     { emp_id: String , empName: String, taskName: String},
    // ]
});

mongoose.model('Projects', projectsSchema);
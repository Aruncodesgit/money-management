const mongoose = require('mongoose');

var pointsSchema = new mongoose.Schema({ 
    username : {
        type: mongoose.Schema.Types.ObjectId, 
    },
	projName: {
        type: String
    }, 
	points: {
        type: Number
    }, 
    description: {
        type: String
    }, 
    leader_id :{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Leader",
        required :true
    }, 
});

mongoose.model('Points', pointsSchema);
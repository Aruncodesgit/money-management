const mongoose = require('mongoose');

var addMoneySchema = new mongoose.Schema({  
    status: {
        type: String
    },
    title : {
        type: String
    },
	amount: {
        type: Number
    }, 
    description : {
        type: String
    },
	date : {
        type: String
    },
    month : {
        type: String
    },
});

mongoose.model('addMoney', addMoneySchema);
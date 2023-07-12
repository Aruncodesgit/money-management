const mongoose = require('mongoose');

var expensedMoneySchema = new mongoose.Schema({  
    title : {
        type: String
    },
	amount: {
        type: Number
    }, 
    for : {
        type: String  
    },
    description : {
        type: String
    },
	date : {
        type: Date,
        default: Date.now()
    },
});

mongoose.model('expensedMoney', expensedMoneySchema);
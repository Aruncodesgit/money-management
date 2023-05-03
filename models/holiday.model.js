const mongoose = require('mongoose');

var holidaySchema = new mongoose.Schema({
    title: {
        type: String,
        unique:true
    },
    color: {
        type: String
    },
    start: {
        type: String
    }, 
    end : {
        type: String
    },
});

mongoose.model('Holiday', holidaySchema);
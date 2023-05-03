const mongoose = require('mongoose'); 
const _ = require('lodash');
const empMonth = mongoose.model('empMonth'); 
var db = mongoose.connection;
var ObjectId = require('mongodb').ObjectID;

// post register
module.exports.empmonth = (req, res, next) => { 
    var empmonth = new empMonth(); 
    empmonth.month = req.body.month;
    empmonth.photo = req.body.photo = 'http://localhost:3000/uploads/' + req.file.filename
    empmonth.save((err, doc) => {
        if (!err)
            res.send(doc);
        
    }); 
    empMonth.create(empmonth.photo, function (err, success) {
       
    });

}
 

 
module.exports.empMonthDetails = (req, res, next) => { 
    empMonth.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
} 

module.exports.empMonthDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    empMonth.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
       
}
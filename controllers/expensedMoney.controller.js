const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const expensedMoney = mongoose.model('expensedMoney');


//post projects
module.exports.expensedmoney = (req, res, next) => {
    var expensedmoney = new expensedMoney();
    expensedmoney.title = req.body.title;
    expensedmoney.amount = req.body.amount; 
    expensedmoney.for = req.body.for; 
    expensedmoney.description = req.body.description; 
    expensedmoney.save((err, doc) => {
        if (!err) {
            res.send(doc); 
        }  
       else
        return next(err);
    }); 
}


// get projects
module.exports.expensedmoneyDetails = async (req, res, next) => { 
    expensedMoney.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
    
}
 
module.exports.expensedmoneyDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    expensedMoney.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }) 
}

const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const addMoney = mongoose.model('addMoney');


//post projects
module.exports.addmoney = (req, res, next) => {
    var addmoney = new addMoney();
    addmoney.status = req.body.status;
    addmoney.title = req.body.title;
    addmoney.amount = req.body.amount; 
    addmoney.description = req.body.description; 
    addmoney.date = req.body.date; 
    var getMonth = new Date(addmoney.date);  
	const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
    var getMonth1 = monthNames[getMonth.getMonth()];
	this.days = getMonth1;
    addmoney.month = this.days; 
    addmoney.save((err, doc) => {
        if (!err) {
            res.send(doc); 
        }  
       else
        return next(err);
    }); 
}


// get projects
module.exports.addmoneyDetails = async (req, res, next) => { 
    addMoney.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
    
}
 
module.exports.addmoneyDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    addMoney.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }) 
}

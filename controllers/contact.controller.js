const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Contact = mongoose.model('Contact');

//post contact
module.exports.contact = (req, res, next) => {
    var contact = new Contact();
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.message = req.body.message;
    contact.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err)
                res.status(422).send(['Please fill all fields']);
            else
                return next(err);
        }

    });
}


//get contact
module.exports.contactDetails = (req, res, next) => { 
    Contact.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
}


//delete contact
module.exports.contactDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Contact.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
       
}


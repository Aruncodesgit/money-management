const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Holiday = mongoose.model('Holiday');


//post holiday
module.exports.holiday = (req, res, next) => {
    var holiday = new Holiday();
    holiday.title = req.body.title;
    holiday.color = req.body.color;
    holiday.start = req.body.start;
    holiday.end = req.body.end; 
    holiday.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate date found.']);
            else
                return next(err);
        }
    });
}



// get holiday
module.exports.holidayDetails = (req, res, next) => { 
    Holiday.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
}
 
//delete holiday
module.exports.holidayDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    Holiday.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
       
}


// update holiday
module.exports.updateholiday = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);
        var holiday = {
            date: req.body.date,
            month : req.body.month,
            datePicker : req.body.datePicker,
            reason : req.body.reason,
        };
        Holiday.findByIdAndUpdate(req.params.id, {$set: holiday}, { new :true }, (err, doc) =>{
            if(!err) {res.send(doc);}
            else {console.log('Error in holiday update:' + JSON.stringfy(err, undefined, 2));}
        });

}
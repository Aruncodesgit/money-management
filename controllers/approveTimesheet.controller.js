const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;  
const ApproveTimesheet = mongoose.model('ApproveTimesheet'); 
 
module.exports.approveTimesheet = (req, res, next) => {
    var approveTimesheet = new ApproveTimesheet();
  
    approveTimesheet.userName = req.body.userName;  
    approveTimesheet.userId = req.body.userId;  
    approveTimesheet.month = req.body.month;
    approveTimesheet.status = req.body.status;   
    approveTimesheet.reason = req.body.reason;   
    approveTimesheet.markAsRead = req.body.markAsRead; 
    approveTimesheet.userIdPlusMonth = req.body.userId +  req.body.month;
    approveTimesheet.save((err, doc) => {
        if (!err){
          
            res.send(doc);
		}
        else { 
            if (err.code == 11000)
                res.status(422).send(['Already approved for the month']);
                
            else
                return next(err);
        }
    });
 
}
 
module.exports.approveTimesheetDetails = async (req, res, next) => { 
    ApproveTimesheet.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });  
}


  
// get timesheet by Id 
module.exports.approveTimesheetDetailsById = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)

    ApproveTimesheet.findById(req.params.id, (err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
}
 

module.exports.approveTimesheetUpdate = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

        var approveTimesheet = {
            markAsRead: req.body.markAsRead 
        };
        ApproveTimesheet.findByIdAndUpdate(req.params.id, {$set: approveTimesheet}, { new :true }, (err, doc) =>{
            if(!err) {res.send(doc);}
            else {console.log('Error in update:' + JSON.stringfy(err, undefined, 2));}
        });

}
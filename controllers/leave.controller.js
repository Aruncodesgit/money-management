const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;  
  
const Leave = mongoose.model('Leave');


//post leaves
module.exports.leave = (req, res, next) => {
    var leave = new Leave();
    leave.type = req.body.type;
    leave.from = req.body.from;
    leave.to = req.body.to;   
    leave.reason = req.body.reason; 
    leave.user_id = req._id; 
    leave.loginId = req.body.loginId;
    leave.empName = req.body.empName;
    leave.leaderName = req.body.leaderName; 
    leave.status = req.body.status;
    var date1 = new Date(leave.from);
    var date2 = new Date(leave.to);

    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.days = Difference_In_Days + 1
    leave.daysCount = this.days

    leave.save((err, doc) => {
        if (!err){
            res.send(doc);
        } 
        else {
            console.log(err)
        }
    });
}


// get leaves
module.exports.leaveDetails = async (req, res, next) => { 
    // Leave.find((err, docs) => {
    //     if(!err) {res.send(docs);}
    //     else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    // }); 

    const leave = await Leave.find({user_id: req._id});
    res.json(leave)
}

// get leaves for admin
module.exports.leaveDetailsAll = async (req, res, next) => { 
    Leave.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
}); 

     
}

// get leaves by Id 
module.exports.leaveGetById = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Leave.findById(req.params.id, (err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
}




//delete leaves
module.exports.leaveDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    Leave.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
}



// update leaves
module.exports.leaveUpdate = (req, res, next) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

        var leave = {
            status: req.body.status,
            comment : req.body.comment
        };
        Leave.findByIdAndUpdate(req.params.id, {$set: leave}, { new :true }, (err, doc) =>{
            if(!err) {res.send(doc);}
            else {console.log('Error in leave update:' + JSON.stringfy(err, undefined, 2));}
        });

}
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;  
  
const Timesheet = mongoose.model('Timesheet');
var db = mongoose.connection;

//post timesheet
module.exports.timesheet = (req, res, next) => {
    var timesheet = new Timesheet();
    timesheet.loginName = req.body.loginName; 
    timesheet.date = req.body.date; 
	var getMonth = new Date(timesheet.date); 
	const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	var getMonth1 = monthNames[getMonth.getMonth()];
	this.days = getMonth1;
	timesheet.month = this.days; 
	timesheet.dateplusEmpId = req.body.date + req._id;
    timesheet.project = req.body.project;
    timesheet.hours = req.body.hours; 
    timesheet.description = req.body.description;  
    timesheet.newFormAppend = req.body.newFormAppend;  
    timesheet.user_id = req._id;    
    timesheet.save((err, doc) => {
        if (!err){
          
            res.send(doc);
		}
        else { 
            if (err.code == 11000)
                res.status(422).send(['Already applied for the date']);
                
            else
                return next(err);
        }
    });
}

//get timesheet 

module.exports.timesheetDetails = async (req, res, next) => {  
    const timesheet = await Timesheet.find({user_id: req._id});
    res.json(timesheet) 
}

// get timesheet by Id 
module.exports.timesheetDetailsById = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Timesheet.findById(req.params.id, (err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
}
 
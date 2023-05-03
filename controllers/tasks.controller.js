const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Tasks = mongoose.model('Tasks');


//post projects
module.exports.tasks = (req, res, next) => {
    var tasks = new Tasks();
    tasks.task_id = req.body.task_id;
    tasks.projName = req.body.projName;
    tasks.user_id = req.body.user_id;   
    tasks.username = req.body.username; 
	tasks.uniqueField = req.body.task_id + req.body.user_id; 
    tasks.taskStatus = req.body.taskStatus;  
	tasks.percentage = req.body.percentage;
    tasks.description = req.body.description;   
    tasks.leader_id = req._id;
    tasks.save((err, doc) => {
        if (!err) {
            res.send(doc); 
        }
		else { 
            if (err.code == 11000)
                res.status(422).send(['Already assigned to employee']);
                
            else
                return next(err);
        }
    }); 
}


// get projects
module.exports.tasksDetails = async (req, res, next) => { 
    // Tasks.find((err, docs) => {
    //     if(!err) {res.send(docs);}
    //     else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    // }); 
    const tasks = await Tasks.find({leader_id: req._id});
    res.json(tasks)
}


module.exports.tasksDetailsAll = async (req, res, next) => { 
    Tasks.find((err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }); 
}

module.exports.tasksDetailsUpdate = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var projectStatusUpdate = {
		percentage: req.body.percentage, 
        taskStatus:req.body.taskStatus
    };
    Tasks.findByIdAndUpdate(req.params.id, { $set: projectStatusUpdate }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in project update:' + JSON.stringfy(err, undefined, 2)); }
    });
}




module.exports.tasksDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    Tasks.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    }) 
}

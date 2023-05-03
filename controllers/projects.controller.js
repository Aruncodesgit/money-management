const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var db = mongoose.connection;
const Projects = mongoose.model('Projects');


//post projects
module.exports.project = (req, res, next) => {
    var project = new Projects();
    project.name = req.body.name;
    project.startDate = req.body.startDate;  	
    project.endDate = req.body.endDate;
    project.description = req.body.description;
	project.leaderName = req.body.leaderName;  
   // project.assignedTo = [ {emp_id: req.body.emp_id , empName: req.body.empName, taskName: req.body.taskName }]; 
    project.leader_id = req._id; 
    project.logo = req.body.logo = 'http://localhost:3000/uploads/' + req.file.filename;

    var date1 = new Date(project.startDate);
    var date2 = new Date(project.endDate);

    var Difference_In_Time = date2.getTime() - date1.getTime();

    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    this.days = Difference_In_Days + 1
    project.daysCount = this.days


	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
	  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
	];
	var d = new Date();
	var month = monthNames[d.getMonth()];
	project.projectMonth = month;
    project.save((err, doc) => {
        if (!err)
            res.send(doc); 

    });
    Projects.create(project.logo, function (err, success) {

    });
}


module.exports.projectDetailsMerge = (req, res, next) => {  
    db.collection('projects').aggregate([
        {
            $lookup:{
                from: "tasks", 
                localField:"_id",
                foreignField:"task_id",
                as: "assignedEmployees", 
                
            }
        }, 
        {
            $out : "projectsDetails"
        }
    ]).toArray(function (err, docs) {
        if(!err) {res.send(docs);}  
    }); 
}
 
module.exports.projectMergedDetails = (req, res, next) => {   
    db.collection("projectsDetails").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); } 
    });  
}

module.exports.projectsDetailsById = async (req, res, next) => {   
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    var id = req.params.id;  
    var o_id = new ObjectId(id);
    const findResult = await db.collection("projectsDetails").find({_id:o_id}).toArray();
    res.send(findResult);  
}

 




// get projects not in use 
module.exports.projectsDetailsLeader = async (req, res, next) => {
    // Projects.find((err, docs) => {
    //     if(!err) {res.send(docs);}
    //     else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    // }); 
    const proj = await Projects.find({ leader_id: req._id });
    res.json(proj)
}

// get projects admin
module.exports.projectsDetailsAll = async (req, res, next) => {
    Projects.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}


// not in use
module.exports.projectDetailsById = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Projects.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}


// not in use
module.exports.projectDetailsAll = (req, res, next) => {
    Projects.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}


//delete projects
module.exports.projectDelete = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    Projects.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) { res.send('Delted Successfully !'); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })

}


 


module.exports.projectUpdateAdmin = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var projectAdmin = {
        name: req.body.name,
        startDate: req.body.startDate,  
        endDate: req.body.endDate,
        description: req.body.description,
    };
    Projects.findByIdAndUpdate(req.params.id, { $set: projectAdmin }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in project update:' + JSON.stringfy(err, undefined, 2)); }
    });
}


 
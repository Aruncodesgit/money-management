const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const Points = mongoose.model('Points');


//post points
module.exports.points = (req, res, next) => {
    var points = new Points(); 
    points.username = req.body.username;
	points.projName = req.body.projName;	
    points.points = req.body.points;
	points.description = req.body.description;
    points.leader_id = req._id; 
    points.save((err, doc) => {
        if (!err) {  
            res.send(doc);
        }
        else {
          
        }

    });
    
}



// get points
module.exports.pointsDetails = async (req, res, next) => { 
    const points = await Points.find({ leader_id: req._id });
    res.json(points)
}

// get points admin
module.exports.pointsDetailsAllAdmin = async (req, res, next) => {
    Points.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
} 
   
 
module.exports.pointsUpdateLeader = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var pointsUpdateLeader = {
        points: req.body.points
    };
    Points.findByIdAndUpdate(req.params.id, { $set: pointsUpdateLeader }, { new: true }, (err, doc) => {
        if (!err) { 
            res.send(doc);
        }
        
        else { 
          }
    });
}
 
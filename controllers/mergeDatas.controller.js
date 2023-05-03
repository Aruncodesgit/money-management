const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
 
var db = mongoose.connection;

 
 

module.exports.pointsMerge = (req, res, next) => {  
    db.collection('users').aggregate([
        {
            $lookup:{
                from: "points", 
                localField:"_id",
                foreignField:"username",
                as: "pointsDetails", 
                
            }
        }, 
		{
            $addFields:  {
                "TotalPoints": { $sum: "$pointsDetails.points"} 
            } 
        },
        { $unset: [ 
            "email", 
            "password", 
            "saltSecret", 
            "__v" , 
            "emp_id",
            "moreCareerDetails",
            "addhobbiesDetails",
            "addlanguagesDetails", 
            "date", 
            "gender",
            "isLoggedin",
            "salary",
            "shortName",
            "photosDetails",
            "StudyDescription",
            "address",
            "careerDescription",
            "college",
            "course",
            "courseFrom", 
            "profileStatus",
            "courseTo",
            "dob",
            "pastCompany",
            "pastDesignation",
            "phone",
            "totalExp", 
            "workedFrom",
            "workedTo", 
         ] },
        {
            $out : "pointsDetails"
        }
    ]).toArray(function (err, docs) {
        if(!err) {res.send(docs);}  
    }); 
}
 


module.exports.pointsDetailsStored = (req, res, next) => {  
    db.collection("pointsDetails").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
         
    }); 
}

module.exports.pointsDetailsById = async (req, res, next) => {   
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    var id = req.params.id;  
    var o_id = new ObjectId(id);
    const findResult = await db.collection("pointsDetails").find({_id:o_id}).toArray();
    res.send(findResult);  
}




module.exports.timesheetMerge = (req, res, next) => {  
    db.collection('users').aggregate([
        {
            $lookup:{
                from: "timesheets", 
                localField:"_id",
                foreignField:"user_id",
                as: "timesheetDetails", 
                
            }
        }, 
        { $unset: [ 
            "email", 
            "password", 
            "saltSecret", 
            "__v" , 
            "emp_id",
            "moreCareerDetails",
            "addhobbiesDetails",
            "addlanguagesDetails", 
            "date", 
            "gender",
            "isLoggedin",
            "salary",
            "shortName",
            "photosDetails",
            "StudyDescription",
            "address",
            "careerDescription",
            "college",
            "course",
            "courseFrom", 
            "profileStatus",
            "courseTo",
            "dob",
            "pastCompany",
            "pastDesignation",
            "phone",
            "totalExp", 
            "workedFrom",
            "workedTo", 
         ] },
        {
            $out : "timesheetDetails"
        }
    ]).toArray(function (err, docs) {
        if(!err) {res.send(docs);}  
    }); 
}

module.exports.timesheetDetailsStored = (req, res, next) => {  
    db.collection("timesheetDetails").find().toArray(function(e, d) {
        if(!e) {res.send(d);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
         
    }); 
}

module.exports.timesheetDetailsById = async (req, res, next) => {   
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    var id = req.params.id;  
    var o_id = new ObjectId(id);
    const findResult = await db.collection("timesheetDetails").find({_id:o_id}).toArray();
    res.send(findResult);  
}
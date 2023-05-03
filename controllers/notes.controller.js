const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;  
const Notes = mongoose.model('Notes'); 

//post notes
module.exports.notes = (req, res, next) => {
    var notes = new Notes();
  
    notes.title = req.body.title;  
    notes.reminder = req.body.reminder;  
    notes.color = req.body.color;
    notes.description = req.body.description;  
    notes.user_id = req._id;   
    notes.save((err, doc) => {
        if (!err)  
            res.send(doc); 
    });
 
}


// get notes
module.exports.notesDetails = async (req, res, next) => { 
    // Notes.find((err, docs) => {
    //     if(!err) {res.send(docs);}
    //     else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    // }); 
    
    const notes = await Notes.find({user_id: req._id});
    res.json(notes)
 
}

 
// get by id
module.exports.notesDetailsID = (req, res, next) => {  

    if(!ObjectId.isValid(req.params.user_id))
    return res.status(400).send(`No record found with given id: ${req.params.user_id}`)
     
    Notes.findById(req.params.user_id, (err, docs) => {
        if(!err) {res.send(docs);}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
        
    });
  
    // if(req.params.loginId)
    // return res.status(400).send(`No record found with given login Id: ${req.params.loginId}`)
     
    // Notes.find(req.params.loginId, (err, docs) => {
    //     if(!err) {res.send(docs);}
    //     else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
            
    // }); 

     
}
 




//delete holiday
module.exports.notesDelete = (req, res, next) => { 
    if(!ObjectId.isValid (req.params.id)) 
    return res.status(400).send(`No record found with given id: ${req.params.id}`)
    
    Notes.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) {res.send('Delted Successfully !');}
        else {console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })
       
}

 
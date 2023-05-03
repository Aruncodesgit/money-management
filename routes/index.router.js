const express = require('express');
const router = express.Router();
const multer = require("multer");
require('../config/passportConfig');

const ctrlUser = require('../controllers/user.controller');
const ctrlEmpMonth = require('../controllers/empMonth.controller');
const ctrlContact = require('../controllers/contact.controller');
const ctrlHoliday = require('../controllers/holiday.controller');
const ctrlNotes = require('../controllers/notes.controller');
const ctrlLeave = require('../controllers/leave.controller');
const jwtHelper = require('../config/jwtHelper'); 

const ctrlTimesheet = require('../controllers/timesheet.controller');
const ctrlApproveTimesheet = require('../controllers/approveTimesheet.controller'); 
const ctrlProjects = require('../controllers/projects.controller');


const mergeDatas = require('../controllers/mergeDatas.controller');
const ctrlTasks = require('../controllers/tasks.controller'); 
const ctrlPoints = require('../controllers/points.controller'); 

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {

        cb(null, `${Date.now()}_${file.originalname}`)
    }

})

const upload = multer({ storage: storage });

// user register and login 
router.post('/register', ctrlUser.register);
router.get('/registerDetails', ctrlUser.registerDetails);
router.get('/registerDetails/:id', ctrlUser.registerGetById);
router.delete('/register/:id', ctrlUser.registerDelete);
router.post('/authenticate', ctrlUser.authenticate); 

router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.put('/register/:id', ctrlUser.updateRegister);
router.put('/registers/:id', ctrlUser.updateRegisterByAdmin); 
router.put('/changepassword/:id', ctrlUser.changepassword);
router.put('/logout/:id', ctrlUser.logout);
// user photo
router.post('/empMonth', upload.single("avatar"), ctrlEmpMonth.empmonth);
router.delete('/empMonth/:id', ctrlEmpMonth.empMonthDelete);  
router.get('/empMonthDetails', ctrlEmpMonth.empMonthDetails); 

// user contact details
router.post('/contact', ctrlContact.contact);
router.get('/contactDetails', ctrlContact.contactDetails);
router.delete('/contact/:id', ctrlContact.contactDelete);


// holidays details
router.post('/holiday', ctrlHoliday.holiday);
router.get('/holidayDetails', ctrlHoliday.holidayDetails);
router.delete('/holiday/:id', ctrlHoliday.holidayDelete);
router.put('/holiday/:id', ctrlHoliday.updateholiday);



// my notes details
router.post('/notes', jwtHelper.verifyJwtToken, ctrlNotes.notes);
router.get('/notesDetails', jwtHelper.verifyJwtToken, ctrlNotes.notesDetails);
//router.get('/notesDetails/:id', ctrlNotes.notesDetailsID);
router.delete('/notes/:id', ctrlNotes.notesDelete);


// leave details
router.post('/leave', jwtHelper.verifyJwtToken, ctrlLeave.leave);
router.get('/leaveDetails', jwtHelper.verifyJwtToken, ctrlLeave.leaveDetails);
router.get('/leaveDetailsAll', ctrlLeave.leaveDetailsAll);
router.get('/leaveDetails/:id', ctrlLeave.leaveGetById);
router.delete('/leave/:id', ctrlLeave.leaveDelete);
router.put('/leave/:id', ctrlLeave.leaveUpdate);


// project details
router.post('/projects', jwtHelper.verifyJwtToken, upload.single("logoimg"), ctrlProjects.project); 
router.get('/projectsDetailsLeader', jwtHelper.verifyJwtToken, ctrlProjects.projectsDetailsLeader);
router.get('/projectDetailsMerge', ctrlProjects.projectDetailsMerge);
router.get('/projectMergedDetails', ctrlProjects.projectMergedDetails);
router.get('/projectsDetailsById/:id', ctrlProjects.projectsDetailsById);

router.get('/projectsDetailsAll', ctrlProjects.projectsDetailsAll);
router.get('/projectsDetails/:id', ctrlProjects.projectDetailsById);
router.delete('/projects/:id', ctrlProjects.projectDelete); 
router.put('/projectsAdmin/:id', ctrlProjects.projectUpdateAdmin); 

 
// timesheet and points 
router.get('/pointsMerge', mergeDatas.pointsMerge);
router.get('/pointsDetailsStored', mergeDatas.pointsDetailsStored);
router.get('/pointsDetailsById/:id', mergeDatas.pointsDetailsById);

router.get('/timesheetMerge', mergeDatas.timesheetMerge);
router.get('/timesheetDetailsStored', mergeDatas.timesheetDetailsStored);
router.get('/timesheetDetailsById/:id', mergeDatas.timesheetDetailsById);



//timesheet
router.post('/timesheet', jwtHelper.verifyJwtToken, ctrlTimesheet.timesheet);
router.get('/timesheetDetails', jwtHelper.verifyJwtToken, ctrlTimesheet.timesheetDetails);

router.post('/approveTimesheet', jwtHelper.verifyJwtToken, ctrlApproveTimesheet.approveTimesheet);
router.get('/approveTimesheetDetails', ctrlApproveTimesheet.approveTimesheetDetails);
router.put('/approveTimesheetUpdate/:id', ctrlApproveTimesheet.approveTimesheetUpdate); 
router.get('/approveTimesheetDetails/:id', ctrlApproveTimesheet.approveTimesheetDetailsById);

// add daily tasks
router.post('/tasks', jwtHelper.verifyJwtToken, ctrlTasks.tasks);
router.get('/tasksDetails', jwtHelper.verifyJwtToken, ctrlTasks.tasksDetails);
router.get('/tasksDetailsAll', ctrlTasks.tasksDetailsAll);
router.put('/tasksDetailsUpdate/:id', ctrlTasks.tasksDetailsUpdate);
router.delete('/tasks/:id', ctrlTasks.tasksDelete);
 
 
 
// points
router.post('/points', jwtHelper.verifyJwtToken, ctrlPoints.points);
router.get('/pointsDetails', jwtHelper.verifyJwtToken, ctrlPoints.pointsDetails);
router.get('/pointsDetailsAllAdmin', ctrlPoints.pointsDetailsAllAdmin); 
router.put('/pointsUpdateLeader/:id', ctrlPoints.pointsUpdateLeader);

//forget password 
router.post('/forgot-password/:email', ctrlUser.forgotPassword);
router.get('/reset-password/:id/:token' , ctrlUser.resetPassword)
router.post('/new-password', ctrlUser.postNewPassword);
module.exports = router;




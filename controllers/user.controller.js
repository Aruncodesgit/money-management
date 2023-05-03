const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
const passport = require('passport');
const _ = require('lodash');
const User = mongoose.model('User');
var db = mongoose.connection;
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const e = require('express');

const jwt = require('jsonwebtoken');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'arun70840@gmail.com',
        pass: 'evwphfaaowaeyxrm',
    }
})
// post register
module.exports.register = async (req, res, next) => {

    var user = new User();
    user.fullName = req.body.fullName;
    user.designation = req.body.designation;
    user.emp_id = req.body.emp_id;
    user.gender = req.body.gender;
    user.email = req.body.email;
    user.password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    var emailPass = req.body.password;
    user.profileStatus = req.body.profileStatus;
    user.isLoggedin = req.body.isLoggedin;
    user.salary = req.body.salary;
    user.teamlead = req.body.teamlead;
 
    var shortName = user.fullName.substring(0, 2);
    user.shortName = shortName;
    // var OTP = Math.floor(1000 + Math.random() * 9000);
    // if (res) { 
    //     var mailOptions = {
    //         from: 'arun70840@gmail.com',
    //         to: user.email,
    //         subject: 'Employee Management',
    //         html: `This is testing ` + OTP + `for otp`,
    //     }
    //     return res.status(200).send(`OTP has been sent to registered email ID`);
    // }
    // transporter.sendMail(mailOptions, function (error, info) {
    //     if (error)
    //         console.log(error);
         
    // })

     user.save((err, doc) => {
            if (!err) {
                res.send(doc);
                var mailOptions = {
                    from: 'arun70840@gmail.com',
                    to: user.email,
                    subject: 'Employee Management',
                    html: ` 
                <table width="700px" style="font-family: 'Bai Jamjuree', sans-serif;
                font-size: 14px; font-weight:bold;margin: auto;overflow: hidden;
                position: relative; border: 1px solid #ccc;">
                    <tr>
                        <td align="center" colspan="2" style="padding:40px 50px;" valign="middle">
                            <img src="../uploads/favi.png" style="width: 100px;" />
                        </td>
                    </tr>
                    <tr>
                        <td align="left" style="padding:20px 0px 0px 50px!important;" valign="middle">
                            <h3
                                style="font-family: 'Bai Jamjuree', sans-serif; color:#0ADEA4;font-size:49px;margin-top: 0;margin-bottom: 7px;">
                                WELCOME ONBOARD</h3>
                        </td>
                        <td align="left" style="padding:0px 50px 0px 0px!important;color:#000; font-size:30px" valign="middle">
            
                        </td>
                    </tr> 
                    <tr>
                        <td align="left" style="font-weight: 500;padding: 10px 50px 0px 50px!important;color:#000; font-size:20px"
                            valign="middle">
                            Thanks for signing up in Employee Management</td>
                    </tr>
                    <tr>
                        <td align="left" colspan="2"
                            style="width:100%;padding: 10px 50px;color:#666464; font-weight: 300; font-size:14px" valign="middle">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book ,</td>
                    </tr>
                    <tr>
                        <td align="left" style="font-weight: 500;padding: 10px 50px 0px 50px!important;color:#000; font-size:20px">
                            Please find the login credentials below
                        </td>
            
                    </tr>
                    <tr>
                        <td align="left" colspan="2"
                            style="width:100%;padding: 10px 50px 40px 50px ;color:#666464; font-weight: 300; font-size:14px"
                            valign="middle">
                            Email : ` + user.email + ` <br />
                            Password : ` + emailPass + `  <br />
                            URL : <a href="http://localhost:4200/staff-login">http://localhost:4200/staff-login</a>
                        </td>
                    </tr>
                </table>
                `,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error)
                        console.log(error);
                    //else
                    //console.log('Email Sent:' + info.response);
                })
            }

            else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email adrress or Emp. ID found.']);

                else
                    return next(err);
            }


        }); 

}



// update register
module.exports.updateRegister = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);

    var user = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        totalExp: req.body.totalExp,
        dob: req.body.dob,
        address: req.body.address,
        pastCompany: req.body.pastCompany,
        pastDesignation: req.body.pastDesignation,
        workedFrom: req.body.workedFrom,
        workedTo: req.body.workedTo,
        careerDescription: req.body.careerDescription,
        college: req.body.college,
        course: req.body.course,
        courseFrom: req.body.courseFrom,
        courseTo: req.body.courseTo,
        StudyDescription: req.body.StudyDescription,
        moreCareerDetails: req.body.moreCareerDetails,
        addhobbiesDetails: req.body.addhobbiesDetails,
        addlanguagesDetails: req.body.addlanguagesDetails,

        shortName: req.body.fullName.substring(0, 2),
    };



    User.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in employee update:' + JSON.stringfy(err, undefined, 2)); }
    });

}


// update by admin
module.exports.updateRegisterByAdmin = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);
    var proStatus = {
        profileStatus: req.body.profileStatus,
    };
    User.findByIdAndUpdate(req.params.id, { $set: proStatus }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in employee status update:' + JSON.stringfy(err, undefined, 2)); }
    });
}

module.exports.updateByLeader = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);
    var teamLeaderChange = {
        teamlead: req.body.teamlead,
    };
    User.findByIdAndUpdate(req.params.id, { $set: teamLeaderChange }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in change team lead:' + JSON.stringfy(err, undefined, 2)); }
    });
}

module.exports.changepassword = async (req, res, next) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);
	
    var userChangepsw = { 
        password: req.body.new_pass,
		
    };

    const salt = await bcrypt.genSalt(10);
    userChangepsw.password = await bcrypt.hash(userChangepsw.password, salt);
    User.findByIdAndUpdate(req.params.id, { $set: userChangepsw }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in change password:' + JSON.stringfy(err, undefined, 2)); }
    });
}

// get register
module.exports.registerDetails = (req, res, next) => {
    User.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}




// get by Id 
module.exports.registerGetById = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    User.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    });
}

// delete register
module.exports.registerDelete = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record found with given id: ${req.params.id}`)

    User.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) { res.send('Delted Successfully !'); }
        else { console.log('Error' + Json.stringfy(err, undefined, 2)); }
    })

}



// login authenticate
module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {

        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) {
            //db.collection('users').update({ _id: user._id }, { $set: { 'isLoggedin': 'Online' } })
            if (user.profileStatus == 'Activate') {
                var data = res.status(200).json({ _id: user._id, fullName: user.fullName, teamlead: user.teamlead, designation: user.designation, "token": user.generateJwt() });
                if (data) {
                    db.collection('users').update({ _id: user._id }, { $set: { 'isLoggedin': 'Online' } })
                }
                else {
                    //console.log('hello')
                    //db.collection('users').update({ _id: user._id }, { $set: { 'isLoggedin': 'Offline' } })
                }
                return data;
            }

            else {

                return res.status(404).json({ status: false, message: 'Your profile has been deactivated! Please contact to admin.' })

            }

        }

        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}




// user profile
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({
                    status: true, user: _.pick(user, [
                        '_id', 'imageUrl', 'fullName', 'designation', 'emp_id', 'shortName', 'gender', 'salary', 'teamlead', 'profileStatus', 'isLoggedin', 'email', 'phone', 'totalExp', 'dob', 'address', 'pastCompany', 'pastDesignation', 'workedFrom', 'workedTo', 'careerDescription', 'college',
                        'course', 'courseFrom', 'courseTo', 'StudyDescription', 'moreCareerDetails', 'addhobbiesDetails', 'addlanguagesDetails'

                    ])
                });
        }
    );
}

const JWT_SECRET = 'some super secret'

module.exports.forgotPassword = (req, res, next) => {
    //const email = req.body.email
    User.findOne({ email: req.params.email }).select().exec(function (err, user) {
        if (err) {
            return res.status(404).json([
                { status: false, message: 'Email address not found' }
            ]);
        }
        else {
            if (!user) {
                return res.status(404).json([
                    { status: false, message: 'Email address not found' }
                ]);
            }
            else {

                const secret = JWT_SECRET;
                const payload = {
                    email: req.params.email,
                    id: user.id
                }

                const token = jwt.sign(payload, secret, { expiresIn: '10m' })
                const link = `http://localhost:3000/api/reset-password/${user.id}/${token}`
                const linkBtn = `<button style="width: 65px;
                height: 33px;
                border: 0;
                border-radius: 40px;
                background-color: #0ADEA4;"><a style="    text-decoration: none;
                color: #fff;" href='${link}'>Reset</a></button>`

                var mailOptions = {
                    from: 'arun70840@gmail.com',
                    to: user.email,
                    subject: 'Employee Management',
                    html: `<table width="700px" style="font-family: 'Bai Jamjuree', sans-serif;
                    font-size: 14px; font-weight:bold;margin: auto;overflow: hidden;
                    position: relative; border: 1px solid #ccc;">
                        <tr>
                            <td align="center" colspan="2" style="padding:20px 20px;background-color: #0ADEA4;" valign="middle">
                                <h1 style="display: flex;align-items: center;margin: auto;justify-content: center;"><img src="./favi.png" style="width: 100px;" /> Employee Management</h1>
                            </td>
                        </tr> 
                        <tr>
                            <td align="center" style="font-weight: 800; font-size:20px; padding: 40px 50px 0px 50px!important;color:#000;"
                                valign="middle">
                                Forgot Your Password ?</td>
                        </tr>
                        <tr>
                            <td align="center" colspan="2"
                                style=" padding: 10px 50px;color:#666464; font-weight: 300; font-size:14px" valign="middle">
                                Hi `+ user.fullName + `, There was a request to change the password !</td>
                        </tr>
                        <tr>
                            <td align="center" style="padding: 10px 50px 0px 50px!important;color:#666464; font-weight: 300;  font-size:14px">
                                If did not make this request, Just ignore this email Otherwise please click the below reset button.
                            </td>
                
                        </tr>
                        <tr>
                            <td align="center" style="padding: 10px 50px 40px 50px!important;color:#666464; font-weight: 300;  font-size:14px">
                                  ` + linkBtn + `
                            </td>
                
                        </tr>
                    </table>` ,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error)
                        console.log(error);
                   // else
                       // console.log('Email Sent:' + info.response);
                })
                return res.status(200).json([
                    {
                        status: true, message: 'Password reset link has been sent to your registered email id'
                    }
                ]);
            }
        }
    })
}


module.exports.resetPassword = (req, res, next) => {
    const { id, token } = req.params
    // User.findOne({id:id})
    res.render('forgot-password', { id })

}

module.exports.postNewPassword = async (req, res, next) => {

    try {
        const id = req.body.id
        const password = req.body.password

        const salt = await bcrypt.genSalt(10);
        const password1 = await bcrypt.hash(password, salt);

        const data = await User.findByIdAndUpdate({ _id: id }, { $set: { password: password1 } }, { new: true })

        if (res) {
            res.render('success', { id })
        }
        else {

        }
    }
    catch (error) {
        console.log(error.message)
    }

}


module.exports.logout = async (req, res, next) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(` No record found with given id : ${req.params.id}`);
	
    var logout = { 
        isLoggedin: req.body.isLoggedin,
		
    };
 
    User.findByIdAndUpdate(req.params.id, { $set: logout }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in logout:' + JSON.stringfy(err, undefined, 2)); }
    });
}
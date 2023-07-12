const express = require('express');
const router = express.Router(); 

const ctrladdMoney = require('../controllers/addMoney.controller'); 
const ctrlexpensedMoney = require('../controllers/expensedMoney.controller');    
 
router.post('/addmoney', ctrladdMoney.addmoney);
router.get('/addmoneyDetails' , ctrladdMoney.addmoneyDetails);
router.delete('/addmoney/:id', ctrladdMoney.addmoneyDelete); 

router.post('/expensedmoney', ctrlexpensedMoney.expensedmoney);
router.get('/expensedmoneyDetails' , ctrlexpensedMoney.expensedmoneyDetails);
router.delete('/expensedmoney/:id', ctrlexpensedMoney.expensedmoneyDelete); 
module.exports = router;




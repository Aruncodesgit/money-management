const express = require('express');
const router = express.Router(); 

const ctrladdMoney = require('../controllers/addMoney.controller');  
 
router.post('/addmoney', ctrladdMoney.addmoney);
router.get('/addmoneyDetails' , ctrladdMoney.addmoneyDetails);
router.delete('/addmoney/:id', ctrladdMoney.addmoneyDelete); 

 
module.exports = router;




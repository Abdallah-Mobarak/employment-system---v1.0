const express = require('express');
const  {loginUser,registerUser } = require('../Controller/userController');
const {validateUserRegistration,validateUserlogin}= require("../middleware/validationMW")

const router = express.Router();

// مسارات المستخدمين
router.post('/register', validateUserRegistration,registerUser);
router.post('/login',validateUserlogin,loginUser);

module.exports = router;

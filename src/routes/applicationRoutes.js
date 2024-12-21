const express = require('express');
const { applyForVacancy } = require('../Controller/applicationController');
const {authenticate,authorize} =require("../middleware/authMW")
const router = express.Router();

router.post('/apply',authenticate,authorize(['applicant']) ,applyForVacancy);

module.exports = router;

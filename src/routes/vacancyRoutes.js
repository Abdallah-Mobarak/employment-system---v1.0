const express = require('express');
const router = express.Router();
const {authenticate,authorize} =require("../middleware/authMW")
const {
    createVacancy,
    updateVacancy,
    deleteVacancy,
    getVacancies,
    getEmployerVacancies, 
    getVacancyById,
    deactivateVacancy,
    getApplicantsForVacancy
} = require('../Controller/vacancyController');

const { validateVacancy } = require('../middleware/validationMW');


// الوظائف الخاصة بصاحب العمل
router.post('/newVacancy',authenticate,authorize(['employer']),validateVacancy,createVacancy); // إنشاء وظيفة
// router.get('/my-vacancies', verifyEmployer, getEmployerVacancies); // عرض الوظائف الخاصة
// router.get('/:id', verifyEmployer, getVacancyById); // عرض وظيفة محددة
router.put('/vacancy/:id', authenticate,authorize(['employer']), updateVacancy); // تحديث وظيفة
router.delete('/vacancy/:id',authenticate,authorize(['employer']), deleteVacancy); // حذف وظيفة

// عرض جميع الوظائف (مشترك بين الجميع)
router.get('/vacancies', getVacancies);
router.patch('/vacancyOff/:id',authenticate,authorize(['employer']), deactivateVacancy);
router.get('/vacancyForApplicants/:id',authenticate,authorize(['employer']),getApplicantsForVacancy);




// const express = require('express');
// const router = express.Router();
// const { authenticate, authorize } = require('../middleware/auth');
// const { createVacancy, getVacancies, updateVacancy, deleteVacancy } = require('../controllers/vacancyController');

// // حماية مسار إنشاء وظيفة
// router.post('/vacancy', authenticate, authorize(['employer']), createVacancy);



// // تحديث وظيفة (خاص بـ employer)
// router.put('/vacancy/:id', authenticate, authorize(['employer']), updateVacancy);

// // حذف وظيفة (خاص بـ employer)
// router.delete('/vacancy/:id', authenticate, authorize(['employer']), deleteVacancy);




module.exports = router;

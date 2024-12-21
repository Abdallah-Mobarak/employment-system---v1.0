const Vacancy = require('../models/Vacancy');
const mongoose = require('mongoose');
// const User = require('../models/User');




exports.createVacancy = async (req, res) => {
    try {
        const { title, description, maxApplications, expiryDate,location } = req.body;
        const employerId = req.user.id; // يتم الحصول عليها من الـ JWT
        if (!mongoose.Types.ObjectId.isValid(employerId)) {
            return res.status(400).json({ message: 'التعريف بصاحب العمل غير صالح' });
        }
        

        if (!title || !description || !maxApplications || !expiryDate || !location ) {
            return res.status(400).json({ message: 'يرجى إدخال جميع الحقول' });
        }

        const newVacancy = new Vacancy({
            title,
            description,
            maxApplications,
            location,
            expiryDate,
            employer: employerId,
        });

        await newVacancy.save();

        res.status(201).json({ message: 'تم إنشاء الوظيفة بنجاح', vacancy: newVacancy });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'خطأ في الخادم', error });
    }
};

// exports.getEmployerVacancies = async (req, res) => {
//     try {
//         const employerId = req.user.id;

//         const vacancies = await Vacancy.find({ employer: employerId });
//         res.status(200).json({ vacancies });
//     } catch (error) {
//         res.status(500).json({ message: 'خطأ في الخادم', error });
//     }
// };


// exports.getVacancyById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const vacancy = await Vacancy.findById(id).populate('employer', 'name email');
//         if (!vacancy) {
//             return res.status(404).json({ message: 'الوظيفة غير موجودة' });
//         }

//         res.status(200).json({ vacancy });
//     } catch (error) {
//         res.status(500).json({ message: 'خطأ في الخادم', error });
//     }
// };


exports.updateVacancy = async (req, res) => {
    try {
        const { id } = req.params;
        // const employerId = req.user.id; // التحقق من ملكية الوظيفة
        const { title, description, maxApplications, expiryDate,location } = req.body;

        const vacancy = await Vacancy.findOne({ _id: id, /*employer: employerId*/ });
        if (!vacancy) {
            return res.status(404).json({ message: 'الوظيفة غير موجودة أو لا تملك الصلاحية' });
        }

        // تحديث الحقول
        if (title) vacancy.title = title;
        if (description) vacancy.description = description;
        if (maxApplications) vacancy.maxApplications = maxApplications;
        if (expiryDate) vacancy.expiryDate = expiryDate;
        if (location) vacancy.location = location;

        await vacancy.save();

        res.status(200).json({ message: 'تم تحديث الوظيفة بنجاح', vacancy });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم', error });
    }
};

exports.deleteVacancy = async (req, res) => {
    try {
        const { id } = req.params;
        // const employerId = req.user.id; // التحقق من ملكية الوظيفة

        const vacancy = await Vacancy.findOneAndDelete({ _id: id, /*employer: employerId*/});
        if (!vacancy) {
            return res.status(404).json({ message: 'الوظيفة غير موجودة أو لا تملك الصلاحية' });
        }

        res.status(200).json({ message: 'تم حذف الوظيفة بنجاح' });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم', error });
    }
};




exports.getVacancies = async (req, res) => {
    try {
        const vacancies = await Vacancy.find({ status: 'active' })/*.populate('employer', 'name email')*/;
        res.status(200).json({ vacancies });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم', error });
    }
};

exports.deactivateVacancy = async (req, res) => {
    try {
        const { id } = req.params;
        // const employerId = req.user.id; // يتم التحقق من صاحب الوظيفة

        const vacancy = await Vacancy.findOne({ _id: id, /*employer: employerId*/ });
        if (!vacancy) {
            return res.status(404).json({ message: 'الوظيفة غير موجودة' });
        }
        if (vacancy.status === "inactive") {
            return res.status(201).json({ message: 'الوظيفة ملفية بالفعل' });
        }

        vacancy.status = 'inactive';
        await vacancy.save();

        res.status(200).json({ message: 'تم إلغاء الوظيفة بنجاح' });
    } catch (error) {
        res.status(500).json({ message: 'خطأ في الخادم', error });
    }
};

exports.getApplicantsForVacancy = async (req, res) => {
    try {
        const { vacancyId } = req.params;

        // استرجاع الوظيفة بناءً على الـ vacancyId
        const vacancy = await Vacancy.findById(vacancyId).populate('applicants', 'name email');  // نفترض أن "applicants" هو حقل من نوع ObjectId يحتوي على بيانات المتقدمين

        if (!vacancy) {
            console.log(vacancyId);
            
            return res.status(404).json({ message: 'الوظيفة غير موجودة' });
        }
        if (vacancy.applicants.length === 0) {
            return res.status(404).json({ message: 'لا يوجد متقدمين لهذه الوظيفة' });
        }

        // إرجاع قائمة المتقدمين
        res.status(200).json({ applicants: vacancy.applicants });
    } catch (error) {
        console.error('Error fetching applicants:', error);
        res.status(500).json({ message: 'حدث خطأ في الخادم أثناء استرجاع المتقدمين', error });
    }
};

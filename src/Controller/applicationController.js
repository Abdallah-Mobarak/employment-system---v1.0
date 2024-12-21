const Application = require('../models/applicationModel');
const Vacancy = require('../models/Vacancy');

exports.applyForVacancy = async (req, res) => {
    try {
        const applicantId = req.user.id;
        const { vacancyId } = req.body;

        const currentDate = new Date();
        if (vacancy.status !== 'active' || currentDate > vacancy.expiryDate) {
            return res.status(400).json({ message: 'الوظيفة قد انتهت ولا يمكن التقديم عليها' });
        }

        const vacancy = await Vacancy.findById(vacancyId);
        if (!vacancy || vacancy.status !== 'active') {
            return res.status(404).json({ message: 'الوظيفة غير موجودة أو لم تعد نشطة' });
        }

        if (vacancy.applicants.length >= vacancy.maxApplications) {
            return res.status(400).json({ message: 'تم الوصول إلى الحد الأقصى للمتقدمين لهذه الوظيفة' });
        }

        const lastApplication = await Application.findOne({
            applicant: applicantId,
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });

        if (lastApplication) {
            return res.status(400).json({ message: 'يمكنك التقديم على وظيفة واحدة فقط كل 24 ساعة' });
        }

        vacancy.applicants.push(applicantId);
        await vacancy.save();

        const application = new Application({ applicant: applicantId, vacancy: vacancyId });
        await application.save();

        res.status(200).json({ message: 'تم التقديم على الوظيفة بنجاح' });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'خطأ في الخادم', error });
    }
};

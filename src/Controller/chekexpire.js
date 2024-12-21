const Vacancy = require('../models/Vacancy');  

const checkAndCloseExpiredVacancy = async () => {
    const currentDate = new Date();

    // ابحث عن الوظائف التي انتهت فترة تقديمها
    const expiredVacancies = await Vacancy.find({
        expiryDate: { $lt: currentDate },
        status: 'active'  // تأكد من أنها نشطة
    });

    // تحديث الحالة لتصبح مغلقة
    for (const vacancy of expiredVacancies) {
        vacancy.status = 'inactive';
        await vacancy.save();
    }
};

module.exports = {
    checkAndCloseExpiredVacancy
};

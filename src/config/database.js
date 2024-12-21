const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connection successful...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // إنهاء التطبيق في حال حدوث خطأ
    }
};

module.exports = connectDB;

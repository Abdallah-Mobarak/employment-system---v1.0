const express = require('express');
const dotenv = require('dotenv');
const cron = require('node-cron');
const connectDB = require('./src/config/database');
const { errorHandler } = require('./src/middleware/errorHandler');
const userRoutes=require("./src/routes/userRoutes");
const vacancyRoute=require("./src/routes/vacancyRoutes");
const aplication=require("./src/routes/applicationRoutes");

const { checkAndCloseExpiredVacancy } = require('./src/Controller/chekexpire');

// فحص الوظائف المنتهية كل يوم
cron.schedule('0 0 * * *', () => {
    console.log('Checking expired vacancies...');
    checkAndCloseExpiredVacancy();
});



// تحميل المتغيرات البيئية
dotenv.config();
// الاتصال بقاعدة البيانات
connectDB(); 
const app = express();
// الميدل وير
app.use(express.json());
// app.use(errorHandler);
app.use("/api/users",userRoutes);
app.use("/api/users",vacancyRoute);
app.use("/api/users",aplication);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}....`));

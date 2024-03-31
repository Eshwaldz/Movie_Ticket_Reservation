const mongoose = require('mongoose');

/**
 * ตั้งค่าการใช้งานคิวรี่โดยเคร่งความเข้มงวดเป็นเท็จใน Mongoose.
 */
mongoose.set('strictQuery', false)

/**
 * เชื่อมต่อกับฐานข้อมูล MongoDB โดยใช้ URL ที่กำหนดในตัวแปรสิ่งแวดล้อม mongo_url.
 * @param {string} process.env.mongo_url URL ของ MongoDB
 * @return {mongoose.Connection} การเชื่อมต่อกับฐานข้อมูล MongoDB
 */
mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected' , ()=>{
    console.log('Mongo DB Connected');
})

connection.on('error' , (err)=>{
    console.log('Mongo DB Failed');
})


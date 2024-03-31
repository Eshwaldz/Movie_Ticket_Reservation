const mongoose = require('mongoose');

// กำหนดโครงสร้างข้อมูลสำหรับการแสดง
const showSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    movie : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies', // อ้างอิงไปยังโมเดล movies
        required: true
    },
    ticketPrice : {
        type: Number,
        required: true
    },
    totalSeats : {
        type: Number,
        required: true
    },
    bookedSeats : {
        type: Array,
        default: []
    },
    theatre : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theatres', // อ้างอิงไปยังโมเดล theatres
        required: true
    },
} , { timestamps: true }); // เพิ่ม timestamps สำหรับ createdAt และ updatedAt

// สร้างและ export โมเดล Show
const Show = mongoose.model('shows', showSchema);
module.exports = Show;
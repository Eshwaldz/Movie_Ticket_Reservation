const express = require("express");
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');

// เรียกใช้ middleware เพื่อให้ Express สามารถอ่าน JSON ได้
app.use(express.json());

// เรียกใช้เส้นทางของแต่ละแอพพลิเคชั่น
const usersRoute = require('./routes/usersRoute');
const moviesRoute = require("./routes/moviesRoute");
const theatresRoute = require("./routes/theatresRoute");
const bookingsRoute = require("./routes/bookingsRoute");

// กำหนดเส้นทางของแต่ละแอพพลิเคชั่น
app.use('/api/users', usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatresRoute);
app.use("/api/bookings", bookingsRoute);

// กำหนดพอร์ตที่ Express จะรันบน
const port = process.env.PORT || 5000;

const path = require("path");
__dirname = path.resolve();

// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// เริ่มต้น Express ให้รอการเชื่อมต่อบนพอร์ตที่กำหนด
app.listen(port, () =>
  console.log(`Node JS Server is running on port ${port}`)
);

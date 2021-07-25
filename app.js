const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

//routers
const driverRouter = require("./router/driver-router");
const reports = require('./router/reports/reports')

const mechanicRouter = require("./router/mechnic-router");
const serviceCenterRouter = require("./router/service-center-router");
const sparepartShopRouter = require("./router/sparepart-shop-router");
const adminRouter = require("./router/admin-router");
const faqRouter = require('./router/faq-router')

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use("/images", express.static(path.join("images")));

app.use("/api", adminRouter);

app.use("/api/drivers", driverRouter);
app.use('/api/report', reports)

app.use("/api/mechanics", mechanicRouter);
app.use("/api/service-centers", serviceCenterRouter);
app.use("/api/sparepart-shops", sparepartShopRouter);
app.use("/api/faq", faqRouter)

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log("database not connected");
  });

app.listen(port, () => {
  console.log("app runs on port ", process.env.PORT);
});


// https://dirver-friend.herokuapp.com

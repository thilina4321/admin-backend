const express = require('express')
require('dotenv').config()
const app = express()
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const driverRouter = require('./router/driver-router')
const mechanicRouter = require('./router/mechnic-router')
const serviceCenterRouter = require('./router/service-center-router')
const sparepartShopRouter = require('./router/sparepart-shop-router')
const adminRouter = require('./router/admin-router')


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PATCH, DELETE, OPTIONS, PUT"
        );
        next();
      });


      // app.use(cors())
      app.use(express.json())
      const port = process.env.PORT
      const DATABASE_URL = process.env.DATABASE_URL

app.use('/images', express.static(path.join("images")))

app.use('/api', adminRouter)
app.use('/api/drivers', driverRouter)
app.use('/api/mechanics', mechanicRouter)
app.use('/api/service-centers', serviceCenterRouter)
app.use('/api/sparepart-shops', sparepartShopRouter)

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
  console.log('connect to database');
}).catch(err=>{
  console.log('database not connected');
})

app.listen(port, ()=>{
  console.log('app runs on port ', port);
})

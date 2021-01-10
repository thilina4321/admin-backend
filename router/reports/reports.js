const express = require("express");
const router = express.Router();

const driverReport = require("../../controller/reports-controller/drivers-report");
const mechanicReport = require("../../controller/reports-controller/mechanic-report");
const serviceReport = require("../../controller/reports-controller/service-center-report");
const spareReport = require("../../controller/reports-controller/spareshop-report");

router.get("/driver", driverReport.driverReport);
router.get("/mechanic", mechanicReport.mechanicReport);
router.get("/service", serviceReport.serviceReport);
router.get("/spare", spareReport.spareReport);

module.exports = router;

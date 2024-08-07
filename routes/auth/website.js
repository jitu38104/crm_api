const express = require("express");
const router = express.Router();
const {website} = require("../../controllers/index");

router.post("/signup", website.register);

router.post("/buy_package", website.checkoutPackage);

router.post("/add_demo", website.demoSchedule);

router.get("/get_schedule_demos", website.fetchDemoScheduleData);

router.post("/insertScheduleDemoToOpen", website.insertInToOpenSchedule);

router.post("/updateScheduleDemoStatus", website.updateScheduleDemoStatus);

router.get("/continent_countries", website.countriesData);

//////////////////////////////--Excel--//////////////////////////////
router.get("/get_excel_commodities", website.getAllCommodities);

router.get("/get_excel_companies", website.getAllCompanies);

router.get("/get_excel_ports", website.getAllPorts);

router.get("/get_excel_exchange", website.getAllExchangeRate);


module.exports = router;

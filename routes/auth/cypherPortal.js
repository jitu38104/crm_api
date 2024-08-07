const express = require("express");
const router = express.Router();
const {cypherPortal} = require("../../controllers/index");

router.get("/getRequestedCompanies", cypherPortal.getRequestedCompanies);

router.post("/updateRequestedCompany", cypherPortal.updateRequestedCompany);

router.post("/addNewCompany", cypherPortal.addNewCompany);

router.post("/updateCompanyInfo", cypherPortal.updateCompanyDetail);

router.get("/getSingleCompany", cypherPortal.getSingleCompany);

module.exports = router;

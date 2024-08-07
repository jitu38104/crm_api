const express = require("express");
const router = express.Router();
const {cypherWeb} = require("../../controllers/index");

router.get("/getSearchCompany", cypherWeb.getSearchedCompanyData);

router.get("/getProducts", cypherWeb.getProductData);

router.get("/getHsCodes", cypherWeb.getHsCodeData);

router.get("/getSearchWords", cypherWeb.getSearchWords);

router.get("/getHsCodeList", cypherWeb.getHsCodeLists);

module.exports = router;

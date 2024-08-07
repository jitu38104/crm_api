const express = require("express");
const router = express.Router();
const {login, registration, user} = require("../../controllers/index");


router.post("/login", login.userLogin);

router.post("/logout", login.userLogout);

router.post("/register", registration.userRegister);

router.get("/getInvoiceNum", user.fetchInvoiceNumber);

router.get("/updateInvoiceNum", user.updateInvoiceNumber);

router.get("/resetInvoiceNumber", user.resetInvoiceNumber);

router.get("/getAllUsers", user.fetchAllUsers);

router.post("/sendEmail", user.sendInvoiceEmail);

router.post("/sendTaxInvoiceEmail", user.sendTaxInvoiceMail);

router.get("/sendOtpPass", login.otpLogin);

router.post("/getUserAttendance", user.getUserAttendanceList);

router.post("/addNewCrmUser", registration.userRegister);

router.post("/addCustomPermission", registration.insertCustomPermission);

router.post("/addAdminOptionPermission", registration.insertAdminPermission)

module.exports = router;

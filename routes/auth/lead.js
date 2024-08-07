const express = require("express");
const router = express.Router();
const {lead} = require("../../controllers/index");

router.get("/getOpenLeads", lead.fetchOpenLeads);

router.get("/getCloseLeads", lead.fetchCloseLeads);

router.delete("/deleteOpenLead", lead.deleteOpenLead);

router.get("/getRejectLeads", lead.fetchRejectLeads);

router.post("/addRejectLead", lead.insertRejectLead);

router.delete("/deleteRejectLead", lead.deleteRejectLead);

router.get("/getFollowupLeads", lead.fetchFollowupLeads);

router.delete("/deleteFollowupLead", lead.deleteFollowupLead);

router.post("/addSingleLead", lead.insertOpenLead);

router.post("/addMultipleLeads", lead.insertExcelOpenLeads);

router.post("/revertToOpenLeads", lead.revertOpenLead);

router.post("/updateOpenLead", lead.updateSingleLead);

router.post("/addFollowupLead", lead.insertFollowupLead);

router.post("/addDemoLead", lead.insertDemoLead);

router.get("/getDemoLeads", lead.fetchDemoLeads);

router.delete("/deleteDemoLead", lead.deleteDemoLead);

router.post("/addStatusLead", lead.insertStatusLead);

router.get("/getStatusLead", lead.fetchStatusLead);

router.post("/updateStatusLead", lead.updateStatusLead);

router.delete("/deleteStatusLead", lead.deleteStatusLead);

router.get("/getPriceLeads", lead.fetchPriceLeads);

router.post("/addPriceLead", lead.insertPriceLead);

router.delete("/deletePriceLead", lead.deletePriceLead);

router.post("/addInvoiceLead", lead.insertInvoiceLead);

router.get("/getInvoiceLeads", lead.fetchInvoiceLeads);

router.delete("/deleteInvoiceLead", lead.deleteInvoiceLead);

router.get("/getTaxInvoiceLeads", lead.fetchTaxInvoiceLeads);

router.post("/addTaxInvoiceLead", lead.insertTaxInvoiceLead);

router.delete("/deleteTaxInvoiceLead", lead.deleteTaxInvoiceLead);

router.post("/updatePartialFollowupLead", lead.updateFollowUpLead);

router.post("/updatePartialOpenLead", lead.updateOpenLead);

router.post("/updatePartialAllLead", lead.updateLeadRemark);

router.post("/updateDemoLead", lead.updateDemoLead);

router.post("/updatePriceLead", lead.updatePriceLead);

router.post("/updateTaxInvoiceLead", lead.updateTaxInvoiceLead);

router.post("/updateOpenLeadUser", lead.updateOpenLeadUser);

router.post("/updateInvoideLead", lead.updateInvoiceLead);

router.post("/updateStatusRemark", lead.updateStatusRemark);

router.post("/addCloseLead", lead.insertCloseLead);

router.get("/getUserAllLeads", lead.fetchUserWiseLeads);

router.post("/fetchDatewiseInvoiceLeads", lead.fetchInvoiceDatewiseLeads);

module.exports = router;

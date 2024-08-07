const {crmPool:db} = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.general = {
    fetchCompanies: (req, res, next) => {
        const sql = 'select id, company_name from "crm_masterLeads" where active=true';

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    
    fetchSingleCompanyData: (req, res, next) => {
        const sql = `select id, company_name, name, designation, department, address, contact, email, location, 
        gst_num, pan_num, iec_num, source, transaction_time, active, source_detail from "crm_masterLeads" 
        where id=${req.query?.leadId} and active=true`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchEmailExistance: (req, res, next) => {
        const sql = `select * from "crm_masterLeads" where email='${req.query.email}'`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { 
                    if(result.rows.length>0) { res.status(200).json({ error: false, flag: "EXIST" }); }
                    else { res.status(200).json({ error: false, flag: "NOT EXIST" }); }
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchAllEmails: (req, res, next) => {
        const sql1 = `select distinct lower(trim(email)) as email from "crm_masterLeads" where not lower(email) in ('', ' ', 'n a', 'n/a', 'na') and active=true`;
        const sql2 = `select distinct lower(trim(company_name)) as company from "crm_masterLeads" where active=true`;
        
        try {
            db.query(sql1, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    db.query(sql2, (err2, result2) => {
                        if (err2) { next(ErrorHandler.internalServerError(err2.message)); }
                        else { 
                            const listObj = { emails: result.rows, companies: result2.rows };
                            res.status(200).json({ error: false, result: listObj }); 
                        }
                    });
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchAllRoles: (req, res, next) => {
        const sql = `select id, name, permission_id from crm_roles where active=true`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchRolePermission: (req, res, next) => {
        const roleId = req.query.id;
        const sql = `select add_user, edit_user, delete_user, add_lead, edit_lead, has_dashboard, has_admin, has_lead, has_demo, has_pricing, has_invoice,
        has_chat, has_assignment from crm_permissions where id=${roleId} and active=true`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    getInvoiceReports: (req, res, next) => {
        const sql = `select report_name from "crm_invoiceReport" where active=true order by report_name;`;
        
        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
}

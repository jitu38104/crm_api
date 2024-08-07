const {crmPool:db} = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.registration = {
    userRegister: (req, res, next) => {
        const {userName, userEmail, userPhone, password, roleId, permissionId, adminOptPermission} = req.body;
        
        const sql = `insert into crm_users(name, email, contact, password, role, permission_id, 
        created_on, active, "adminPermissionId") values('${userName}', '${userEmail}', '${userPhone}', '${password}', 
        '${roleId}', ${permissionId}, now(), true, ${adminOptPermission})`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({error: false, msg: "Insert Successfull"}); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },
        

    insertCustomPermission: (req, res, next) => {
        const {AddUser, EditUser, DeleteUser, AddLead, EditLead, Dashboard, AdminPanel, LeadPanel, DemoPanel, PricePanel, InvoicePanel, GroupChat, LeadAssignment, userEmail} = req.body;
        const commentDesc = `Custom permission for user ${userEmail}`;
        const sql = `insert into crm_permissions (add_user, edit_user, delete_user, add_lead, edit_lead, has_dashboard, 
        has_admin, has_lead, has_demo, has_pricing, has_invoice, has_chat, has_assignment, transaction_time, active,
        comment) values(${AddUser}, ${EditUser}, ${DeleteUser}, ${AddLead}, ${EditLead}, ${Dashboard}, ${AdminPanel}, 
        ${LeadPanel}, ${DemoPanel}, ${PricePanel}, ${InvoicePanel}, ${GroupChat}, ${LeadAssignment}, now(), true, 
        '${commentDesc}') returning id`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({error: false, result: result.rows}); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    insertAdminPermission: (req, res, next) => {
        const {attendance, add_new_user, see_leads, see_web_leads} = req.body;
        const sql = `insert into "crm_adminOptsPermit" (attendance, add_new_user, see_leads, see_web_leads, active, transaction_time)
        values(${attendance}, ${add_new_user}, ${see_leads}, ${see_web_leads}, true, NOW()) returning id`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({error: false, result: result.rows}); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
};


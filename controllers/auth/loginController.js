const {crmPool:db} = require("../../config/db");
const {getMinutes, setTimeInFormat} = require("../../utils/timeConvertor");
const {ErrorHandler} = require("../../error/ErrorHandler");

exports.login = {
    userLogin: (req, res, next) => {
        const {username, password, date, time} = req.body;
        const query = `select * from crm_users where email='${username}' and active=true`;
        const query2 = `select table2.id, name, email, password, role, permission_id, "adminPermissionId", add_user, edit_user, 
        delete_user, add_lead, edit_lead, has_dashboard, has_admin, has_lead, has_demo, has_pricing, has_invoice, has_assignment, 
        has_chat, attendance, add_new_user, see_leads, see_web_leads from "crm_permissions" as table1 full outer join crm_users as table2 
        on table1.id=table2.permission_id full outer join "crm_adminOptsPermit" as adminpermit on adminpermit.id=table2."adminPermissionId" 
        where password='${password}' and table2.active=true`;
        const query3 = `insert into crm_attendance (user_id, email, "Date", login_time, logout_time, transaction_time) 
        values($1, '${username}', '${date}', '${time}', '', now()) returning id`;

        try {
            db.query(query, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    if(result.rows.length>0) {
                        db.query(query2, (err2, result2) => {
                            if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                            else {
                                if(result2.rows.length>0) {
                                    const userId = result2.rows[0]["id"]
                                    db.query(query3, [userId], (err3, result3) => {
                                        if(err3) { next(ErrorHandler.internalServerError(err3.message)); }
                                        else {
                                            const insertedId = result3.rows[0]["id"];
                                            result2.rows[0]["loginId"] = insertedId;
                                            res.json({error: false, result: result2.rows});
                                        }                                        
                                    });
                                } else next(ErrorHandler.authenticationError("Password is incorrect!"));
                            }
                        });
                    } else { next(ErrorHandler.authenticationError("Username is invalid!")); }
                }
            });           
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    userLogout: (req, res, next) => {
        const {id, email, time} = req.body;
        const sql1 = `select CAST("Date" as text), login_time from crm_attendance where id=${id}`;
        
        try {
            db.query(sql1, (err1, result1) => {
                if(err1) { next(ErrorHandler.internalServerError(err1.message)); }
                else {
                    const {Date, login_time} = result1.rows[0];
                    const totalMinutes = getMinutes(`${Date} ${login_time}`, `${Date} ${time}`);
                    const sql2 = `update crm_attendance set logout_time='${time}', total_minutes='${totalMinutes}' where id=${id} and email='${email}'`;                    

                    db.query(sql2, (err2, result2) => {
                        if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                        else { res.json({error: false, msg: "Logout Successfully"}); }
                    });
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    otpLogin: (req, res, next) => {
        const otpNum = req.query.otp;
        res.json({error: false, result: Number(otpNum)});
    }
}; 
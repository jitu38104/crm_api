const {crmPool:db} = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.website = {
    register: (req, res, next) => {
        const {name, company, email, source, phone, isAlreadyUser} = req.body;
        const sql = `insert into website_register (name, company_name, email, phone, already_user, 
            source, transaction_time) values('${name}', '${company}', '${email}', '${phone}', 
            '${isAlreadyUser}', '${source}', NOW())`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    checkoutPackage: (req, res, next) => {
        const {name, country, company, email, phone, source, planName, msg} = req.body;
        const sql = `insert into website_checkout (name, company_name, email, phone, country, source, plan_name, 
            transaction_time, requirement) values('${name}', '${company}', '${email}', '${phone}', '${country}', 
            '${source}', '${planName}', NOW(), '${msg}')`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    demoSchedule: (req, res, next) => {
        const {time, date, name, company, email, phone, desc, source} = req.body;
        const sql = `insert into "website_scheduleDemo" (schedule_date, schedule_time, user_name, company_name, email,
            phone, description, transaction_time, source) values('${date}', '${time}', '${name}', '${company}', '${email}', '${phone}', 
            $1, NOW(), '${source}')`;
 
        try {
            db.query(sql, [desc],(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    countriesData: (req, res, next) => {
        const continentName = req.query.continent;
        const sql = `select * from "website_ImpExp_Countries" where continent_name='${continentName}' and active=true;`

        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {
                    res.status(200).json({ error: false, result: result.rows });
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    fetchDemoScheduleData: (req, res, next) => {
        const sql = `select "id", schedule_date, schedule_time, user_name, company_name, email, phone, description, 
        "source", transaction_time, is_assigned from "website_scheduleDemo" order by schedule_date desc`;
        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    insertInToOpenSchedule: (req, res, next) => {
        const {selectedLeads, existingUser, assignedUser, assignedLeadData} = req.body;
        const sql1 = `select user_name, company_name, email, phone, description from "website_scheduleDemo" 
        where id in (${selectedLeads.toString()}) and is_assigned=false`;
        
        try {
            db.query(sql1,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { 
                    const leadList = result.rows;
                    const len = leadList.length;
                    
                    for(let i=0; i<len; i++) {
                        const {user_name, company_name, email, phone, description} = leadList[i];
                        const sql2 = `insert into "crm_masterLeads" (company_name, name, designation, department, address,
                            contact, email, location, gst_num, pan_num, iec_num, source, transaction_time, source_detail, active) 
                            values ($1, $2, '', '', '', $3, $4, '', '', '', '', '', NOW(), 'website', true) returning id`;
                        const sql3 = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
                            followup_tracker, current_stage, transaction_time, active) values ($1, $2, $3, '', $4, $5, '', $6, 'open', NOW(), true)`;

                        db.query(sql2, [company_name, user_name, phone, email], (err2, result2) => {
                            if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                            else {
                                const insertedId = result2.rows[0]["id"];
                                const remark = `User's Remark: ${description}`;
                                const newTrackerData = [{ date: assignedLeadData?.date, remark: `Lead assigned by ${assignedLeadData?.name} of Website` }];
                                const sqlParams = [insertedId, remark, assignedLeadData?.date, existingUser, assignedUser, JSON.stringify(newTrackerData)];

                                db.query(sql3, sqlParams, (err3, result3) => {
                                    if(err3) { next(ErrorHandler.internalServerError(err3.message)); }
                                    else {
                                        if(i == len-1) {res.status(200).json({ error: false, msg: "Inserted Successful" });}
                                    }
                                });                        
                            }
                        });
                    }
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    updateScheduleDemoStatus: (req, res, next) => {
        const {selectedLeads} = req.body;
        const sql = `update "website_scheduleDemo" set is_assigned=true where id in (${selectedLeads.toString()}) and is_assigned=false`;

        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, msg: "Updated Successful" }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    ///////////////////////// EXCEL APIS ///////////////////////////
    getAllCommodities: (req, res, next) => {
        const sql = "select hscode2dig, industry_classification from excel_commoditydesc";
        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    getAllPorts: (req, res, next) => {
        const sql = "select other_port, mode_of_port, cush, location from excel_portinfo";
        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getAllCompanies: (req, res, next) => {
        const sql = "select companyname, iec, phone, e_mail, contactperson, address, city, pin from excel_importerinfo";
        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getAllExchangeRate: (req, res, next) => {
        const sql = "select date, imp_exchange_rate, exp_exchange_rate from excel_exchange_rate";
        try {
            db.query(sql,(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    }
}

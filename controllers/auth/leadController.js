const {crmPool:db} = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

const isNotValue = (val) => ["",null].includes(val);

exports.lead = {
    /***************Fetching**********************/
    fetchOpenLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, remarks, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, current_stage, followup_tracker, table1.transaction_time, user_id, 
        source_detail from "crm_masterLeads" as table1 full outer join crm_openleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} 
        and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchFollowupLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, followup_tracker, table1.transaction_time, 
        source_detail from "crm_masterLeads" as table1 full outer join crm_followupleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} 
        and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchRejectLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, followup_tracker, table1.transaction_time, 
        source_detail from "crm_masterLeads" as table1 full outer join crm_rejectleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} 
        and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    
    fetchCloseLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, followup_tracker, table1.transaction_time, 
        table2.transaction_time as "closingTime", source_detail from "crm_masterLeads" as table1 full outer join crm_closeleads as table2 on 
        table1.id=table2.leadid where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, result: result.rows }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    fetchStatusLead: (req, res, next) => {
        const {userId} = req.query;
        const sql = `select id, lead_data, assigners, status, transaction_time, active, email, updated_remark, leadid 
        from crm_statusleads where ${userId}=any(assigners) and active=true order by transaction_time desc`;
        
        try {
            db.query(sql, (err, result) => {
                if(err)  {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    fetchDemoLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, demo_time, company_name, name, designation, department, address, contact, email, location, gst_num,
        pan_num, remarks, source, iec_num, last_followup, next_followup, (select name from crm_users where id=assigned_from) as assigned_from, assigned_from as assigned_from_id, 
        lead_tracker, followup_tracker, table1.transaction_time, source_detail from "crm_masterLeads" as table1 full outer join crm_demoleads as table2 on table1.id=table2.leadid 
		where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    fetchPriceLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num, assigned_from as assigned_from_id,
        pan_num, remarks, source, iec_num, last_followup, next_followup, (select name from crm_users where id=assigned_from) as assigned_from, lead_tracker, 
        followup_tracker, table1.transaction_time, source_detail from "crm_masterLeads" as table1 full outer join crm_priceleads as table2 on table1.id=table2.leadid 
        where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    fetchInvoiceLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num, performa_num, pan_num, 
        remarks, source, iec_num, last_followup, next_followup, discount, plan_price, assigned_from as assigned_id, (select name from crm_users where id=assigned_from) as assigned_from, 
        lead_tracker, followup_tracker, table2.transaction_time, payment_status, plan_name, source_detail, report_type, duration from "crm_masterLeads" as table1
        full outer join crm_invoiceleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;
        
        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    fetchTaxInvoiceLeads: (req, res, next) => {
        const { userId } = req.query;
        const sql = `select table2.id, leadid, user_id, plan_name, issued_by, (select name from crm_users where id=table2.issued_by) as issued_name, 
        company_name, name, designation, department, address, contact, email, location, gst_num, pan_num, source, iec_num, plan_name, invoice_date, 
        shipping_add, billing_add, tax_num, performa_num, discount, report_name, duration, "HSN_SAC", quantity, unit, "amountBeforeTax", "amountAfterTax", tax_amt, 
        "CGST_taxPer", "SGST_taxPer", "IGST_taxPer", bank_data, payment_status, is_closed, table2.transaction_time from "crm_masterLeads" as table1 full outer join 
        crm_taxinvoiceleads as table2 on table1.id=table2.leadid where table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    fetchUserWiseLeads: (req, res, next) => {
        const sql = `select table2.id, leadid, user_id, (select "name" from crm_users where id=user_id) as user_name, remarks, company_name, "name", designation, 
        department, address, contact, email, location, gst_num, pan_num, source, iec_num, last_followup, next_followup, assigned_from, lead_tracker, current_stage, 
        followup_tracker, table1.transaction_time, user_id, table2.transaction_time as "closingTime", source_detail from "crm_masterLeads" as table1 full outer join 
        crm_openleads as table2 on table1.id=table2.leadid where table2.active=true order by table1.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    fetchInvoiceDatewiseLeads: (req, res, next) => {
        const {from, to, userId, invoiceType} = req.body;
        const sql = invoiceType=="invoice"
        ? `select table2.id, leadid, user_id, company_name, name, designation, department, address, contact, email, location, gst_num, performa_num, pan_num, 
        remarks, source, iec_num, last_followup, next_followup, plan_price, assigned_from as assigned_id, (select name from crm_users where id=assigned_from) as assigned_from, 
        lead_tracker, followup_tracker, table1.transaction_time, payment_status, plan_name, source_detail, report_type, duration from "crm_masterLeads" as table1
        full outer join crm_invoiceleads as table2 on table1.id=table2.leadid where table2.transaction_time>='${from}' and table2.transaction_time<='${to}' and 
        table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`
        
        : `select table2.id, leadid, user_id, plan_name, issued_by, (select name from crm_users where id=table2.issued_by) as issued_name, 
        company_name, name, designation, department, address, contact, email, location, gst_num, pan_num, source, iec_num, plan_name, invoice_date, 
        shipping_add, billing_add, tax_num, performa_num, report_name, duration, "HSN_SAC", quantity, unit, "amountBeforeTax", "amountAfterTax", tax_amt, 
        "CGST_taxPer", "SGST_taxPer", "IGST_taxPer", bank_data, payment_status, is_closed, table2.transaction_time from "crm_masterLeads" as table1 full outer join 
        crm_taxinvoiceleads as table2 on table1.id=table2.leadid where table2.transaction_time>='${from}' and table2.transaction_time<='${to}' and 
        table2.user_id=${userId} and table2.active=true order by table2.transaction_time desc`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    /***************Inserting**********************/
    insertOpenLead: (req, res, next) => {
        const { username, company, designation, department, remark, address, location, email, contact, gst, pan, iec, userId, leadTracker, followupTracker, lastFollow, nextFollow, assignedFrom, source, reference } = req.body;

        const sql1 = `insert into "crm_masterLeads" (company_name, name, designation, department, address,
            contact, email, location, gst_num, pan_num, iec_num, source, transaction_time, source_detail, active) 
            values ($1, $2, $3, $4, $5, $6, $7, $8, '${gst}', '${pan}', '${iec}', $9, NOW(), $10, true) returning id`;
        const sourceDetail = source=="reference" ? JSON.stringify(reference) : "";
        const sql1Arr = [company, username, designation, department, address, contact, email, location, source, sourceDetail];
        
        const sql2 = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values($1, $2, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $3, $4, 'open', NOW(), true)`;

        try {
            
            db.query(sql1, sql1Arr, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {
                    const insertedId = result.rows[0]["id"];
                    db.query(sql2, [insertedId, remark, leadTracker, followupTracker], (err2, result2) => {
                        if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                        else {res.status(200).json({ error: false, msg: "Inserted Successful" });}
                    });
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    insertExcelOpenLeads: async(req, res, next) => {
        const { excelJson } = req.body;
        const excelRecords = JSON.parse(excelJson);
        
        try {
            for(let i=0; i<excelRecords.length; i++) {
                const { username, company, designation, department, source, address, location, email, lastFollow, contact, gst, pan, iec, userId } = excelRecords[i];
                const sql1Arr = [company, username, designation, department, address, contact, email, location, source];
                const sql = `insert into "crm_masterLeads" (company_name, name, designation, department, address,
                    contact, email, location, gst_num, pan_num, iec_num, source, transaction_time, active) 
                    values ($1, $2, $3, $4, $5, $6, $7, $8, '${gst}', '${pan}', '${iec}', $9, NOW(), true) returning id`;
                const sql2 = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
                    followup_tracker, current_stage, transaction_time, active) values($1, '', $2, NULL, NULL, ${userId}, '', '', 'open', NOW(), true)`;                 

                const result = await db.query(sql, sql1Arr); //masterLead insertion
                const insertedId = result.rows[0]["id"];
                await db.query(sql2, [insertedId, lastFollow]);//openlead insertion

                if(i+1 == excelRecords.length) {
                    res.status(200).json({ error: false, msg: "Inserted Successful" });                             
                }
            }
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },

    
    revertOpenLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_openleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, ${isNotValue(lastFollow)?'NULL':`'${lastFollow}'`}, 
            ${isNotValue(nextFollow)?'NULL':`'${nextFollow}'`}, ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 
            'open', NOW(), true)`;
    
        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    insertCloseLead: (req, res, next) => {
        const {leadId, userId, invoiceId} = req.body;
        const sql = `select id, lead_data, assigners, updated_remark from crm_statusleads where leadid=${leadId}`;
        const sql5 = `update crm_taxinvoiceleads set is_closed=true where id=${invoiceId} and active=true`;
        try {
            db.query(sql, async(err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {
                    if(result.rows.length>0) {
                        const {id, lead_data, assigners, updated_remark} = result.rows[0];
                        const {lastFollow, nextFollow, leadTracker, followupTracker} = JSON.parse(lead_data);
                        const sql2 = `insert into crm_closeleads (leadid, remarks, last_followup, next_followup, user_id, 
                        current_stage, transaction_time, lead_tracker, followup_tracker, active) values(${leadId}, $1, 
                        '${lastFollow}', '${nextFollow}', $2, 'close', now(), $3, $4, true)`;                                
                        const sql3 = `update crm_statusleads set active=false where id=${id}`;

                        // const assignersLen = assigners.length;
                        // for(let i=0; i<assignersLen; i++) {
                        //     await db.query(sql2, [updated_remark, assigners[i], leadTracker, followupTracker]);
                        // }

                        await assigners.forEach(async(id) => {
                            await db.query(sql2, [updated_remark, id, leadTracker, followupTracker]);
                        });

                        db.query(sql3, async(err2, result2) => {
                            if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                            else {
                                await db.query(sql5);
                                res.status(200).json({error: false, msg: "Closed Successfull"});
                            }
                        });
                    } else {
                        const sql4 = `insert into crm_closeleads (leadid, user_id, current_stage, transaction_time, active) 
                        values(${leadId}, ${userId}, 'close', now(), true)`;

                        db.query(sql4, async(err2, result2) => {
                            if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                            else {
                                await db.query(sql5);
                                res.status(200).json({error: false, msg: "Closed Successfull"});
                            }
                        });
                    }
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    insertFollowupLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_followupleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 'follow up', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    insertRejectLead: (req, res, next) => {
        const {leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_rejectleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`'${assignedFrom}'`}, ${userId}, $2, $3, 'reject', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(err.message));}
    },


    insertDemoLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom, demoTime } = req.body;
        const sql = `insert into crm_demoleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, demo_time, active) values(${leadId}, $1, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, $2, $3, 'demo', NOW(), '${demoTime}', true)`;
    
        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    insertInvoiceLead: async(req, res, next) => {
        const { leadId, gst, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom, plan_name, plan_price, performa_num, discount, assigningFrom, reportType, duration } = req.body;

        //this query is used when moving lead to invoice table
        const sql = `insert into crm_invoiceleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, performa_num, lead_tracker,  
            followup_tracker, current_stage, transaction_time, active, plan_name, plan_price, payment_status) values(${leadId}, $1, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, '${performa_num}', $2, $3, 'invoice', NOW(), true, '${plan_name}', '${plan_price}', 'pending')`;
        
        //this query is used when new PI is required
        const sql2 = `insert into crm_invoiceleads (leadid, discount, assigned_from, user_id, performa_num, current_stage, transaction_time, active, plan_price, 
            report_type, duration, payment_status) values(${leadId}, ${discount}, ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, '${performa_num}', 'invoice', NOW(), 
            true, '${plan_price}', '${reportType}', '${duration}', 'pending')`;
        
        const sql3 = `update "crm_masterLeads" set gst_num='${gst}' where id=${leadId}`;

        const requiredSql = assigningFrom == "addInvoice" ? sql : sql2;
        const requiredArr = assigningFrom == "addInvoice" ? [remark, leadTracker, followupTracker] : [];
        
        try {
            await db.query(sql3);
            db.query(requiredSql, requiredArr, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });            
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    insertStatusLead: (req, res, next) => {
        const {leadData, assigner, status} = req.body;
        const {email, leadId, remark} = JSON.parse(leadData);
        // const sql1 = `select * from crm_statusleads where email='${email}' and active=true`;
        const sql1 = `select * from crm_statusleads where leadid='${leadId}' and active=true`;
        const sql2 = `insert into crm_statusleads (lead_data, assigners, status, transaction_time, email, leadid, 
            updated_remark, active) values($1, $2, '${status}', now(), $3, ${leadId}, $4, true)`;
        const sql3 = `update crm_statusleads set lead_data=$1, assigners=$2, email=$3, updated_remark=$4, status='${status}', 
            transaction_time=NOW() where leadid=${leadId} and active=true`;

        try {
            db.query(sql1, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {
                    if(result.rows.length>0) {
                        console.log(sql3, leadId, remark)
                        const assignerArr = (result.rows[0]["assigners"]);

                        if(assignerArr.includes(assigner)) assignerArr.splice(assignerArr.indexOf(assigner), 1);
                        assignerArr.push(assigner);

                        db.query(sql3, [leadData, assignerArr, email, remark], (err2, result2) => {
                            if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                            else {res.status(200).json({error: false, msg: "Update Successful"});}
                        });
                    } else {
                        const assignerArr = [ assigner ];
                        db.query(sql2, [leadData, assignerArr, email, remark], (err2, result2) => {
                            if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                            else {res.status(200).json({error: false, msg: "Insert Successful"});}
                        });
                    }
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    insertPriceLead: (req, res, next) => {
        const { leadId, lastFollow, nextFollow, remark, userId, leadTracker, followupTracker, assignedFrom } = req.body;
        const sql = `insert into crm_priceleads (leadid, remarks, last_followup, next_followup, assigned_from, user_id, lead_tracker, 
            followup_tracker, current_stage, transaction_time, active) values(${leadId}, $1, '${lastFollow}', '${nextFollow}', 
            ${isNotValue(assignedFrom)?'NULL':`${assignedFrom}`}, ${userId}, $2, $3, 'price', NOW(), true)`;

        try {
            db.query(sql, [remark, leadTracker, followupTracker], (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    insertTaxInvoiceLead: (req, res, next) => {
        const {leadId, userId, planName, invoiceDate, address, taxNum, performaNum, reportName, duration, hsnSac, qty, unit, amount, taxAmt, gstTax, bankData, dataType, discount, isEmailSent, attachment, paymentStatus, issuedBy, clientEmail} = req.body;
        const shippingAddress = `${address[0]?.line1}~${address[0]?.line2}`;
        const billingAddress = `${address[1]?.line1}~${address[1]?.line2}`;
        // const sql = `delete from crm_taxinvoiceleads where leadid=${leadId} and active=true`;
        const sql2 = `insert into crm_taxinvoiceleads (leadid, user_id, plan_name, invoice_date, issued_by, shipping_add,
            billing_add, tax_num, performa_num, report_name, duration, "HSN_SAC", quantity, unit, "amountBeforeTax", "amountAfterTax", 
            tax_amt, "CGST_taxPer", "SGST_taxPer", "IGST_taxPer", bank_data, active, transaction_time, payment_status, data_type, discount) values(${leadId}, 
            ${userId}, '${planName}', '${invoiceDate}', '${issuedBy}', $1, $2, '${taxNum}', ${performaNum}, '${reportName}', '${duration}', 
            '${hsnSac}', ${qty}, '${unit}', $3, $4, '${taxAmt}', ${gstTax?.cgst}, ${gstTax?.sgst}, ${gstTax?.igst}, $5, true, NOW(), '${paymentStatus}', '${dataType}', ${discount})`;
        

        try {
            db.query(sql2, [shippingAddress, billingAddress, amount[0], amount[1], bankData], async(err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Insert Successful"});}
            });
            // db.query(sql, (error, response) => {
            //     if(error) { next(ErrorHandler.internalServerError(error.message)); }
            //     else {
            //         db.query(sql2, [shippingAddress, billingAddress, amount[0], amount[1], bankData], async(err, result) => {
            //             if(err) { next(ErrorHandler.internalServerError(err.message)); }
            //             else {res.status(200).json({error: false, msg: "Insert Successful"});}
            //         });
            //     }
            // });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    /***************Updating**********************/
    updateSingleLead: (req, res, next) => {
        const {id, leadId, username, company, designation, department, remark, source, address, location, email, contact, gst, pan, iec, reference} = req.body;
        const sql1 = `update "crm_masterLeads" set company_name='${company}', name='${username}', designation='${designation}', department='${department}', 
        address='${address}', contact='${contact}', email='${email}', location='${location}', gst_num='${gst}', pan_num='${pan}', iec_num='${iec}', source='${source}', 
        source_detail=$1 where id=${leadId} and active=true`;
        const sql2 = `update "crm_openleads" set remarks=$1 where id=${id} and active=true`;

        try {
            db.query(sql1, [JSON.stringify(reference)], (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else { 
                    db.query(sql2, [remark], (err2, result2) => {
                        if(err2) { next(ErrorHandler.internalServerError(err2.message)); }
                        else { res.status(200).json({error: false, msg: "Update Successfull"}); }
                    });
                }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    updateStatusLead: (req, res, next) => {
        const sql = `update crm_statusleads set status='process', transaction_time=NOW() where leadid='${req.body.leadid}' and active=true`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    updateFollowUpLead: (req, res, next) => {
        const {id, remark, dateTime} = req.body;
        const sql = `update crm_followupleads set remarks=$1, next_followup='${dateTime}' where id=${id} and active=true`;

        try {
            db.query(sql, [remark], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    updateLeadRemark: (req, res, next) => {
        const { id, remark, tableType } = req.body;
        const sql = `update crm_${tableType}leads set remarks=$1 where id=${id} and active=true`;

        try {
            db.query(sql, [remark], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    updateOpenLead: (req, res, next) => {
        const {id, remark, nextFollow, lastFollow, followupTracker} = req.body;
        const sql = `update crm_openleads set remarks=$1, next_followup='${nextFollow}', last_followup='${lastFollow}',
        followup_tracker=$2 where id=${id} and active=true`;

        try {
            db.query(sql, [remark, followupTracker], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
       } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    updateDemoLead: (req, res, next) => {
        const {id, userId, assignedFrom, demoTime, remark} = req.body;
        const sql = `update crm_demoleads set remarks=$1, demo_time='${demoTime}', assigned_from=${assignedFrom}, 
        user_id='${userId}' where id=${id} and active=true`;

        try {
            db.query(sql, [remark], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
       } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    updatePriceLead: (req, res, next) => {
        const {id, userId, assignedFrom, remark} = req.body;
        const sql = `update crm_priceleads set remarks=$1, assigned_from=${assignedFrom}, 
        user_id='${userId}' where id=${id} and active=true`;

        try {
            db.query(sql, [remark], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
       } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    updateInvoiceLead: (req, res, next) => {
        const {id, reportType, duration, rate, discount, paymentStatus} = req.body;
        const sql = `update crm_invoiceleads set plan_price='${rate}', discount=${discount}, report_type='${reportType}', duration='${duration}', 
        payment_status='${paymentStatus}' where id=${id} and active=true`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    updateTaxInvoiceLead: (req, res, next) => {
        const {id, leadId, invoiceDate, address, taxNum, performaNum, issuedBy, reportName, duration, hsnSac, qty, unit, amount, taxAmt, gstTax, bankData, paymentStatus, discount} = req.body;
        const shippingAddress = `${address[0]["line1"]}~${address[0]["line2"]}`;
        const billingAddress = `${address[1]["line1"]}~${address[1]["line2"]}`;
        const {cgst, sgst, igst} = gstTax;
        const sql = `update crm_taxinvoiceleads set invoice_date='${invoiceDate}', shipping_add='${shippingAddress}', billing_add='${billingAddress}', tax_num='${taxNum}', 
        performa_num='${performaNum}', report_name='${reportName}', duration='${duration}', "HSN_SAC"='${hsnSac}', quantity='${qty}', unit='${unit}', "amountBeforeTax"='${amount[0]}', 
        "amountAfterTax"='${amount[1]}', tax_amt='${taxAmt}', "CGST_taxPer"='${cgst}', "SGST_taxPer"='${sgst}', "IGST_taxPer"='${igst}', bank_data='${bankData}', 
        payment_status='${paymentStatus}', issued_by='${issuedBy}', discount=${discount} where id=${id} and active=true`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successful!"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },
    

    updateOpenLeadUser: async(req, res, next) => {
        const {existingUser, assignedUser, selectedLeads, assignedLeadData} = req.body;
        const newTrackerData = { date: assignedLeadData?.date, remark: `Lead assigned by ${assignedLeadData?.name}` };

        try {
            const leadsLen = selectedLeads.length;
            for(let i=0; i<leadsLen; i++) {                                
                const sql = `update crm_openleads set user_id=${assignedUser}, followup_tracker=$1 where id=${selectedLeads[i]["id"]} and user_id=${existingUser}`;
                const followupTracker = selectedLeads[i]["tracker"];
                followupTracker.unshift(newTrackerData);
                
                db.query(sql, [JSON.stringify(followupTracker)], (err, result) => {
                    if(err) {next(ErrorHandler.internalServerError(err.message));}
                    else {
                        if(i==leadsLen-1) {res.status(200).json({error: false, msg: "Update Successful!"});}                    
                    }
                });
            }
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },
    

    updateStatusRemark: (req, res, next) => {
        const {remark, leadId, email, status} = req.body;
        const sql = `update crm_statusleads set updated_remark=$1, email=$2, status='${status}' where leadid=${leadId}`;

        try {
            db.query(sql, [remark, email], (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Update Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    /***************delete**********************/
    deleteOpenLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_openleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    deleteFollowupLead: (req, res, next) => {
        const {id, leadId, userId} = req.query;
        const sql = id 
        ? `delete from crm_followupleads where id=${id} and leadid=${leadId} and user_id=${userId}`
        : `delete from crm_followupleads where id=${leadId} and user_id=${userId}`;
    
        try {
            db.query(sql, (err, result) => {
                if (err) { next(ErrorHandler.internalServerError(err.message)); }
                else { res.status(200).json({ error: false, msg: "Delete Successful" }); }
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    deleteRejectLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_rejectleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    deleteDemoLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_demoleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    deleteStatusLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql1 = `select * from crm_statusleads where id=${leadId}`;
        const sql2 = `delete from crm_statusleads where id=${leadId}`;

        try {
            db.query(sql1, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {
                    const {assigners} = result.rows[0];
                    const assignersArr = assigners.split(",");
                    
                    if(assignersArr.length>1) {
                        assignersArr.splice(assignersArr.indexOf(`${userId}`), 1);
                        const sql3 = `update crm_statusleads set assigners='${assignersArr.toString()}' where id=${leadId}`;

                        db.query(sql3, (err2, result2) => {
                            if(err2) {next(ErrorHandler.internalServerError(err2.message));}
                            else {res.status(200).json({error: false, msg: "Delete Successful!"});}
                        });
                    } else if(assignersArr.length==1) {
                        db.query(sql2, (err3, result3) => {
                            if(err3) {next(ErrorHandler.internalServerError(err3.message));}
                            else {res.status(200).json({error: false, msg: "Delete Successful!"});}
                        });
                    }
                }
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


    deletePriceLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        const sql = `delete from crm_priceleads where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    deleteInvoiceLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        // const sql = `delete from crm_invoiceleads where leadid=${leadId} and user_id=${userId}`;
        const sql = `update crm_invoiceleads set active=false where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    },


    deleteTaxInvoiceLead: (req, res, next) => {
        const {leadId, userId} = req.query;
        // const sql = `delete from crm_taxinvoiceleads where id=${leadId} and user_id=${userId}`;
        const sql = `update crm_taxinvoiceleads set active=false where id=${leadId} and user_id=${userId}`;

        try {
            db.query(sql, (err, result) => {
                if(err) { next(ErrorHandler.internalServerError(err.message)); }
                else {res.status(200).json({error: false, msg: "Delete Successful"});}
            });
        } catch (error) { next(ErrorHandler.internalServerError(error)); }
    }
}


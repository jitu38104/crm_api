const {cypherPool:db} = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

exports.cypherPortal = {
    getRequestedCompanies: (req, res, next) => {
        const sql = `select id, company_name, request_datetime, status, transaction_time, company_id,
        (select "Email" from "Cypher" where "UserId"=requested_from) as "requestedFrom" from 
        requested_companies where active=true order by transaction_time desc`;
        
        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    addNewCompany: (req, res, next) => {
        const {iec, company_name, person_name, contact, email, location, address} = req.body;
        const sql = "insert into indian_companies (iec, company_name, person_name, contact, email, location, address) values($1, $2, $3, $4, $5, $6, $7) returning id";

        try {
            db.query(sql, [iec, company_name, person_name, contact, email, location, address], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Insert Successfull", result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    updateRequestedCompany: (req, res, next) => {
        const {id, datetime, crmUserId, companyId} = req.body;
        const sql = "update requested_companies set resolve_datetime=$1, resolved_by=$2, company_id=$3, status=true where id=$4 and active=true";

        try {
            db.query(sql, [datetime, crmUserId, companyId, id], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successfull"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    updateCompanyDetail: (req, res, next) => {
        const {iec, company_name, person_name, contact, email, location, address, id} = req.body;
        const sql = "update indian_companies set iec=$1, company_name=$2, person_name=$3, contact=$4, email=$5, location=$6, address=$7 where id=$8 and active=true";

        try {
            db.query(sql, [iec, company_name, person_name, contact, email, location, address, id], (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, msg: "Update Successfull"});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getSingleCompany: (req, res, next) => {
        const sql = `select iec, company_name, person_name, contact, email, location, address from indian_companies where id=${req.query.id} and active=true`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({error: false, result: result.rows});}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },


};


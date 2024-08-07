const {cypherPool:db} = require("../../config/db");
const { ErrorHandler } = require("../../error/ErrorHandler");

const columns = `"id","Date", "Year", "Month", "Exp_Name" as supplier, "Imp_Name" as buyer, "ProductDesc", "HsCode",
                "PortofLoading", "PortofDischarge", "CountryofOrigin", "CountryofDestination",
                "Currency", uqc, "Mode", "Quantity", "ValueInUSD"`;

exports.cypherWeb = {
    getSearchedCompanyData: (req, res, next) => {
        const {keyword} = req.query;
        const colTypeQueryStr = !isNaN(Number(keyword)) ? `"HsCode" like '${keyword}%'` : `"ProductDesc" ilike '%${keyword}%'`;
        const sql = `select ${columns} from "60_70_coverage" where ${colTypeQueryStr} limit 100`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({ error: false, result: result.rows });}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getHsCodeData: (req, res, next) => {
        const {product} = req.query;
        const sql = `select ${columns} from "60_70_coverage" where "ProductDesc" ilike '%${product}%' limit 100`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({ error: false, result: result.rows });}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getProductData: (req, res, next) => {
        const {hscode} = req.query;
        const sql = `select ${columns} from "60_70_coverage" where "HsCode" like '%${hscode}%' limit 100`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({ error: false, result: result.rows });}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getSearchWords: (req, res, next) => {
        const QUERY = `https://en.wikipedia.org/w/api.php?action=opensearch&modules=json&origin=*&search=${req.query.keyword}`;

        try {
            fetch(QUERY).then(response => response.json())
            .then(result => { res.status(200).json({error:false, result: result[1]}); });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    },

    getHsCodeLists: (req, res, next) => {
        const {keyword} = req.query;
        const sql = `select "Hscode" from "HSCodes" where "Hscode" like '${keyword}%' limit 10`;

        try {
            db.query(sql, (err, result) => {
                if(err) {next(ErrorHandler.internalServerError(err.message));}
                else {res.status(200).json({ error: false, result: result.rows });}
            });
        } catch (error) {next(ErrorHandler.internalServerError(error));}
    }
};

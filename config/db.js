require("dotenv").config();
const pg = require("pg");

//CRM Database connectivity
const crmPool = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABSE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

crmPool.connect().then(res => {
    console.log("CRM DB is connected!");
}).catch(err => console.log(err));


//Cpyher Database connectivity
const cypherPool = new pg.Pool({
    user: process.env.PORTAL_USER,
    host: process.env.DB_HOST,
    database: process.env.PORTAL_DATABSE,
    password: process.env.PORTAL_PASSWORD,
    port: process.env.DB_PORT,
});

cypherPool.connect().then(res => {
    console.log("Cypher DB is connected!");
}).catch(err => console.log(err));

module.exports = {crmPool, cypherPool};

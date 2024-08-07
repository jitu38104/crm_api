const nodemailer = require("nodemailer");
const fs = require("fs");
require("dotenv").config();

const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


exports.sendEmailWithInvoice = (emailBody, hasAttachement) => {
    return new Promise((resolve, reject) => {
        try {
            const {to, subject, html, filename, filepath} = emailBody;
            const mailOptions = {
                from: "no-reply@myeximpanel.com",
                to, subject, html: mailBodyContent(html)
            };
            if(hasAttachement!="none") {mailOptions["attachments"] = [ { filename, path: filepath } ];}

            transport.sendMail(mailOptions, async(error, info) => {
                if (error) {return reject(error);} 
                else {
                    if(hasAttachement!="none") { fs.unlinkSync(filepath); }
                    return resolve(true);
                }
            });
        } catch (error) {return reject(error);}
    });
}

const mailBodyContent = (body) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
            <title>Email</title>
        </head>
        <body>${body}</body>
        </html>
    `;
}



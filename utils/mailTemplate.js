const { currentGreeting } = require("./timeConvertor");

exports.mailSubjects = (subjectType) => {
    const subjects = {
        online: "PROFORMA INVOICE- FOR ONLINE PORTAL",
        offline: "PROFORMA INVOICE FOR OFFLINE REPORTS",
        taxInvoice: "THIS MESSAGE FOR TAX INVOICE"
    };
    return subjects[subjectType];
}

exports.taxInvoiceTemplate = (clientName) => `
<div style="text-transform:capitalize;">Dear ${clientName},</div>
<br><br><br>
<div>Thanks for dealing with us</div>
<br><br>
<div>Please find the attached TAX INVOICE.</div>
<br><br><br><br>
<div style="font-size:15pt;"><b>---</b></div>
<div style="font-family:Arial,Helvetica,sans-serif;color:#3d85c6;font-weight:700;font-size:18px;letter-spacing:-0.5px;margin-bottom:-5px;">Thanks & Regards</div>
<div style="font-size:14pt;letter-spacing:0.2px;"><b>Shobhna Dhakoliya</b></div>
<div><b style="font-size:10pt;">Accountant</b></div>
<div><b style="font-size:10pt;">Email Id:-</b> <a href="#" style="font-weight:bold;letter-spacing:0.2px;">accounnts.eximine@gmail.com</a></div>
<br>
`;

exports.emailTemplate = (clientName, mediumType) => `
<div style="text-transform:capitalize;">Dear ${clientName},</div>
<br>
<div>Good ${currentGreeting()}!!!</div>
<br><br>
<div>Thanks for the dealing with us,</div>
<br><br>
<div>We want to thank you for your ongoing partnership. Your invoice is ready for your review and can be downloaded as a PDF. You also have the option to make a secure online payment.</div>
<br>
<div>We value your business and look forward to serving you further.</div>
<br><br>
<div><b>Bank Details:</b></div>
<div>Eximine Private Limited</div>
<div><span style="font-weight:600;">Bank Name:</span> ICICI BANK LIMITED</div>
<div><span style="font-weight:600;">Branch:</span> PARLIAMENT STREET, NEW DELHI-01</div>
<div><span style="font-weight:600;">Account No.:</span> 663705600902</div>
<div><span style="font-weight:600;">IFSC:</span> ICIC0006637</div>
<br>
<div><b>Payment Terms:</b></div>
<div>100% Advance</div>
<div>If you have any query please feel free to contact us</div>
<br><br><br><br><br>
<div style="font-size:15pt;"><b>---</b></div>
<div style="font-family:Arial,Helvetica,sans-serif;color:#3d85c6;font-weight:700;font-size:18px;letter-spacing:-0.5px;margin-bottom:-5px;">Thanks & Regards</div>
<div style="font-size:14pt;letter-spacing:0.2px;"><b>Shobhna Dhakoliya</b></div>
<div><b style="font-size:10pt;">Accountant</b></div>
<div><b style="font-size:10pt;">Email Id:-</b> <a href="#" style="font-weight:bold;letter-spacing:0.2px;">accounnts.eximine@gmail.com</a></div>
<br>
`;



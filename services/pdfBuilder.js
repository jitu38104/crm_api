const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const converter = require("number-to-words");

const setNumber = (digit) => {
  if((`${digit}`).includes(".")) return `${digit}`.split(".")[1].length>1 ? `${digit}%` : `${digit}0%`;
  else return `${digit}.00%`;
}

const capitalizeFirstLetter = (value) => {
  const splittedVal = value.split(" ");
  return splittedVal.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(" ");
}

exports.creatPDF = async(userData, filename, pathObj, hasAttachement) => {
  const {invoiceDate, address, taxNum, performaNum, reportName, duration, hsnSac, qty, unit, amount, taxAmt, gstTax, gstAmt, bankData, clientPhone, clientEmail, clientName, companyName, gstNumber} = userData;
  const bankDetails = JSON.parse(bankData);
  const htmlFileName = hasAttachement=="proforma" ? "invoice": hasAttachement=="tax" ? "tax": "taxStamp";
  const htmlFile = fs.readFileSync(path.join(`${pathObj?.filePath}/${htmlFileName}_template.html`), "utf8");
  const document = {
    html: htmlFile, 
    path: `${pathObj?.filePath}/${filename}.pdf`,
    type: "pdf", 
    data: {
      invoiceTitle: filename.includes("Proforma") ? "PROFORMA INVOICE" : "INVOICE",      
      orderNum: performaNum,
      invoiceNum: taxNum,
      issueDate: invoiceDate,
      userName: clientName,
      companyName: companyName,
      shippingAddLine1: address[0]["line1"],
      shippingAddLine2: address[0]["line2"],
      billingAddLine1: address[1]["line1"],
      billingAddLine2: address[1]["line2"],
      clientGstNum: gstNumber,
      phoneNum: clientPhone,
      email: clientEmail,
      reportType: reportName,
      duration: duration,
      hsnSac: hsnSac,
      quantity: qty,
      unit: unit,
      amtBeforeTax: amount[0],
      taxAmt: taxAmt,
      cgst: setNumber(gstTax?.cgst),
      sgst: setNumber(gstTax?.sgst),
      igst: setNumber(gstTax?.igst),
      cgstAmt: gstAmt?.cgstAmt,
      sgstAmt: gstAmt?.sgstAmt,
      igstAmt: gstAmt?.igstAmt,
      amtAfterTax: amount[1],
      amtInWords: capitalizeFirstLetter(converter.toWords(Number(amount[1])).replace(new RegExp("-", "g"), " ").replace(new RegExp(",", "g"), "") + " only"),
      bankName: bankDetails?.bankName,
      bankBranch: bankDetails?.branch,
      bankAccount: bankDetails?.accountNo,
      bankIfsc: bankDetails?.ifsc,
      heroLogo: `${pathObj?.assetPath}/Eximine.png`,
      stampImg: `${pathObj?.assetPath}/stamp1.png`,
    }
  };
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "2mm"
  };
  
  const response = await pdf.create(document, options);
  return response;
}

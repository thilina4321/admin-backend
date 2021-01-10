const pdfDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const SpareShop = require("../../model/spareshop/sparepart-shop-model");

exports.spareReport = async (req, res) => {
  const pdfDoc = new pdfDocument();

  let spareShops = [];
  try {
    spareShops = await SpareShop.find();
    console.log(spareShops);
  } catch (error) {
    console.log(error);
  }
  const pathName = path.join("data", "invoices", "spare-shops.pdf");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline;filename="spare-shops.pdf"');

  pdfDoc.pipe(fs.createWriteStream(pathName));
  pdfDoc.pipe(res);



  pdfDoc.fontSize(26).text("Spare part shop's Report", {
    underline: true,
    align: "center",
  });

  pdfDoc.fontSize(12).text(`(Shop Count : ) ${spareShops.length}` );
  pdfDoc.fontSize(26).text("-----------------------------------------------------");
  pdfDoc.text(" ");

  spareShops.forEach((spare) => {
    pdfDoc.fontSize(15).text("Name: " + spare.name);
    pdfDoc.text(" ");
    pdfDoc.text(" ");
    pdfDoc.fontSize(12).text("Id:   " + spare._id);
    pdfDoc.text("Email:   " + spare.email);
    pdfDoc.text("Address:    " + spare.address);
    pdfDoc.text("Mobile:   " + spare.mobile);
    pdfDoc.text("About:   " + spare.about);
    pdfDoc.text("Opening Time:   " + spare.openTime);
    pdfDoc.text("Closing Time:    " + spare.closeTime);
    pdfDoc.text(
      "---------------------------------------------------------------------------"
    );
    pdfDoc.text(" ");
    pdfDoc.text(" ");
  });

  pdfDoc.end();
};

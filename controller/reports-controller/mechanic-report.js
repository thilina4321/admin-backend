const pdfDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const Mechanic = require("../../model/mechanic/mechanic-model");

exports.mechanicReport = async (req, res) => {
  const pdfDoc = new pdfDocument();

  let mechanics = [];
  try {
    mechanics = await Mechanic.find();
    console.log(mechanics);
  } catch (error) {
    console.log(error);
  }
  const pathName = path.join("data", "invoices", "mechanics.pdf");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline;filename="mechanics.pdf"');

  pdfDoc.pipe(fs.createWriteStream(pathName));
  pdfDoc.pipe(res);




  pdfDoc.fontSize(26).text("Mechanic's Report", {
    underline: true,
    align: "center",
  });

  pdfDoc.fontSize(12).text(`(Mechanics Count : ) ${mechanics.length}` );
  pdfDoc.text("-----------------------------------------------------");
  pdfDoc.text(" ");
  pdfDoc.text(" ");

  mechanics.forEach((mechanic) => {
    pdfDoc.fontSize(15).text("Name: " + mechanic.name);
    pdfDoc.text(" ");
    pdfDoc.text(" ");
    pdfDoc.fontSize(12).text("Id:   " + mechanic._id);
    pdfDoc.text("Email:   " + mechanic.email);
    pdfDoc.text("Nic:    " + mechanic.nic);
    pdfDoc.text("Mobile:   " + mechanic.mobile);
    pdfDoc.text("Address:   " + mechanic.address);
    pdfDoc.text("About:    " + mechanic.about);
    pdfDoc.text(
      "---------------------------------------------------------------------------"
    );
    pdfDoc.text(" ");
    pdfDoc.text(" ");
  });

  pdfDoc.end();
};

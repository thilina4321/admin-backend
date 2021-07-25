const pdfDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const Driver = require("../../model/driver/driver-model");

exports.driverReport = async (req, res) => {
  const pdfDoc = new pdfDocument();

  let drivers = [];
  try {
    drivers = await Driver.find();
  } catch (error) {
    console.log(error);
  }
  const pathName = path.join("data", "invoices", "drivers.pdf");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline;filename="drivers.pdf"');

  pdfDoc.pipe(fs.createWriteStream(pathName));
  pdfDoc.pipe(res);

  //_id , email, name, nic, mobile, vehicleNumber, vehicleColor

  pdfDoc.fontSize(26).text("Driver's Report", {
    underline: true,
    align: "center",
  });

  pdfDoc.fontSize(12).text(`(Driver's Count : ) ${drivers.length}` );

  pdfDoc.text("-----------------------------------------------------");
  pdfDoc.text(" ");
  pdfDoc.text(" ");

  drivers.forEach((driver) => {
    pdfDoc.fontSize(15).text("Name: " + driver.userName);
    pdfDoc.text(" ");
    pdfDoc.text(" ");
    pdfDoc.fontSize(12).text("Id:   " + driver._id);
    pdfDoc.text("Nic:    " + driver.nic);
    pdfDoc.text("Mobile:   " + driver.mobile);
    pdfDoc.text("Vehicle Number:   " + driver.vehicleNumber);
    pdfDoc.text("Vehicle Color:    " + driver.vehicleColor);
    pdfDoc.text(
      "---------------------------------------------------------------------------"
    );
    pdfDoc.text(" ");
    pdfDoc.text(" ");
  });

  pdfDoc.end();
};

const pdfDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const ServiceCenter = require("../../model/service-center/service-center-model");

exports.serviceReport = async (req, res) => {
  const pdfDoc = new pdfDocument();

  let serviceCenters = [];
  try {
    serviceCenters = await ServiceCenter.find();
    console.log(serviceCenters);
  } catch (error) {
    console.log(error);
  }
  const pathName = path.join("data", "invoices", "service-center.pdf");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline;filename="service-center.pdf"');

  pdfDoc.pipe(fs.createWriteStream(pathName));
  pdfDoc.pipe(res);

  pdfDoc.fontSize(26).text("Service Center's Report", {
    underline: true,
    align: "center",
  });

  pdfDoc.fontSize(12).text(`(service center Count : ) ${serviceCenters.length}` );
  pdfDoc.text("-----------------------------------------------------");
  pdfDoc.text(" ");
  pdfDoc.text(" ");

  serviceCenters.forEach((service) => {
    pdfDoc.fontSize(15).text("Name: " + service.name);
    pdfDoc.text(" ");
    pdfDoc.text(" ");
    pdfDoc.fontSize(12).text("Id:   " + service._id);
    pdfDoc.text("Email:   " + service.email);
    pdfDoc.text("Nic:    " + service.nic);
    pdfDoc.text("Mobile:   " + service.mobile);
    pdfDoc.text("Address:   " + service.address);
    pdfDoc.text("Open Time:   " + service.openTime);
    pdfDoc.text("Close Time:    " + service.closeTime);
    pdfDoc.text(
      "---------------------------------------------------------------------------"
    );
    pdfDoc.text(" ");
    pdfDoc.text(" ");
  });

  pdfDoc.end();
};

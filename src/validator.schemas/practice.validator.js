const { body } = require("express-validator");

module.exports = {
  practiceDoctor: [
    body("doctorId").optional(),
    body("practiceId").notEmpty().withMessage("Enter the practiceid value"),
  ],

  practice: [
    body("doctorId").optional().notEmpty().withMessage("Masukkan doctorId"),
    body("days").notEmpty().withMessage("Masukkan hari praktek (days)"),
    body("open").notEmpty().withMessage("Masukkan jam buka (open)"),
    // body("close").notEmpty().withMessage("Masukkan jam tutup (close)"),
  ],

  hospitals: [
    body("name").notEmpty().withMessage("Masukkan nama rumah sakit"),
    body("city").notEmpty().withMessage("Masukkan kota"),
    body("province").notEmpty().withMessage("Masukkan provinsi"),
    body("country").notEmpty().withMessage("Masukkan negara"),
    body("location").notEmpty().withMessage("Masukkan lokasi"),
  ],

  hospitalDoctor: [
    body("doctorId").optional(),
    body("hospitalId").notEmpty().withMessage("Enter the hospitalid value"),
  ],
};

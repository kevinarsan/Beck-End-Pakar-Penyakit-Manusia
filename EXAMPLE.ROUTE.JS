const express = require("express"),
  router = express.Router(),
  controllers = require("../../controllers/profiles/hospital.controllers"),
  { checkToken } = require("../../middlewares/check.token"),
  checkRole = require("../../middlewares/check.role"),
  { validate } = require("../../middlewares/validate"),
  schema = require("../../validator.schemas/practice.validator");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

module.exports = router;

// const userId = existingProfile.userId;

// const welcomeMessage = `Selamat, data anda berhasil diupdate`;
// await createNotification(userId, welcomeMessage);

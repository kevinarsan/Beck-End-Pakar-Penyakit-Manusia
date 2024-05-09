const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/diagnoses.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post("/create", controllers.create);

module.exports = router;

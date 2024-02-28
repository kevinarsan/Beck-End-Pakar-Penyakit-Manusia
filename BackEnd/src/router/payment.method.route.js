const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/transaction.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate"),
  schema = require("../validator.schemas/practice.validator");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

// router.post("/transaction", checkToken, controllers.create);
module.exports = router;

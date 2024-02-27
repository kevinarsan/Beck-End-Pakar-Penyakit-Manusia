const { checkRoles } = require("../../middlewares/check.role");

const express = require("express"),
  router = express.Router(),
  controllers = require("../../controllers/profiles/auth.controllers"),
  { validate } = require("../../middlewares/validate"),
  schema = require("../../validator.schemas/auth.validator"),
  { checkToken } = require("../../middlewares/check.token");

router.post(
  "/register-users",
  validate(schema.register),
  controllers.registerUser
);
router.post(
  "/register-admin",
  validate(schema.registerAdmin),
  controllers.registerAdmin
);
router.post("/login", validate(schema.login), controllers.login);
router.get("/me", checkToken, controllers.me);
router.put("/update-me", checkToken, controllers.updateMe);

module.exports = router;

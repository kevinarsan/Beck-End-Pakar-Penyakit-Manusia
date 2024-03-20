const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/auth.controllers"),
  { validate } = require("../middlewares/validate"),
  schema = require("../validator.schemas/auth.validator"),
  { checkToken } = require("../middlewares/check.token");

router.post("/register", controllers.register);

router.post("/otp/:key", controllers.verifyUser);

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
router.put("/me", checkToken, controllers.updateMe);

module.exports = router;

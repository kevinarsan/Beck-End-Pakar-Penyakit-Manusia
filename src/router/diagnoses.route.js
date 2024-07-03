const { route } = require("./notification.route");

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

router.post("/create", checkToken, controllers.create);

router.get("/get/:id", checkToken, controllers.getId);

router.get("/get", checkToken, controllers.get);

router.get("/get-me", checkToken, controllers.getMe);

router.delete(
  "/delete/:id",
  checkToken,
  // checkRole.authPage([Roles.ADMIN]),
  controllers.destroy
);

module.exports = router;

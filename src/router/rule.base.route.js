const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/rule.base.controller"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post(
  "/create",
  checkToken,
  checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
  controllers.create
);

router.get("/get", controllers.get);

router.get("/get/:id", controllers.getId);

router.put(
  "/update/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
  controllers.update
);

router.delete(
  "/delete/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
  controllers.destroy
);

module.exports = router;

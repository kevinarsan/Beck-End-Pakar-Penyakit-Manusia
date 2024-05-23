const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/notification.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.get(
  "/get",
  // checkToken,
  // checkRole.authPage([Roles.ADMIN]),
  controllers.getNotification
);
router.get("/me", checkToken, controllers.myNotif);
router.get("/get/:id", checkToken, controllers.getById);
router.delete("/delete/:id", checkToken, controllers.destroy);

module.exports = router;

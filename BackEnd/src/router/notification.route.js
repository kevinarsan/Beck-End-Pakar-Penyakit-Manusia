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
  "/get-all-notification",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getNotification
);
router.get("/my-notification", checkToken, controllers.myNotif);
router.get("/get-by-id-notification/:id", checkToken, controllers.getById);
router.delete("/delete-notification/:id", checkToken, controllers.destroy);

module.exports = router;

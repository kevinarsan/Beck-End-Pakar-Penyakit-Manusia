const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/profile.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

//===== API GET =====//
router.get(
  "/get-all-profile",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getProfile
);
router.get("/get-me-profile", checkToken, controllers.meProfile);
router.get(
  "/get-profile/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getByIdProfile
);
router.get(
  "/get-doctor/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getByIdDoctor
);

//===== API PUT =====//
router.put("/update-profile", checkToken, controllers.update);
router.put("/update-profile-doctor", checkToken, controllers.updateDoctor);
router.put(
  "/update-profile-by-ID/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateId
);
router.put(
  "/update-profile-doctor-by-id/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateDokterId
);
//===== API DELETE =====//
router.delete("/delete-me", checkToken, controllers.destroyMe);
router.delete(
  "/delete-user/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.destroyAdmin
);

module.exports = router;

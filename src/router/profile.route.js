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
  "/get",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getProfile
);
router.get("/get-me", checkToken, controllers.meProfile);

router.get("/get-all-doctor", controllers.getAllDoctor);

router.get("/get-doctor-hospitals", controllers.getAllDoctorHospitals);

router.get(
  "/get-users/:id",
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
router.put("/update-users", checkToken, controllers.update);
router.put("/update-doctor", checkToken, controllers.updateDoctor);
router.put(
  "/update-users/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateId
);
router.put(
  "/update-doctor/:id",
  //   checkToken,
  //   checkRole.authPage([Roles.ADMIN]),
  controllers.updateDokterId
);
//===== API DELETE =====//
router.delete("/delete-me", checkToken, controllers.destroyMe);
router.delete(
  "/delete/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.destroyAdmin
);

module.exports = router;

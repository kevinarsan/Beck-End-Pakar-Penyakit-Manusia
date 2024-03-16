const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/practice.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate"),
  schema = require("../validator.schemas/practice.validator");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post(
  "/create",
  checkToken,
  checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
  //   validate(schema.practice),
  controllers.create
);

router.post(
  "/create-doctor-on-practice",
  checkToken,
  checkRole.authPage([Roles.DOKTER, Roles.ADMIN]),
  validate(schema.practiceDoctor),
  controllers.createOn
);

router.get(
  "/get",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getAll
);

router.get("/get-doctor/:id", checkToken, controllers.getByIdDoctor);

router.get("/get/:id", checkToken, controllers.getById);

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

router.delete(
  "/delete-all",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.destroyAll
);

module.exports = router;

const { Role } = require("@prisma/client");

const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/review.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate"),
  schema = require("../validator.schemas/practice.validator");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post("/create-doctor", checkToken, controllers.create);

router.get("/get-review/:id", checkToken, controllers.getReview);

router.get(
  "/get-all-doctor",
  //   checkToken,
  //   checkRole.authPage([Roles.ADMIN]),
  controllers.getAll
);

router.get(
  "/get-doctor/:id",
  // checkToken,
  controllers.getDoctor
);

router.get("/rating", checkToken, controllers.getRanting);

router.get("/rating/:id", checkToken, controllers.getRatingId);

router.get("/overal", controllers.getOveral);

router.get("/overal/:id", controllers.getOveralId);

router.delete("/delete/:id", checkToken, controllers.delete);

router.delete(
  "/delete-all",
  checkToken,
  checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
  controllers.destroy
);

module.exports = router;

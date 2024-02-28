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

router.post("/review-doctor", checkToken, controllers.create);

router.get("/review/:id", checkToken, controllers.getReview);

router.get(
  "/get-all-review",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.getAll
);

router.get("/review-doctor/:id", checkToken, controllers.getDoctor);

router.get("/rating", checkToken, controllers.getRanting);

router.get("/rating/:id", checkToken, controllers.getRatingId);

router.delete("/delete-review/:id", checkToken, controllers.delete);

router.delete(
  "/delete-all-review",
  checkToken,
  checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
  controllers.destroy
);

module.exports = router;

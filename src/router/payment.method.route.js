const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/payment.method.controlers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate"),
  schema = require("../validator.schemas/transaction.validator");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post(
  "/create",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  validate(schema.payment),
  controllers.create
);

router.get("/get-all", checkToken, controllers.getAll);

router.get("/get/:id", checkToken, controllers.getId);

router.put(
  "/update/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.update
);

router.delete(
  "/delete/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.delete
);

router.delete(
  "/delete-all",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.destroy
);
module.exports = router;

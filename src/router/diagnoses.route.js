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

router.post("/create", controllers.create);

router.get("/get/:id", controllers.getId);

router.get("/get", controllers.get);

router.delete("/delete", controllers.destroy);

module.exports = router;

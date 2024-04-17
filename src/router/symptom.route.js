const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/symptom.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post("/create", controllers.create);

router.get("/get", controllers.get);

router.get("/get/:id", controllers.getId);

router.put("/update/:id", controllers.update);

router.delete("/delete/:id", controllers.destroy);

module.exports = router;

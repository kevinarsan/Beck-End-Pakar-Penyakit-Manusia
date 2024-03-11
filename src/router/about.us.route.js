const { team } = require("../models");

const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/about.us.controllers"),
  { checkToken } = require("../middlewares/check.token"),
  checkRole = require("../middlewares/check.role"),
  { validate } = require("../middlewares/validate"),
  schema = require("../validator.schemas/practice.validator");

const Roles = {
  ADMIN: "admin",
  DOKTER: "dokter",
};

router.post("/visi-misi", controllers.visi);
router.get("/visi-misi", controllers.getVisi);
router.put("/visi-misi/:id", controllers.updateMisi);
router.delete("/visi-misi/:id", controllers.deleteMisi);

router.post("/description-team", controllers.about);
router.get("/description-team", controllers.getAbout);
router.put("/moto-team/:id", controllers.updateAbout);
router.delete("/moto-team/:id", controllers.deleteAbout);

router.post("/teams", controllers.teamCreate);
router.get("/teams", controllers.getTeam);
router.put("/teams/:id", controllers.updateTeam);
router.delete("/teams/:id", controllers.deleteTeams);

router.post("/tutorials", controllers.video);
router.get("/tutorials", controllers.getVideo);
router.put("/tutorials/:id", controllers.updateVideo);
router.delete("/tutorials/:id", controllers.deleteVideo);

module.exports = router;

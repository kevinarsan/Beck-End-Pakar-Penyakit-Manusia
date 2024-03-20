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

router.post(
  "/visi-misi",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.visi
);
router.get("/visi-misi", controllers.getVisi);
router.put(
  "/visi-misi/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateMisi
);
router.delete(
  "/visi-misi/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.deleteMisi
);

router.post(
  "/description-team",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.about
);
router.get("/description-team", controllers.getAbout);
router.put(
  "/moto-team/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateAbout
);
router.delete(
  "/moto-team/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.deleteAbout
);

router.post(
  "/teams",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.teamCreate
);
router.get("/teams", controllers.getTeam);
router.put(
  "/teams/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateTeam
);
router.delete(
  "/teams/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.deleteTeams
);

router.post(
  "/tutorials",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.video
);
router.get("/tutorials", controllers.getVideo);
router.put(
  "/tutorials/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateVideo
);
router.delete(
  "/tutorials/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.deleteVideo
);

router.post(
  "/faq",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.faq
);
router.get("/faq", controllers.getFaq);
router.put(
  "/faq/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateFaq
);
router.delete(
  "/faq/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.deleteFaq
);

router.post(
  "/contact",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.kontak
);
router.get("/contact", controllers.getContact);
router.put(
  "/contact/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.updateContact
);
router.delete(
  "/contact/:id",
  checkToken,
  checkRole.authPage([Roles.ADMIN]),
  controllers.deleteContact
);

module.exports = router;

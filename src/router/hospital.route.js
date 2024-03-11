const express = require("express"),
    router = express.Router(),
    controllers = require("../controllers/hospital.controllers"),
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
    // validate(schema.hospitals),//
    controllers.create
);

router.post(
    "/create-on",
    checkToken,
    checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
    validate(schema.hospitalDoctor),
    controllers.createOn
);

router.get("/get", checkToken, controllers.getAll);

router.get("/get/:id", checkToken, controllers.getId);

router.get("/get-doctor/:id", checkToken, controllers.getIdDoctor);

router.get("/me", checkToken, controllers.getMe);

router.put(
    "/update/:id",
    checkToken,
    checkRole.authPage([Roles.ADMIN, Roles.DOKTER]),
    controllers.updateHospital
);

router.delete(
    "/delete",
    checkToken,
    checkRole.authPage([Roles.ADMIN]),
    controllers.destoryAll
);

router.delete(
    "/delete-all-relationship",
    checkToken,
    checkRole.authPage([Roles.ADMIN]),
    controllers.destroyAllHospitalDoctor
);

module.exports = router;
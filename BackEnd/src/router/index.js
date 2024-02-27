const express = require("express"),
  auth = require("./profiles/auth.route"),
  notification = require("./profiles/notification.route"),
  profile = require("./profiles/profile.route"),
  practice = require("./profiles/practice.route"),
  hospital = require("./profiles/hospital.route"),
  router = express.Router();

router.use(auth);
router.use(notification);
router.use(profile);
router.use(practice);
router.use(hospital);

module.exports = router;

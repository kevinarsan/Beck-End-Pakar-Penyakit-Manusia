const express = require("express"),
  auth = require("./auth.route"),
  notification = require("./notification.route"),
  profile = require("./profile.route"),
  practice = require("./practice.route"),
  hospital = require("./hospital.route"),
  review = require("./review.route"),
  transaction = require("./transaction.route"),
  paymentMethod = require("./payment.method.route"),
  router = express.Router();

router.use(auth);
router.use(notification);
router.use(profile);
router.use(practice);
router.use(hospital);
router.use(review);
router.use(transaction);
router.use(paymentMethod);

module.exports = router;

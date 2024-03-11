const express = require("express"),
  auth = require("./auth.route"),
  notification = require("./notification.route"),
  profile = require("./profile.route"),
  practice = require("./practice.route"),
  hospital = require("./hospital.route"),
  review = require("./review.route"),
  transaction = require("./transaction.route"),
  paymentMethod = require("./payment.method.route"),
  visiMisi = require("./about.us.route"),
  router = express.Router();

router.use("/auth", auth);
router.use("/notifications", notification);
router.use("/profiles", profile);
router.use("/practice", practice);
router.use("/hospitals", hospital);
router.use("/reviews", review);
router.use("/transaction", transaction);
router.use("/payment", paymentMethod);
router.use("/about", visiMisi);

module.exports = router;

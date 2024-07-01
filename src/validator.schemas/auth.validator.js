const { body } = require("express-validator");

module.exports = {
  register: [
    body("username").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 character long")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .withMessage("Password must contain at least one letter and one number"),
    body("phone")
      .notEmpty()
      .matches(/^[0-9]{10,13}$/)
      .withMessage("Invalid phone number format"),
  ],

  registerAdmin: [
    body("username").notEmpty(),
    body("email").notEmpty().isEmail(),
    body("role").notEmpty(),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 character long")
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
      .withMessage("Password must contain at least one letter and one number"),
    body("phone")
      .notEmpty()
      .matches(/^[0-9]{10,13}$/)
      .withMessage("Invalid phone number format"),
  ],

  login: [
    body("email") || body("username") || body("phone").notEmpty(),
    body("password").notEmpty(),
  ],

  // resetPassword: [
  //   check("oldPassword")
  //     .isLength({ min: 6 })
  //     .withMessage("Old password must be at least 6 characters long"),
  //   check("newPassword")
  //     .isLength({ min: 6 })
  //     .withMessage("New password must be at least 6 characters long"),
  // ],
};

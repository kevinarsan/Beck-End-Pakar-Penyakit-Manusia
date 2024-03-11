const { body } = require("express-validator");

module.exports = {
  payment: [body("name").notEmpty().withMessage("Enter the practiceid value")],
};

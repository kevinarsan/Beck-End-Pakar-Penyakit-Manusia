const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = require("../config");

module.exports = {
  jwt: (payload) => {
    try {
      return jwt.sign(payload, SECRET_KEY, { expiresIn: "6h" });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  cryptPassword: async (password) => {
    try {
      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      return hashedPassword;
    } catch (error) {
      return error;
    }
  },

  verifyHashed: async (unhashed, hashed) => {
    try {
      const verify = bcrypt.compareSync(unhashed, hashed);
      return verify;
    } catch (error) {
      return false;
    }
  },

  exclude: (model, keys) => {
    return Object.fromEntries(
      Object.entries(model).filter(([key]) => !keys.includes(key))
    );
  },
};

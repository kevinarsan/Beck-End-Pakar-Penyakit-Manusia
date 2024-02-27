const { user } = require("../models");

const authPage = (allowedRoles) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    try {
      const users = await user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!users) {
        return res.status(401).json({ error: "User not found" });
      }

      const userRole = users.role;

      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return res.status(403).json({ error: "Access forbidden" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

module.exports = {
  authPage,
};

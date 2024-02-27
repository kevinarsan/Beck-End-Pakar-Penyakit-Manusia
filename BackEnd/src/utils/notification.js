const { notification } = require("../models");

module.exports = {
  createNotification: async (userId, message) => {
    try {
      const createNotification = await notification.create({
        data: {
          userId,
          message,
          isRead: false,
        },
      });
      return createNotification;
    } catch (error) {
      throw new Error("Error creating notification");
    }
  },
};

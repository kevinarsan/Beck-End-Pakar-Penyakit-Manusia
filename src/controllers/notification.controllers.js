const { notification } = require("../models");

module.exports = {
  getNotification: async (req, res, next) => {
    try {
      const get = await notification.findMany();

      if (!get || get.length === 0)
        return res.status(403).json({ message: "Notification empty" });

      res.json({ success: "Notifications retrieved successfully", data: get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const token = req.user.id;
      const notificationId = req.params.id;
      const getId = await notification.findUnique({
        where: {
          id: parseInt(notificationId),
        },
      });

      if (!getId || getId.length === 0)
        return res.status(403).json({ message: "Not Found" });

      if (getId.userId !== token) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this notification" });
      }

      await notification.update({
        where: {
          id: parseInt(notificationId),
        },
        data: {
          isRead: true,
        },
      });

      res.json({
        success: "Notifications retrieved successfully",
        data: getId,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  myNotif: async (req, res, next) => {
    try {
      const token = req.user.id;
      const myNotif = await notification.findMany({
        where: {
          userId: token,
        },
      });

      if (!myNotif || myNotif.length === 0)
        return res.status(404).json({ message: "Not Found" });

      res.json({
        success: "Notifications retrieved successfully",
        data: myNotif,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const token = req.user.id;
      const existingNotification = await notification.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!existingNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }

      if (existingNotification.userId !== token) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this notification" });
      }

      await notification.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      res.json({
        success: "Notifications delete successfully",
        data: existingNotification,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

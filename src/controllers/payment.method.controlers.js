const { paymentMethod } = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name } = req.body;

      const existingName = await paymentMethod.findFirst({
        where: {
          name: name,
        },
      });

      if (existingName) {
        return res
          .status(400)
          .json({ message: `The ${name} payment method is now available` });
      }

      const payment = await paymentMethod.create({
        data: {
          name: name,
        },
      });

      res.json({
        success: "Payment Methodt created succesfully",
        data: payment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const existingPayment = await paymentMethod.findFirst({
        where: {
          id: req.body.id,
        },
      });

      if (!existingPayment || existingPayment === 0) {
        return res.status(404).json({ message: "Payment Method Empty" });
      }

      await paymentMethod.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({
        success: "Payment retrieved succesfully",
        data: existingPayment,
      });
    } catch (error) {
      console.log(error), next(error);
    }
  },

  getId: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const existingPayment = await paymentMethod.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingPayment) {
        return res.status(404).json({ message: "Payment Method Not Found" });
      }

      await paymentMethod.findUnique({
        where: {
          id: byId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({
        message: "Payment Method retrieved succesfully",
        data: existingPayment,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const { name } = req.body;

      const existingPayment = await paymentMethod.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingPayment) {
        return res.status(404).json({ message: "Payment Method Not Found" });
      }

      const existingName = await paymentMethod.findFirst({
        where: {
          name: name,
        },
      });

      if (existingName) {
        return res.status(400).json({
          message: `The ${name} payment method is now available`,
        });
      }

      const payment = await paymentMethod.update({
        where: {
          id: byId,
        },
        data: {
          name: name || existingPayment.name,
        },
      });

      res.json({ success: "Updated succesfully", data: payment });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const existingPayment = await paymentMethod.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingPayment) {
        return res.status(404).json({ message: "Payment Method Not Found" });
      }

      await paymentMethod.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: `Deleted by ID ${byId} Successfully` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      await paymentMethod.deleteMany();

      res.json({ success: "Delete all data successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

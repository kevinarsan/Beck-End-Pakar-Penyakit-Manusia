const { symptom } = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, code } = req.body;

      const symptoms = await symptom.create({
        data: {
          name: name,
          code: code,
        },
      });

      res.json({ success: "Created succesfully", symptoms });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const symptoms = await symptom.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!symptoms || symptoms.length === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      await symptom.findMany({
        select: {
          id: true,
          code: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({ success: "Retrieved succesfully", symptoms });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getId: async (req, res, next) => {
    try {
      const token = parseInt(req.params.id);

      const symptoms = await symptom.findUnique({
        where: {
          id: token,
        },
      });

      if (!symptoms || symptoms.length === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      await symptom.findUnique({
        where: {
          id: token,
        },
        select: {
          id: true,
          name: true,
          code: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({ success: "Retreived succesfully", symptoms });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const { code, name } = req.body;

      const existingSymptom = await symptom.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingSymptom) {
        return res.status(404).json({ message: "Not Found " });
      }

      const symptoms = await symptom.update({
        where: {
          id: byId,
        },
        data: {
          code: code || existingSymptom.code,
          name: name || existingSymptom.name,
        },
      });

      res.json({ success: "Updated succesfully", symptoms });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const existingSymptom = await symptom.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingSymptom) {
        return res.status(404).json({ message: "Not Found" });
      }

      const symptoms = await symptom.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted succesfully", symptoms });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

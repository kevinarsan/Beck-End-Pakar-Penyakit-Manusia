const { message } = require("statuses");
const { ruleBase, symptom, diseases } = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { diseasesId, symptomId } = req.body;

      const existingDiseases = await diseases.findFirst({
        where: {
          id: diseasesId,
        },
      });

      if (!existingDiseases) {
        return res.status(403).json({ message: "Diseases ID not found" });
      }

      const existingSymptom = await symptom.findFirst({
        where: {
          id: symptomId,
        },
      });
      if (!existingSymptom) {
        return res.status(404).json({ message: "Symptom ID not found" });
      }

      const rule = await ruleBase.create({
        data: {
          diseasesId: parseInt(diseasesId),
          symptomId: parseInt(symptomId),
        },
      });

      res.json({ success: "Created succesfully", rule });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const rule = await ruleBase.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!rule) {
        return res.status(404).json({ message: "Not Found" });
      }

      await ruleBase.findMany({
        select: {
          id: true,
          diseasesId: true,
          symptomId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({ success: "Retrieved succesfully", rule });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getId: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const rule = await ruleBase.findUnique({
        where: {
          id: byId,
        },
      });

      if (!rule) {
        return res.status(404).json({ message: "Not Found" });
      }

      await ruleBase.findUnique({
        where: {
          id: byId,
        },
        select: {
          id: true,
          diseasesId: true,
          symptomId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({ success: "retrieved succesfully", rule });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const { diseasesId, symptomId } = req.body;

      const existingDiseases = await diseases.findUnique({
        where: {
          id: diseasesId,
        },
      });

      if (!existingDiseases) {
        return res.status(403).json({ message: "Diseases Id not found" });
      }

      const existingSymptom = await symptom.findUnique({
        where: {
          id: symptomId,
        },
      });

      if (!existingSymptom) {
        return res.status(404).json({ message: "Symptom Id not found" });
      }

      const existingRules = await ruleBase.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingRules) {
        return res.status(404).json({ message: "Not Found" });
      }

      const rule = await ruleBase.update({
        where: {
          id: byId,
        },
        data: {
          diseasesId: parseInt(diseasesId) || existingRules.diseasesId,
          symptomId: parseInt(symptomId) || existingRules.symptomId,
        },
      });
      res.json({ success: "Update succesfully", rule });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const rule = await ruleBase.findUnique({
        where: {
          id: byId,
        },
      });

      if (!rule) {
        return res.status(404).json({ message: "Not Found" });
      }

      await ruleBase.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted succesfully", rule });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

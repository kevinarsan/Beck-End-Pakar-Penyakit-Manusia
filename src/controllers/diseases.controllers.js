const { diseases } = require("../models"),
  multer = require("multer"),
  { imageKit } = require("../config");

const upload = multer().single("picture");

module.exports = {
  create: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error uploading file" });
        }

        let { name, solution, probability } = req.body;

        let pictureUrl = null;

        if (req.file) {
          try {
            const uploadResponse = await imageKit.upload({
              file: req.file.buffer.toString("base64"),
              fileName: `${name}_picture`,
            });
            pictureUrl = uploadResponse.url;
          } catch (error) {
            console.error(uploadError);
            return res
              .status(500)
              .json({ message: "Error uploading file to ImageKit" });
          }
        }

        const existingDiseasesCount = await diseases.count();

        const newDiseasesCode = `0${existingDiseasesCount + 1}`.padStart(
          3,
          "P"
        );

        const newDiseases = await diseases.create({
          data: {
            name: name,
            code: newDiseasesCode,
            picture: pictureUrl,
            solution: solution,
            probability: parseFloat(probability),
          },
        });

        res.json({ success: "Created succesfully", newDiseases });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const disease = await diseases.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!disease) {
        return res.status(404).json({ message: "Not Found" });
      }

      await diseases.findMany({
        select: {
          id: true,
          name: true,
          code: true,
          picture: true,
          solution: true,
          probability: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({ success: "Retrieved succesfully", disease });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getId: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const disease = await diseases.findUnique({
        where: {
          id: byId,
        },
      });

      if (!disease) {
        return res.status(404).json({ message: "Not Found" });
      }

      await diseases.findUnique({
        where: {
          id: byId,
        },
        select: {
          id: true,
          name: true,
          code: true,
          picture: true,
          solution: true,
          probability: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      res.json({ success: "Retrieved succesfully", disease });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error uploading file" });
        }

        let { name, solution, probability } = req.body;
        const byId = parseInt(req.params.id);

        let pictureUrl = null;

        const existingDiseases = await diseases.findUnique({
          where: {
            id: byId,
          },
        });

        if (!existingDiseases) {
          return res.status(404).json({ message: "Not Found" });
        }

        if (req.file) {
          try {
            const uploadResponse = await imageKit.upload({
              file: req.file.buffer.toString("base64"),
              fileName: `${name}_picture`,
            });
            pictureUrl = uploadResponse.url;
          } catch (error) {
            console.error(uploadError);
            return res
              .status(500)
              .json({ message: "Error uploading file to ImageKit" });
          }
        }

        const existingDiseasesCount = await diseases.count();

        const newDiseasesCode = `0${existingDiseasesCount + 1}`.padStart(
          3,
          "P"
        );

        const newDiseases = await diseases.update({
          where: {
            id: byId,
          },
          data: {
            name: name || existingDiseases.name,
            picture: pictureUrl || existingDiseases.picture,
            solution: solution || existingDiseases.solution,
            probability:
              parseFloat(probability) || existingDiseases.probability,
          },
        });

        res.json({ success: "Created succesfully", newDiseases });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const disease = await diseases.findUnique({
        where: {
          id: byId,
        },
      });

      if (!disease) {
        return res.status(404).json({ message: "Not Found" });
      }

      await diseases.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted succesfully", disease });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

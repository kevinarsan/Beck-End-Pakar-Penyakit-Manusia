const {
  diagnoses,
  diagnosesToSymptom,
  symptom,
  diseases,
  user,
} = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, age, gender, diseasesId, symptomIds, usersId } = req.body;

      const token = parseInt(req.user.id);

      const existingDiseases = await diseases.findUnique({
        where: {
          id: parseInt(diseasesId),
        },
      });

      if (!existingDiseases) {
        return res.status(404).json({ message: "Diseases not found" });
      }
      let diagnosisProbability = 0;

      if (symptomIds && symptomIds.length > 0) {
        const existingSymptoms = await symptom.findMany({
          where: {
            id: { in: symptomIds.map((id) => parseInt(id)) },
          },
        });

        if (
          !existingSymptoms ||
          existingSymptoms.length !== symptomIds.length
        ) {
          return res
            .status(404)
            .json({ message: "One or more SymptomIds not found" });
        }

        // Mencari total probabilitas hipotesis H
        let totalEvidenceProbability = existingSymptoms.reduce(
          (total, current) => total + (current.probability || 0),
          0
        );

        // Mencari nilai semesta P(Hi)
        let totalHypothesisProbability = existingSymptoms.reduce(
          (total, current) =>
            total + (current.probability || 0) / totalEvidenceProbability,
          0
        );

        // Mencari probabilitas diagnosis P(HI |E)
        diagnosisProbability = existingSymptoms.reduce((total, current) => {
          const currentSymptomProbability = current.probability || 0;
          return (
            total +
            ((currentSymptomProbability / totalEvidenceProbability) *
              currentSymptomProbability) /
              totalHypothesisProbability
          );
        }, 0);
      }

      const createdDiagnoses = await diagnoses.create({
        data: {
          name: name,
          age: parseInt(age),
          gender: gender,
          diseasesId: parseInt(diseasesId),
          probabilityResult: diagnosisProbability,
          status: getStatus(diagnosisProbability),
          usersId: token,
          diagnosesTo: {
            create: symptomIds.map((id) => ({ symptomId: parseInt(id) })),
          },
        },
        include: {
          diagnosesTo: true,
        },
      });

      res.json({
        message: "Diagnoses added successfully",
        diagnoses: createdDiagnoses,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getId: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const existingDiagnoses = await diagnoses.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingDiagnoses || existingDiagnoses.length === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      const diagnose = await diagnoses.findUnique({
        where: {
          id: byId,
        },
        select: {
          id: true,
          name: true,
          age: true,
          gender: true,
          diseases: {
            select: {
              name: true,
              picture: true,
            },
          },
          diagnosesTo: {
            select: {
              symptom: {
                select: {
                  name: true,
                },
              },
            },
          },
          probabilityResult: true,
          status: true,
          createdAt: true,
        },
      });

      res.json({ success: "Retreived succesfully", diagnose });
    } catch (error) {
      next(error);
      console.log(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const existingDiagnoses = await diagnoses.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!existingDiagnoses || existingDiagnoses.length === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      const diagnose = await diagnoses.findMany({
        select: {
          id: true,
          name: true,
          age: true,
          gender: true,
          diseases: {
            select: {
              name: true,
              picture: true,
            },
          },
          diagnosesTo: {
            select: {
              symptom: {
                select: {
                  name: true,
                },
              },
            },
          },
          probabilityResult: true,
          status: true,
          createdAt: true,
        },
      });

      res.json({ success: "Retrieved succesfully", diagnose });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getMe: async (req, res, next) => {
    try {
      const token = req.user.id;

      const userDiagnoses = await diagnoses.findMany({
        where: {
          usersId: token,
        },
        select: {
          id: true,
          name: true,
          age: true,
          gender: true,
          diseases: {
            select: {
              name: true,
              picture: true,
            },
          },
          diagnosesTo: {
            select: {
              symptom: {
                select: {
                  name: true,
                },
              },
            },
          },
          probabilityResult: true,
          status: true,
          createdAt: true,
        },
      });

      if (!userDiagnoses || userDiagnoses.length === 0) {
        return res
          .status(404)
          .json({ message: "No diagnoses found for this user" });
      }

      res.json({ success: "Retrieved successfully", diagnoses: userDiagnoses });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const existingDiagnoses = await diagnosesToSymptom.findMany({
        where: { id: req.body.id },
      });

      if (!existingDiagnoses || existingDiagnoses.length === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      const deleteAll = await diagnosesToSymptom.deleteMany({});

      const hapus = await diagnoses.deleteMany({});
      res.json({
        success: "Delete succesfully",
        deleteAll,
        hapus,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

// Fungsi untuk mendapatkan status berdasarkan probabilitas diagnosis
function getStatus(probability) {
  if (probability >= 0 && probability <= 0.2) {
    return "Tidak Terjangkit";
  } else if (probability > 0.2 && probability <= 0.4) {
    return "Mungkin Terjangkit";
  } else if (probability > 0.4 && probability <= 0.6) {
    return "Terjangkit";
  } else if (probability > 0.6 && probability <= 0.8) {
    return "Terjangkit Parah";
  } else if (probability > 0.8 && probability <= 1) {
    return "Terjangkit Sangat Parah";
  }
}

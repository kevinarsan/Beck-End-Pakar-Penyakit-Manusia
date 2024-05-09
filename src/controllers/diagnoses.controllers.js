const {
  diagnoses,
  diagnosesToSymptom,
  symptom,
  diseases,
} = require("../models");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { name, age, gender, solution, diseasesId, symptomIds } = req.body;

      if (
        !diseasesId ||
        !Array.isArray(symptomIds) ||
        symptomIds.length === 0
      ) {
        return res.status(400).json({ message: "Invalid Input" });
      }

      const existingDiseases = await diseases.findUnique({
        where: {
          id: parseInt(diseasesId),
        },
      });

      if (!existingDiseases) {
        return res.status(404).json({ message: "Diseases not found" });
      }

      const existingSymptoms = await symptom.findMany({
        where: {
          id: { in: symptomIds.map((id) => parseInt(id)) },
        },
      });

      if (!existingSymptoms || existingSymptoms.length !== symptomIds.length) {
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
      let diagnosisProbability = existingSymptoms.reduce((total, current) => {
        const currentSymptomProbability = current.probability || 0;
        return (
          total +
          ((currentSymptomProbability / totalEvidenceProbability) *
            currentSymptomProbability) /
            totalHypothesisProbability
        );
      }, 0);

      const createdDiagnoses = await diagnoses.create({
        data: {
          name: name,
          age: parseInt(age),
          gender: gender,
          diseasesId: parseInt(diseasesId),
          probabilityResult: diagnosisProbability,
          status: getStatus(diagnosisProbability),
          solution:
            "anak anda beresiko terjangkit stunting. Kami sarankan Anda untuk melakukan pemeriksaan lanjutan ke dokter anak terdekat. cari dokter terdekat disini, dan cari tahu informasi lainnya seputar stunting disini  ",
          diagnosesTo: {
            create: existingSymptoms.map((symptom) => ({
              symptomId: symptom.id,
            })),
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

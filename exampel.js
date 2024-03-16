const {
  review,
  user,
  profileDoctor,
  rating,
  practiceOnDoctor,
  practice,
} = require("../models");
const { createNotification } = require("../utils/notification");

module.exports = {
  // REVIEW DOCTOR //
  getOveral: async (req, res, next) => {
    try {
      const overal = await rating.findMany({
        where: {
          id: req.body.id,
        },
        include: {
          review: true,
        },
      });

      if (!overal || overal.length === 0) {
        return res.status(404).json({ message: "Empty" });
      }

      const get = await Promise.all(
        overal.map(async (item) => {
          const reviews = item.review;

          if (!reviews || reviews.length === 0) {
            return {
              id: item.id,
              message: "No reviews found",
            };
          }

          const doctorId = reviews[0].doctorId;

          const doctor = await profileDoctor.findUnique({
            where: { id: doctorId },
          });

          if (!doctor) {
            return {
              id: item.id,
              message: "Doctor not found",
            };
          }

          const practiceDoctor = await practiceOnDoctor.findUnique({
            where: { doctorId: doctor.id },
          });

          if (!practiceDoctor) {
            return {
              id: item.id,
              message: "Practice data not found",
            };
          }

          const practiceData = await practice.findUnique({
            where: { id: practiceDoctor.practiceId },
          });

          if (!practiceData) {
            return {
              id: item.id,
              message: "Practice data not found",
            };
          }

          return {
            id: item.id,
            name: doctor.name,
            phone: doctor.phone,
            picture: doctor.picture,
            spesialis: doctor.spesialis,
            description: doctor.description,
            city: doctor.city,
            province: doctor.province,
            country: doctor.country,
            details: doctor.details,
            aboutDoctor: doctor.aboutUs,
            overallRating: item.overalRating,
            days: practiceData.days,
            open: practiceData.open,
            close: practiceData.close,
          };
        })
      );

      res.json({
        success: "Retrieved successfully",
        get,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};

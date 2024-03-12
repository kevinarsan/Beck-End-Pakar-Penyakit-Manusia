const { over } = require("lodash");
const { review, user, profileDoctor, rating } = require("../models");
const { createNotification } = require("../utils/notification");

module.exports = {
  // REVIEW DOCTOR //
  create: async (req, res, next) => {
    try {
      let { value, feedback, ratingId, doctorId } = req.body;

      doctorId = parseInt(doctorId);
      value = parseInt(value);

      const token = req.user.id;

      const existingUser = await user.findUnique({
        where: {
          id: token,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User Not Found" });
      }

      const existingDoctor = await profileDoctor.findUnique({
        where: {
          id: doctorId,
        },
      });

      if (!existingDoctor) {
        return res.status(404).json({ message: "Doctor Not Found" });
      }

      if (value < 1 || value > 5) {
        return res
          .status(400)
          .json({ message: "Rating should be between 1 and 5" });
      }

      ratingId = ratingId || doctorId;

      if (!ratingId) {
        ratingId = doctorId;
      }

      let ratings = await rating.findUnique({
        where: {
          id: ratingId,
        },
      });

      if (!ratings) {
        ratings = await rating.create({
          data: {
            id: ratingId,
            overalRating: value,
          },
        });
      } else {
        ratings = await rating.update({
          where: {
            id: ratingId,
          },
          data: {
            overalRating: ratings.overalRating + value,
          },
        });
      }

      const reviews = await review.create({
        data: {
          value: value,
          feedback: feedback,
          userId: token,
          doctorId: doctorId,
          ratingId: ratings.id,
        },
      });

      const existingReview = await review.findMany({
        where: {
          ratingId: ratings.id,
        },
      });

      const totRating = existingReview.reduce(
        (sum, reviews) => sum + (reviews.value || 0),
        0
      );
      const averageRating =
        existingReview.length > 0 ? totRating / existingReview.length : 0;

      await rating.update({
        where: {
          id: ratings.id,
        },
        data: {
          overalRating: averageRating,
        },
      });

      res.json({ success: "Review created successfully", data: reviews });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const reviews = await review.findMany();

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "Review Empty" });
      }

      const get = await Promise.all(
        reviews.map(async (reviews) => {
          const doctor = await profileDoctor.findUnique({
            where: { id: reviews.doctorId },
          });

          const users = await user.findUnique({
            where: { id: reviews.userId },
          });

          const ratings = await rating.findUnique({
            where: { id: reviews.ratingId },
          });

          return {
            id: reviews.id,
            nameDoctor: doctor.name,
            value: reviews.value,
            feedback: reviews.feedback,
            overalRating: ratings.overalRating,
            dariUsername: users.username,
            date: reviews.date,
          };
        })
      );

      res.json({ success: "All reviews retrieved successfully", data: get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getDoctor: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const reviews = await review.findMany({
        where: {
          doctorId: byId,
        },
      });

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "Doctor Empty" });
      }

      const get = await Promise.all(
        reviews.map(async (reviews) => {
          const doctor = await profileDoctor.findUnique({
            where: { id: reviews.doctorId },
          });

          const users = await user.findUnique({
            where: { id: reviews.userId },
          });

          const ratings = await rating.findUnique({
            where: { id: reviews.ratingId },
          });

          return {
            id: reviews.id,
            nameDoctor: doctor.name,
            value: reviews.value,
            feedback: reviews.feedback,
            overalRating: ratings.overalRating,
            dariUsername: users.username,
            date: reviews.date,
          };
        })
      );
      //   select: {
      //     id: true,
      //     value: true,
      //     feedback: true,
      //     date: true,
      //     user: {
      //       select: {
      //         username: true,
      //       },
      //     },
      //     doctor: {
      //       select: {
      //         id: true,
      //         name: true,
      //       },
      //     },
      //     rating: {
      //       select: {
      //         overalRating: true,
      //       },
      //     },
      //   },
      // });

      res.json({ success: "All review retrived succesfully", get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getReview: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const reviews = await review.findMany({
        where: {
          id: byId,
        },
      });

      if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "Review not found" });
      }

      const get = await review.findFirst({
        where: {
          id: byId,
        },
        select: {
          id: true,
          value: true,
          feedback: true,
          date: true,
          user: {
            select: {
              username: true,
            },
          },
          doctor: {
            select: {
              name: true,
            },
          },
          rating: {
            select: {
              overalRating: true,
            },
          },
        },
      });

      res.json({ success: "review retrived succesfully", get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getRanting: async (req, res, next) => {
    try {
      const ratings = await rating.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!ratings || ratings.length === 0) {
        return res.status(404).json({ message: "Rating Empty" });
      }

      const get = await rating.findMany({
        select: {
          id: true,
          overalRating: true,
          review: {
            select: {
              id: true,
              value: true,
              feedback: true,
              date: true,
            },
          },
        },
      });

      res.json({ success: "Rating retrived succesfully", get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getRatingId: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const existingRating = await rating.findFirst({
        where: {
          id: byId,
        },
      });

      if (!existingRating || existingRating.length === 0) {
        return res.status(404).json({ message: "Rating not found" });
      }

      const ratings = await rating.findFirst({
        where: {
          id: byId,
        },
        select: {
          id: true,
          overalRating: true,
          review: {
            select: {
              id: true,
              value: true,
              feedback: true,
              date: true,
            },
          },
        },
      });

      res.json({ success: "Rating retreived successfully", ratings });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

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
        overal.map(async (overal) => {
          const reviews = overal.review;

          if (!reviews || reviews.length === 0) {
            return {
              id: overal.id,
              message: "No reviews found",
            };
          }

          const doctorId = reviews[0].doctorId;

          const doctors = await profileDoctor.findUnique({
            where: { id: doctorId },
          });

          if (!doctors) {
            return {
              id: overal.id,
              message: "Doctor not found",
            };
          }

          return {
            id: overal.id,
            name: doctors.name,
            phone: doctors.phone,
            picture: doctors.picture,
            spesialis: doctors.spesialis,
            description: doctors.description,
            city: doctors.city,
            province: doctors.province,
            country: doctors.country,
            details: doctors.details,
            overalRating: overal.overalRating,
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

  delete: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const token = req.user.id;
      const role = req.user.role;

      const existingReview = await review.findUnique({
        where: {
          id: byId,
        },
        include: {
          rating: true,
        },
      });

      if (!existingReview) {
        return res.status(404).json({ message: "Review not found" });
      }

      if (role === "admin" || existingReview.userId === token) {
        await review.delete({
          where: {
            id: byId,
          },
        });

        const relatedReviews = await review.findMany({
          where: {
            ratingId: existingReview.rating.id,
          },
        });

        const totalRating = relatedReviews.reduce(
          (sum, review) => sum + (review.value || 0),
          0
        );

        // Menghitung rata-rata rating
        const averageRating =
          relatedReviews.length > 0 ? totalRating / relatedReviews.length : 0;

        // Update nilai overalRating pada rating
        await rating.update({
          where: {
            id: existingReview.rating.id,
          },
          data: {
            overalRating: averageRating,
          },
        });

        res.json({ success: "Review deleted successfully", existingReview });
      } else {
        return res.status(403).json({
          message:
            "You do not have permission to delete this review, please delete it as you review",
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      await review.deleteMany();

      await rating.deleteMany();

      res.json({ success: "All review deleted successfully" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  // REVIEW DOCTOR END //
};

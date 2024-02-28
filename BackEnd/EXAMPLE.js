<<<<<<< HEAD
// const { review, rating, user, profileDoctor } = require("../models");
// const { createNotification } = require("../utils/notification");

// module.exports = {
//   create: async (req, res, next) => {
//     try {
//       let { value, feedback, userId, ratingId, doctorId } = req.body;

//       doctorId = parseInt(doctorId);
//       value = parseInt(value);

//       const token = req.user.id;

//       const existingUser = await user.findUnique({
//         where: {
//           id: token,
//         },
//       });

//       if (!existingUser) {
//         return res.status(404).json({ message: "User Not Found" });
//       }

//       const existingDoctor = await profileDoctor.findUnique({
//         where: {
//           id: doctorId,
//         },
//       });

//       if (!existingDoctor) {
//         return res.status(404).json({ message: "Doctor Not Found" });
//       }

//       if (value < 1 || value > 5) {
//         return res
//           .status(400)
//           .json({ message: "Rating should be between 1 and 5" });
//       }

//       ratingId = ratingId || doctorId;

//       if (!ratingId) {
//         ratingId = doctorId;
//       }

//       let ratings = await rating.findUnique({
//         where: {
//           id: ratingId,
//         },
//       });

//       if (!ratings) {
//         ratings = await rating.create({
//           data: {
//             id: ratingId,
//             overalRating: value,
//           },
//         });
//       } else {
//         ratings = await rating.update({
//           where: {
//             id: ratingId,
//           },
//           data: {
//             overalRating: ratings.overalRating + value,
//           },
//         });
//       }

//       const reviews = await review.create({
//         data: {
//           value: value,
//           feedback: feedback,
//           userId: token,
//           doctorId: doctorId,
//           ratingId: ratings.id,
//         },
//       });

//       const existingReview = await review.findMany({
//         where: {
//           ratingId: ratings.id,
//         },
//       });

//       const totRating = existingReview.reduce(
//         (sum, reviews) => sum + (reviews.value || 0),
//         0
//       );
//       const averageRating =
//         existingReview.length > 0 ? totRating / existingReview.length : 0;

//       await rating.update({
//         where: {
//           id: ratings.id,
//         },
//         data: {
//           overalRating: averageRating,
//         },
//       });

//       res.json({ success: "Review created successfully", data: reviews });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   },

//   getAll: async (req, res, next) => {
//     try {
//       const reviews = await review.findMany({
//         select: {
//           id: true,
//           value: true,
//           feedback: true,
//           date: true,
//           user: {
//             select: {
//               username: true,
//             },
//           },
//           doctor: {
//             select: {
//               name: true,
//             },
//           },
//           rating: {
//             select: {
//               overalRating: true,
//             },
//           },
//         },
//       });

//       res.json({ success: "All review retrived succesfully", data: reviews });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   },

//   getDoctor: async (req, res, next) => {
//     try {
//       const byId = parseInt(req.params.id);

//       const reviews = await review.findMany({
//         where: {
//           doctorId: byId,
//         },
//         select: {
//           id: true,
//           value: true,
//           feedback: true,
//           date: true,
//           user: {
//             select: {
//               username: true,
//             },
//           },
//           doctor: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//           rating: {
//             select: {
//               overalRating: true,
//             },
//           },
//         },
//       });

//       res.json({ success: "All review retrived succesfully", reviews });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   },

//   delete: async (req, res, next) => {
//     try {
//       const byId = parseInt(req.params.id);
//       const token = req.user.id;
//       const role = req.user.role;

//       // Menggunakan 'findById' untuk mendapatkan review berdasarkan ID
//       const existingReview = await review.findUnique({
//         where: {
//           id: byId,
//         },
//         include: {
//           rating: true,
//         },
//       });

//       if (!existingReview) {
//         return res.status(404).json({ message: "Review not found" });
//       }

//       if (role === "admin" || existingReview.userId === token) {
//         await review.delete({
//           where: {
//             id: byId,
//           },
//         });

//         const relatedReviews = await review.findMany({
//           where: {
//             ratingId: existingReview.rating.id,
//           },
//         });

//         const totalRating = relatedReviews.reduce(
//           (sum, review) => sum + (review.value || 0),
//           0
//         );

//         // Menghitung rata-rata rating
//         const averageRating =
//           relatedReviews.length > 0 ? totalRating / relatedReviews.length : 0;

//         // Update nilai overalRating pada rating
//         await rating.update({
//           where: {
//             id: existingReview.rating.id,
//           },
//           data: {
//             overalRating: averageRating,
//           },
//         });

//         res.json({ success: "Review deleted successfully", existingReview });
//       } else {
//         return res.status(403).json({
//           message:
//             "You do not have permission to delete this review, please delete it as you review",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   },
// };
=======

>>>>>>> 28bc8e286f8a0613a9bd8ffa3b8c0ce0b571e1cc

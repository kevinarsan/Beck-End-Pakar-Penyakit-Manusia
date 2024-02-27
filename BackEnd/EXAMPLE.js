// const { profileDoctor, hospitalOnDoctor, hospital } = require("../../models");

// module.exports = {
//   getIdDoctor: async (req, res, next) => {
//     try {
//       const doctorIdParam = req.params.id;
//       const user = req.user;

//       // Jika token user adalah seorang dokter, gunakan doctorId dari token
//       const doctorId = user.role === "dokter" ? user.profileDoctor.id : parseInt(doctorIdParam);

//       const hospitals = await hospitalOnDoctor.findMany({
//         where: { doctorId: doctorId },
//         select: {
//           doctorId: true,
//           doctor: {
//             select: {
//               name: true,
//             },
//           },
//           hospital: {
//             select: {
//               id: true,
//               name: true,
//               picture: true,
//               city: true,
//               province: true,
//               country: true,
//               location: true,
//               createdAt: true,
//               updatedAt: true,
//             },
//           },
//         },
//       });

//       if (!hospitals || hospitals.length === 0) {
//         return res.status(404).json({ message: "Hospital Empty" });
//       }

//       res.json({
//         success: "Hospital on Doctor retrieved successfully",
//         data: hospitals,
//       });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   },
// };

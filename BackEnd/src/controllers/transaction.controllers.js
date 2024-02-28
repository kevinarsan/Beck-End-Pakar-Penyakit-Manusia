// const {
//   user,
//   profileDoctor,
//   transaction,
//   detailTransaction,
//   paymentMethod,
//   practice,
// } = require("../models");

// module.exports = {
//   create: async (req, res, next) => {
//     try {
//       const {
//         doctorId,
//         paymentStatus = true,
//         total,
//         cardNumber,
//         name,
//         paymentMethodId,
//         cardHolderName,
//         cvv,
//         serialNumber,
//         expiryDate,
//       } = req.body;
//       const token = req.user.id;

//       const existingUser = await user.findUnique({
//         where: {
//           id: token,
//         },
//       });

//       if (!existingUser) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       const existingDoctor = await profileDoctor.findUnique({
//         where: {
//           id: parseInt(doctorId),
//         },
//       });

//       if (!existingDoctor) {
//         return res.status(404).json({ message: "Doctor not found" });
//       }

//       const existingPayment = await paymentMethod.findFirst({
//         where: {
//           id: paymentMethodId,
//         },
//       });

//       if (!existingPayment) {
//         return res.status(404).json({ message: "Paymen Method not found" });
//       }

//       const transactions = await transaction.create({
//         data: {
//           userId: token,
//           total: Number(total),
//           detailTransaction: {
//             create: {
//               doctorId: parseInt(doctorId),
//               paymentMethodId: parseInt(paymentMethodId),
//               paymentStatus: Boolean(paymentStatus),
//             },
//           },
//         },
//       });

//       res.json({ success: "Created Transaction succesfully", transactions });
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   },
// };

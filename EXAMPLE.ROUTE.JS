// getAllDoctor: async(req, res, next) => {
//     try {
//         const existingProfiles = await profileDoctor.findMany();

//         if (!existingProfiles || existingProfiles.length === 0) {
//             return res.status(403).json({ message: "Profile empty" });
//         }

//         const get = await Promise.all(
//             existingProfiles.map(async(existingProfile) => {
//                 const relation = await hospitalOnDoctor.findUnique({
//                     where: {
//                         doctorId_hospitalId: {
//                             doctorId: existingProfile.id, // Ganti dengan existingProfile.id
//                             hospitalId: existingProfile.hospitalId,
//                         },
//                     },
//                 });

//                 if (!relation) {
//                     return {
//                         id: existingProfile.id,
//                         name: existingProfile.name,
//                         phone: existingProfile.phone,
//                         picture: existingProfile.picture,
//                         spesialis: existingProfile.spesialis,
//                         description: existingProfile.description,
//                         city: existingProfile.city,
//                         province: existingProfile.province,
//                         country: existingProfile.country,
//                         hospitals: null,
//                     };
//                 }

//                 const hospitals = await hospital.findUnique({
//                     where: { id: relation.hospitalId },
//                 });

//                 return {
//                     id: existingProfile.id,
//                     name: existingProfile.name,
//                     phone: existingProfile.phone,
//                     picture: existingProfile.picture,
//                     spesialis: existingProfile.spesialis,
//                     description: existingProfile.description,
//                     city: existingProfile.city,
//                     province: existingProfile.province,
//                     country: existingProfile.country,
//                     hospitals: {
//                         name: hospitals.name,
//                         picture: hospitals.picture,
//                         city: hospitals.city,
//                         province: hospitals.province,
//                         country: hospitals.country,
//                         details: hospitals.details,
//                         location: hospitals.location,
//                     },
//                 };
//             })
//         );

//         res.json({
//             success: "Profile retrieved successfully",
//             get,
//         });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// },

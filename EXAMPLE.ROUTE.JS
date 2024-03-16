const {
    user,
    profile,
    notification,
    profileDoctor,
    hospitalOnDoctor,
    hospital,
} = require("../models"),
    multer = require("multer"),
    upload = multer().single("picture"), { exclude } = require("../utils/encrypt.password"), { imageKit } = require("../config"), { createNotification } = require("../utils/notification");

module.exports = {
    update: async(req, res, next) => {
        try {
            upload(req, res, async(err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error Uploading File" });
                }

                const { name, phone, city, province, country } = req.body;
                const token = req.user.id;

                const existingProfile = await profile.findUnique({
                    where: {
                        userId: token,
                    },
                });

                if (!existingProfile) {
                    return res.status(404).json({ message: "Profile not found" });
                }

                let pictureUrl = existingProfile.picture;

                if (req.file) {
                    try {
                        const uploadResponse = await imageKit.upload({
                            file: req.file.buffer.toString("base64"),
                            fileName: `${name}_profile_picture`,
                        });
                        pictureUrl = uploadResponse.url;
                    } catch (uploadError) {
                        console.log(uploadError);
                        return res
                            .status(500)
                            .json({ message: "Error uploading file to ImageKit" });
                    }
                }

                const updateProfile = await profile.update({
                    where: {
                        userId: token,
                    },
                    data: {
                        name: name || existingProfile.name,
                        phone: phone || existingProfile.phone,
                        picture: pictureUrl,
                        city: city || existingProfile.city,
                        province: province || existingProfile.province,
                        country: country || existingProfile.country,
                    },
                });

                const welcomeMessage = `Selamat, data anda berhasil di update`;
                await createNotification(token, welcomeMessage);

                res.json({
                    success: "Profile update successfully",
                    data: updateProfile,
                });
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    updateId: async(req, res, next) => {
        try {
            upload(req, res, async(err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error Uploading File" });
                }

                const { name, phone, city, province, country } = req.body;
                const byId = parseInt(req.params.id);

                const existingProfile = await profile.findUnique({
                    where: {
                        userId: byId,
                    },
                });

                if (!existingProfile) {
                    return res.status(404).json({ message: "Not Found" });
                }

                let pictureUrl = existingProfile.picture;

                if (req.file) {
                    try {
                        const uploadResponse = await imageKit.upload({
                            file: req.file.buffer.toString("base64"),
                            fileName: `${byId}_profile_picture`,
                        });
                        pictureUrl = uploadResponse.url;
                    } catch (error) {
                        console.log(uploadError);
                        return res
                            .status(500)
                            .json({ message: "Error uploading file to ImageKit" });
                    }
                }

                const updateProfileById = await profile.update({
                    where: {
                        userId: byId,
                    },

                    data: {
                        name: name || existingProfile.name,
                        phone: phone || existingProfile.phone,
                        picture: pictureUrl,
                        city: city || existingProfile.city,
                        province: province || existingProfile.province,
                        country: country || existingProfile.country,
                    },
                });

                const userId = existingProfile.userId;

                const welcomeMessage = `Selamat, data anda berhasil diupdate`;
                await createNotification(userId, welcomeMessage);

                res.json({
                    success: "Profile update successfully",
                    data: updateProfileById,
                });
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    updateDoctor: async(req, res, next) => {
        try {
            upload(req, res, async(err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error Uploading File" });
                }

                const {
                    name,
                    phone,
                    spesialis,
                    description,
                    city,
                    province,
                    country,
                    details,
                } = req.body;
                const token = req.user.id;

                const existingProfile = await profileDoctor.findUnique({
                    where: {
                        userId: token,
                    },
                });

                if (!existingProfile) {
                    return res.status(404).json({ message: "Profile not found" });
                }

                let pictureUrl = existingProfile.picture;

                if (req.file) {
                    try {
                        const uploadResponse = await imageKit.upload({
                            file: req.file.buffer.toString("base64"),
                            fileName: `${token}_profile_picture`,
                        });
                        pictureUrl = uploadResponse.url;
                    } catch (uploadError) {
                        console.log(uploadError);
                        return res
                            .status(500)
                            .json({ message: "Error uploading file to ImageKit" });
                    }
                }

                const updateDoctor = await profileDoctor.update({
                    where: {
                        userId: token,
                    },
                    data: {
                        name: name || existingProfile.name,
                        phone: phone || existingProfile.phone,
                        picture: pictureUrl,
                        spesialis: spesialis || existingProfile.spesialis,
                        description: description || existingProfile.description,
                        city: city || existingProfile.city,
                        province: province || existingProfile.province,
                        country: country || existingProfile.country,
                        details: details || existingProfile.details,
                    },
                });

                const welcomeMessage = `Selamat, data anda berhasil di update`;
                await createNotification(token, welcomeMessage);

                res.json({
                    success: "Profile update successfully",
                    data: updateDoctor,
                });
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    updateDokterId: async(req, res, next) => {
        try {
            upload(req, res, async(err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error Uploading File" });
                }

                const {
                    name,
                    phone,
                    spesialis,
                    description,
                    city,
                    province,
                    country,
                    details,
                    aboutUs,
                } = req.body;

                const byId = parseInt(req.params.id);

                const existingProfile = await profileDoctor.findUnique({
                    where: {
                        id: byId,
                    },
                });

                if (!existingProfile) {
                    return res.status(404).json({ message: "Not Found" });
                }

                let pictureUrl = existingProfile.picture;

                if (req.file) {
                    try {
                        const uploadResponse = await imageKit.upload({
                            file: req.file.buffer.toString("base64"),
                            fileName: `${byId}_profile_picture`,
                        });
                        pictureUrl = uploadResponse.url;
                    } catch (error) {
                        console.log(error);
                        return res
                            .status(500)
                            .json({ message: "Error uploading file to ImageKit" });
                    }
                }

                const updateDoctor = await profileDoctor.update({
                    where: {
                        id: byId,
                    },
                    data: {
                        name: name || existingProfile.name,
                        phone: phone || existingProfile.phone,
                        picture: pictureUrl,
                        spesialis: spesialis || existingProfile.spesialis,
                        description: description || existingProfile.description,
                        city: city || existingProfile.city,
                        province: province || existingProfile.province,
                        country: country || existingProfile.country,
                        details: details || existingProfile.details,
                        aboutUs: aboutUs || existingProfile.aboutUs,
                    },
                });

                const userId = existingProfile.userId;

                const welcomeMessage = `Selamat, data anda berhasil diupdate`;
                await createNotification(userId, welcomeMessage);

                res.json({ success: "Profile update succesfully", data: updateDoctor });
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    getAllDoctor: async(req, res, next) => {
        try {
            const existingDoctor = await profileDoctor.findMany({
                where: {
                    id: req.body.id,
                },
            });

            if (!existingDoctor) {
                return res.status(404).json({ message: "Not Found" });
            }

            const get = await profileDoctor.findMany({
                where: {
                    id: req.body.id,
                },
            });

            res.json({ success: "Retrieved data succesfully", get });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    getAllDoctorHospitals: async(req, res, next) => {
        try {
            const existingProfiles = await hospitalOnDoctor.findMany();

            if (!existingProfiles || existingProfiles.length === 0) {
                return res.status(403).json({ message: "Profile empty" });
            }

            const get = await Promise.all(
                existingProfiles.map(async(existingProfiles) => {
                    const doctors = await profileDoctor.findUnique({
                        where: { id: existingProfiles.doctorId },
                    });

                    const hospitals = await hospital.findUnique({
                        where: { id: existingProfiles.hospitalId },
                    });

                    return {
                        id: doctors.id,
                        name: doctors.name,
                        phone: doctors.phone,
                        picture: doctors.picture,
                        spesialis: doctors.spesialis,
                        description: doctors.description,
                        city: doctors.city,
                        province: doctors.province,
                        country: doctors.country,
                        nameHospitals: hospitals.name,
                        pictureHospitals: hospitals.picture,
                        cityHospitals: hospitals.city,
                        provinceHospitals: hospitals.province,
                        countryHospitals: hospitals.country,
                        detailsHospitals: hospitals.details,
                        locationHospitals: hospitals.location,
                    };
                })
            );

            res.json({
                success: "Profile retrieved successfully",
                get,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    detDoctor: async(req, res, next) => {
        try {
            const doctors = await profileDoctor.findMany({
                where: {
                    id: req.body.id,
                },
                include: {
                    user: true,
                    practice: true,
                    hospitalDoctor: {
                        include: {
                            hospital: true,
                        },
                    },
                    review: {
                        include: {
                            rating: true,
                            user: true,
                        },
                    },
                    DetailTransaction: true,
                },
            });

            if (!doctors || doctors.length === 0) {
                return res.status(404).json({ message: "Doctor Empty" });
            }

            const get = doctors.map((doctor) => {
                const hospitalsData = doctor.hospitalDoctor.map((hospitalData) => {
                    const { hospitalId, hospital } = hospitalData;
                    return {
                        id: hospitalId,
                        nameHospital: hospital.name,
                        pictureHospital: hospital.picture || null,
                        cityHospital: hospital.city || null,
                        provinceHospital: hospital.province || null,
                        countryHospital: hospital.country || null,
                        detailsHospital: hospital.details || null,
                        locationHospital: hospital.location || null,
                        createdAtHospital: hospital.createdAt,
                        updatedAtHospital: hospital.updatedAt,
                    };
                });

                return {
                    id: doctor.id,
                    name: doctor.name,
                    phone: doctor.phone || null,
                    picture: doctor.picture || null,
                    spesialis: doctor.spesialis || null,
                    description: doctor.description || null,
                    city: doctor.city || null,
                    province: doctor.province || null,
                    country: doctor.country || null,
                    details: doctor.details || null,
                    aboutDoctor: doctor.aboutUs || null,
                    createdAtDoctor: doctor.createdAt,
                    updatedAtDoctor: doctor.updatedAt,
                    user: doctor.user,
                    practice: doctor.practice,
                    review: doctor.review,
                    DetailTransaction: doctor.DetailTransaction,
                    hospitals: hospitalsData,
                };
            });

            res.json({ success: "Retrieved Succesfully", get });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    getProfile: async(req, res, next) => {
        try {
            const exitingProfile = await user.findMany({
                include: {
                    profile: true,
                    profileDoctor: true,
                },
            });

            if (!exitingProfile || exitingProfile.length === 0) {
                return res.status(403).json({ message: "Profile empty" });
            }

            const data = exitingProfile.map((user) => {
                let userProfile = [];
                if (user.role === "dokter" && user.profileDoctor) {
                    userProfile = user.profileDoctor;
                } else if (user.profile) {
                    userProfile = user.profile;
                }

                return {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    profile: exclude(userProfile, [
                        "password",
                        "resetToken",
                        "veryficationToken",
                        "createdAt",
                        "updatedAt",
                        "userId",
                    ]),
                };
            });

            res.json({
                success: "Profile retrieved succesfully",
                data,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    meProfile: async(req, res, next) => {
        try {
            const token = req.user.id;

            const existingUser = await user.findFirst({
                where: {
                    id: token,
                },
                include: {
                    profile: true,
                    profileDoctor: true,
                },
            });

            if (!existingUser) {
                return res.status(404).json({ message: "User not found" });
            }

            let userProfile = null;

            if (existingUser.role === "dokter" && existingUser.profileDoctor) {
                userProfile = existingUser.profileDoctor;
            } else if (existingUser.profile) {
                userProfile = existingUser.profile;
            }

            const data = {
                id: existingUser.id,
                username: existingUser.username,
                email: existingUser.email,
                role: existingUser.role,
                profile: exclude(userProfile, [
                    "password",
                    "resetToken",
                    "verificationToken",
                    "createdAt",
                    "updatedAt",
                    "userId",
                ]),
            };

            res.json({
                success: "Profile retrieved successfully",
                data,
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    getByIdProfile: async(req, res, next) => {
        try {
            const Id = req.params.id;

            const getId = await profile.findUnique({
                where: {
                    id: parseInt(Id),
                },
            });

            if (!getId || getId.length === 0) {
                return res.status(404).json({ message: "Not Found" });
            }

            res.json({ success: "Profile retrieved successfully", data: getId });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    getByIdDoctor: async(req, res, next) => {
        try {
            const id = req.params.id;

            const getId = await profileDoctor.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            if (!getId || getId.length === 0) {
                return res.status(403).json({ message: "Not Found" });
            }

            res.json({
                success: "Profile Doctor retrieved successfully",
                data: getId,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    destroyMe: async(req, res, next) => {
        try {
            const token = req.user.id;

            const existingUser = await user.findUnique({
                where: {
                    id: token,
                },
                include: {
                    profile: true,
                    notification: true,
                },
            });

            if (!existingUser) {
                return res.status(404).json({ message: "Not Found" });
            }

            await user.delete({
                where: {
                    id: token,
                },
                include: {
                    profile: true,
                },
            });

            await notification.deleteMany({
                where: {
                    userId: token,
                },
            });

            res.json({
                success: "User and related data deleted successfully",
                data: existingUser,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    destroyAdmin: async(req, res, next) => {
        try {
            const usersId = parseInt(req.params.id);

            const existingUser = await user.findUnique({
                where: {
                    id: usersId,
                },
                include: {
                    profile: true,
                    notification: true,
                },
            });

            if (!existingUser) {
                return res.status(404).json({ message: "Not Found" });
            }

            await user.delete({
                where: {
                    id: usersId,
                },
                include: {
                    profile: true,
                },
            });

            await notification.deleteMany({
                where: {
                    userId: usersId,
                },
            });

            await profile.deleteMany({
                where: {
                    userId: usersId,
                },
            });

            res.json({
                success: "User and related data deleted successfully",
                data: existingUser,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
};
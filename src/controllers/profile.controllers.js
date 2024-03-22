const {
    user,
    profile,
    notification,
    profileDoctor,
    hospitalOnDoctor,
    hospital,
  } = require("../models"),
  multer = require("multer"),
  upload = multer().single("picture"),
  { exclude } = require("../utils/encrypt.password"),
  { imageKit } = require("../config"),
  { createNotification } = require("../utils/notification");

module.exports = {
  updateId: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error Uploading File" });
        }

        const { username, email, name, phone, city, province, country } =
          req.body;
        const byId = parseInt(req.params.id);

        const existingEmail = await user.findFirst({
          where: {
            email: email,
          },
        });

        if (existingEmail && existingEmail.id !== byId) {
          return res.status(400).json({ message: "Email is already taken" });
        }

        const existingUsername = await user.findFirst({
          where: {
            username: username,
          },
        });

        if (existingUsername && existingUsername.id !== byId) {
          return res.status(401).json({ message: "Username is already taken" });
        }

        const existingPhone = await profile.findFirst({
          where: {
            phone: phone,
          },
        });

        if (existingPhone && existingPhone.userId !== byId) {
          return res.status(402).json({ message: "Phone is already taken" });
        }

        const existingProfile = await profile.findUnique({
          where: {
            userId: byId,
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

        const updateProfileById = await user.update({
          where: {
            id: byId,
          },
          data: {
            username: username || existingProfile.username,
            email: email || existingProfile.email,
            profile: {
              update: {
                name: name || existingProfile.name,
                phone: phone || existingProfile.phone,
                picture: pictureUrl,
                city: city || existingProfile.city,
                province: province || existingProfile.province,
                country: country || existingProfile.country,
              },
            },
          },
        });

        const profil = exclude(updateProfileById, [
          "password",
          "resetToken",
          "veryficationToken",
        ]);

        const userId = existingProfile.userId;

        const welcomeMessage = `Selamat, data anda berhasil diupdate`;
        await createNotification(userId, welcomeMessage);

        res.json({
          success: "Profile updated successfully",
          profil,
        });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
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

  updateDoctor: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
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

  updateDokterId: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
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

  getAllDoctor: async (req, res, next) => {
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

  getAllDoctorHospitals: async (req, res, next) => {
    try {
      const existingProfiles = await hospitalOnDoctor.findMany();

      if (!existingProfiles || existingProfiles.length === 0) {
        return res.status(403).json({ message: "Profile empty" });
      }

      const get = await Promise.all(
        existingProfiles.map(async (existingProfiles) => {
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

  getProfile: async (req, res, next) => {
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

      const userGet = exitingProfile.map((user) => {
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
        userGet,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  meProfile: async (req, res, next) => {
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

  getByIdProfile: async (req, res, next) => {
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

  getByIdDoctor: async (req, res, next) => {
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

  destroyMe: async (req, res, next) => {
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

  destroyAdmin: async (req, res, next) => {
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
        existingUser,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getDoctor: async (req, res, next) => {
    try {
      const get = await profileDoctor.findMany({
        where: {
          id: req.body.id,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          picture: true,
          spesialis: true,
          description: true,
          city: true,
          province: true,
          country: true,
          details: true,
          aboutUs: true,
          practiceDoctor: {
            select: {
              doctorId: true,
              practice: {
                select: {
                  days: true,
                  open: true,
                  close: true,
                },
              },
            },
          },
          hospitalDoctor: {
            select: {
              doctorId: true,
              hospital: {
                select: {
                  name: true,
                  picture: true,
                  city: true,
                  province: true,
                  country: true,
                  details: true,
                  location: true,
                },
              },
            },
          },
          review: {
            select: {
              feedback: true,
              value: true,
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          rating: {
            select: {
              overalRating: true,
            },
          },
        },
      });

      if (!get || get.length === 0) {
        return res.status(404).json({ message: "Doctor Empty" });
      }

      res.json({ success: "Retrieved Succesfully", get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getDoctorId: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const get = await profileDoctor.findUnique({
        where: {
          id: byId,
        },
        select: {
          id: true,
          name: true,
          phone: true,
          picture: true,
          spesialis: true,
          description: true,
          city: true,
          province: true,
          country: true,
          details: true,
          aboutUs: true,
          practiceDoctor: {
            select: {
              doctorId: true,
              practice: {
                select: {
                  days: true,
                  open: true,
                  close: true,
                },
              },
            },
          },
          hospitalDoctor: {
            select: {
              doctorId: true,
              hospital: {
                select: {
                  name: true,
                  picture: true,
                  city: true,
                  province: true,
                  country: true,
                  details: true,
                  location: true,
                },
              },
            },
          },
          review: {
            select: {
              feedback: true,
              value: true,
              user: {
                select: {
                  username: true,
                  profile: {
                    select: {
                      picture: true,
                    },
                  },
                  profileDoctor: {
                    select: {
                      picture: true,
                    },
                  },
                },
              },
            },
          },
          rating: {
            select: {
              overalRating: true,
            },
          },
        },
      });

      if (!get || get.length === 0) {
        return res.status(404).json({ message: "Doctor Empty" });
      }

      res.json({ success: "Retrieved Succesfully", get });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

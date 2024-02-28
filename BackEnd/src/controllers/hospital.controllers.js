const {
    hospital,
    profileDoctor,
    hospitalOnDoctor,
    user,
  } = require("../models"),
  multer = require("multer"),
  { imageKit } = require("../config");

const upload = multer().single("picture");

module.exports = {
  create: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error uploading files" });
        }

        let { name, city, province, country, location } = req.body;

        let pictureUrl = null;

        if (req.file) {
          try {
            const uploadResponse = await imageKit.upload({
              file: req.file.buffer.toString("base64"),
              fileName: `${name}_hospital_picture`,
            });
            pictureUrl = uploadResponse.url;
          } catch (uploadError) {
            console.error(uploadError);
            return res
              .status(500)
              .json({ message: "Error uploading file to ImageKit" });
          }
        }

        const existingName = await hospital.findFirst({
          where: {
            name: name,
          },
        });

        if (existingName) {
          return res
            .status(403)
            .json({ message: `${name} hospital data, already available.` });
        }

        const hospitals = await hospital.create({
          data: {
            name: name,
            picture: pictureUrl,
            city: city,
            province: province,
            country: country,
            location: location,
          },
        });

        res.json({ success: "Created succesfully", data: hospitals });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  createOn: async (req, res, next) => {
    try {
      const { doctorId, hospitalId } = req.body;

      const existingDoctor = await profileDoctor.findFirst({
        where: {
          userId: req.user.id,
        },
      });

      if (!existingDoctor) {
        if (!doctorId) {
          return res
            .status(400)
            .json({ message: "DoctorId is required", doctorId });
        }

        const existingHospitalDoctor = await hospitalOnDoctor.findFirst({
          where: {
            hospitalId: parseInt(hospitalId),
            doctorId: parseInt(doctorId),
          },
        });

        if (existingHospitalDoctor) {
          return res
            .status(400)
            .json({ message: "HospitalId already exists for this doctor" });
        }

        const existingHospital = await hospital.findFirst({
          where: {
            id: parseInt(hospitalId),
          },
        });

        if (!existingHospital) {
          return res.status(403).json({ message: "Hospital Not Found" });
        }

        const existingDoctorId = await profileDoctor.findFirst({
          where: {
            id: parseInt(doctorId),
          },
        });

        if (!existingDoctorId) {
          return res.status(403).json({ message: "Doctor Not Found" });
        }

        const created = await hospitalOnDoctor.create({
          data: {
            doctor: {
              connect: { id: parseInt(doctorId) },
            },
            hospital: {
              connect: { id: parseInt(hospitalId) },
            },
          },
        });

        return res.json({ success: "Created successfully", data: created });
      }

      // if (!hospitalId) {
      //   return res
      //     .status(400)
      //     .json({ message: "HospitalId is required", hospitalId });
      // }

      const existingHospital = await hospital.findFirst({
        where: {
          id: parseInt(hospitalId),
        },
      });

      if (!existingHospital) {
        return res.status(403).json({ message: "Hospital Not Found" });
      }

      const existingHospitalDoctor = await hospitalOnDoctor.findFirst({
        where: {
          hospitalId: parseInt(hospitalId),
          doctorId: existingDoctor.id,
        },
      });

      if (existingHospitalDoctor) {
        return res
          .status(400)
          .json({ message: "HospitalId already exists for this doctor" });
      }

      const created = await hospitalOnDoctor.create({
        data: {
          doctor: {
            connect: { id: existingDoctor.id },
          },
          hospital: {
            connect: { id: parseInt(hospitalId) },
          },
        },
      });

      return res.json({ success: "Created successfully", data: created });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const hospitals = await hospital.findMany();

      if (!hospitals || hospitals.length === 0) {
        return res.status(403).json({ message: "Hospitals Empty" });
      }

      return res.json({
        success: "Hospitals retrieved successfully",
        data: hospitals,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getId: async (req, res, next) => {
    try {
      const byId = req.params.id;

      const hospitals = await hospital.findUnique({
        where: {
          id: parseInt(byId),
        },
      });

      if (!hospitals || hospitals.lenght === 0) {
        return res.status(403).json({ message: "Not Found" });
      }

      res.json({
        success: "Hospitals retrieved successfully",
        data: hospitals,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getIdDoctor: async (req, res, next) => {
    try {
      const doctorId = req.params.id;

      const hospital = await hospitalOnDoctor.findMany({
        where: { doctorId: parseInt(doctorId) },

        select: {
          doctorId: true,
          doctor: {
            select: {
              name: true,
            },
          },
          hospital: {
            select: {
              id: true,
              name: true,
              picture: true,
              city: true,
              province: true,
              country: true,
              location: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!hospital || hospital.length === 0) {
        return res.status(404).json({ message: "Doctor Not Found" });
      }

      res.json({
        success: "Hospital on Doctor retrieved succesfully",
        data: hospital,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getMe: async (req, res, next) => {
    try {
      const token = req.user.id;

      const hospital = await hospitalOnDoctor.findMany({
        where: {
          doctorId: token.id,
        },
        select: {
          doctorId: true,
          doctor: {
            select: {
              name: true,
            },
          },
          hospital: {
            select: {
              id: true,
              name: true,
              picture: true,
              city: true,
              province: true,
              country: true,
              location: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!hospital || hospital.length === 0) {
        return res.status(404).json({ message: "Hospital Empty" });
      }

      res.json({
        success: "Hospital on Doctor retrieved successfully",
        data: hospital,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateHospital: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error Uploading Files" });
        }

        const { name, picture, city, province, country, location } = req.body;
        const byId = req.params.id;

        const existingHospital = await hospital.findUnique({
          where: {
            id: parseInt(byId),
          },
        });

        if (!existingHospital) {
          return res.status(404).json({ message: "Hospital not found" });
        }

        let pictureUrl = existingHospital.picture;

        if (req.file) {
          try {
            const uploadResponse = await imageKit.upload({
              file: req.file.buffer.toString("base64"),
              fileName: `${name}_hospitals_picture`,
            });
            pictureUrl = uploadResponse.url;
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Error uploading file to ImageKit" });
          }
        }

        const existingName = await hospital.findFirst({
          where: {
            name: name,
          },
        });

        if (existingName) {
          return res
            .status(400)
            .json({ message: `hospital ${name}, already available` });
        }

        const hospitals = await hospital.update({
          where: {
            id: parseInt(byId),
          },
          data: {
            name: name || existingHospital.name,
            picture: pictureUrl,
            city: city || existingHospital.city,
            province: province || existingHospital.province,
            country: country || existingHospital.country,
            location: location || existingHospital.location,
          },
        });

        res.json({ message: "Update Hospitals successfully", data: hospitals });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destoryAll: async (req, res, next) => {
    try {
      await hospital.deleteMany();

      res.json({
        success: "All practices and related data deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroyAllHospitalDoctor: async (req, res, next) => {
    try {
      await hospitalOnDoctor.deleteMany();

      res.json({
        success:
          "All relation hospital on doctor and related data deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

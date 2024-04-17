const { biodata, profileDoctor, experience, education } = require("../models");

module.exports = {
  // create: async (req, res, next) => {
  //   try {
  //     let { experience, education, organization, language, doctorId } =
  //       req.body;

  //     const token = req.user.id;

  //     const doctorProfile = await profileDoctor.findFirst({
  //       where: {
  //         userId: token,
  //       },
  //     });

  //     if (doctorProfile) {
  //       doctorId = token;
  //     } else {
  //       doctorId = doctorId;
  //     }

  //     const existingDoctor = await profileDoctor.findUnique({
  //       where: {
  //         id: doctorId,
  //       },
  //     });

  //     if (!existingDoctor) {
  //       return res.status(404).json({ message: "Doctor Not Found" });
  //     }

  //     const bio = await biodata.create({
  //       data: {
  //         experience: experience,
  //         education: education,
  //         organization: organization,
  //         language: language,
  //         doctorId: doctorId,
  //       },
  //     });

  //     res.json({ success: "Biodata created successfully", bio });
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // },
  create: async (req, res, next) => {
    try {
      const {
        name,
        programStudy,
        yearEducation,
        position,
        office,
        yearExperience,
        organization,
        language,
      } = req.body;

      let doctorId;

      const token = req.user.id;

      if (req.user.role === "dokter") {
        doctorId = token;
      } else {
        doctorId = req.body.doctorId;
      }

      const createdDoctor = await profileDoctor.findUnique({
        where: { id: doctorId },
      });

      if (!createdDoctor) {
        return res.status(404).json({ message: "Doctor Not Found" });
      }

      const createdBiodata = await biodata.create({
        data: {
          organization,
          language,
          doctorId,
        },
      });

      const createdExperience = await experience.create({
        data: {
          position,
          office,
          year: yearExperience,
          doctorId,
        },
      });

      const createdEducation = await education.create({
        data: {
          name,
          programStudy,
          year: yearEducation,
          doctorId,
        },
      });

      res.json({
        success: "Biodata, education, and experience created successfully",
        biodata: createdBiodata,
        experience: createdExperience,
        education: createdEducation,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const token = req.user.id;
      let byId;

      if (req.user.role === "dokter") {
        byId = token;
      } else {
        byId = parseInt(req.params.id);
      }

      const bio = await profileDoctor.findUnique({
        where: {
          id: byId,
        },
        select: {
          id: true,
          name: true,
          biodata: {
            select: {
              organization: true,
              language: true,
            },
          },
          experience: {
            select: {
              position: true,
              office: true,
              year: true,
            },
          },
          education: {
            select: {
              name: true,
              programStudy: true,
              year: true,
            },
          },
        },
      });

      if (!bio) {
        return res.status(404).json({ message: "Doctor Not Found" });
      }

      res.json({ success: "Retrieved Successfully", bio });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let { experience, education, organization, language, doctorId } =
        req.body;

      const byId = parseInt(req.params.id);

      const existingBio = await biodata.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingBio) {
        return res.status(404).json({ message: "Biodata Not Found" });
      }

      const bio = await biodata.update({
        where: {
          id: byId,
        },
        data: {
          experience: experience || existingBio.experience,
          education: education || existingBio.education,
          organization: organization || existingBio.organization,
          language: language || existingBio.language,
        },
      });

      res.json({ success: "Biodata update succesfully", bio });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const existingBio = await biodata.findUnique({
        where: { id: byId },
      });

      if (!existingBio) {
        return res.status(404).json({ message: "Biodata Not Found" });
      }

      await biodata.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted succesfully", existingBio });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

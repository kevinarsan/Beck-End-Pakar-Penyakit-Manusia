const { practice, practiceOnDoctor, profileDoctor } = require("../../models"),
  { createNotification } = require("../../utils/notification");

module.exports = {
  create: async (req, res, next) => {
    try {
      const { days, open, close, doctorId } = req.body;

      const token = await profileDoctor.findFirst({
        where: {
          userId: req.user.id,
        },
      });

      if (!token) {
        // return res.status(403).json({ message: "Doctor not found" });
        if (!doctorId) {
          return res
            .status(403)
            .json({ message: "Doctor is required", doctorId });
        }

        const existingDoctorId = await profileDoctor.findFirst({
          where: {
            id: parseInt(doctorId),
          },
        });

        if (!existingDoctorId) {
          return res.status(403).json({ message: "DoctorId Not Found" });
        }

        // const existingdays = await practice.findFirst({
        //   where: {
        //     days: days,
        //   },
        // });

        // if (existingdays) {
        //   return res
        //     .status(400)
        //     .json({ message: `On ${days}, there are practice hours` });
        // }

        const created = await practice.create({
          data: {
            days: days,
            open: open,
            close: close,
            practiceDoctor: {
              create: {
                doctor: {
                  connect: { id: parseInt(doctorId) },
                },
              },
            },
          },
          include: {
            practiceDoctor: true,
          },
        });

        return res.json({ success: "Created succesfully", data: created });
      }

      // const existingdays = await practice.findFirst({
      //   where: {
      //     days: days,
      //   },
      // });

      // if (existingdays) {
      //   return res
      //     .status(400)
      //     .json({ message: `On ${days}, there are practice hours` });
      // }

      const create = await practice.create({
        data: {
          days: days,
          open: open,
          close: close,
          practiceDoctor: {
            create: {
              doctor: {
                connect: { id: token.id },
              },
            },
          },
        },
        include: {
          practiceDoctor: true,
        },
      });

      // const userId = token.userId;

      // const welcomeMessage = `Selamat, anda telah berhasil menambahkan data praktek kerja`;
      // await createNotification(token.id, welcomeMessage);

      res.json({
        success: "Created successfully",
        data: create,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  createOn: async (req, res, next) => {
    try {
      const { practiceId, doctorId } = req.body;

      const token = await profileDoctor.findFirst({
        where: { userId: req.user.id },
      });

      if (!token) {
        // return res.status(403).json({ message: "Doctor Not Found" });

        if (!doctorId) {
          return res
            .status(400)
            .json({ message: "DoctorId is required", doctorId });
        }

        const existingPractice = await practiceOnDoctor.findFirst({
          where: {
            practiceId: parseInt(practiceId),
            doctorId: parseInt(doctorId),
          },
        });

        if (existingPractice) {
          return res
            .status(400)
            .json({ message: "PracticeId already exists for this doctor" });
        }

        const existingPracticeId = await practice.findFirst({
          where: {
            id: parseInt(practiceId),
          },
        });

        if (!existingPracticeId) {
          return res.status(403).json({ message: "PracticeId Not Found" });
        }

        const created = await practiceOnDoctor.create({
          data: {
            doctor: {
              connect: { id: parseInt(doctorId) },
            },
            practice: {
              connect: { id: parseInt(practiceId) },
            },
          },
        });

        return res.json({ success: "Created Succesfully", data: created });
      }

      const existingPractice = await practiceOnDoctor.findFirst({
        where: {
          practiceId: parseInt(practiceId),
          doctorId: token.id,
        },
      });

      if (existingPractice) {
        return res
          .status(400)
          .json({ message: "PracticeId already exists for this doctor" });
      }

      const existingPracticeId = await practice.findFirst({
        where: {
          id: parseInt(practiceId),
        },
      });

      if (!existingPracticeId) {
        return res.status(403).json({ message: "PracticeId Not Found" });
      }

      const create = await practiceOnDoctor.create({
        data: {
          doctor: {
            connect: { id: token.id },
          },
          practice: {
            connect: { id: parseInt(practiceId) },
          },
        },
      });
      res.json({ success: "Created successfully", data: create });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const existingPractice = await practice.findMany({
        // include: {
        //   practiceDoctor: true,
        // },
      });

      if (!existingPractice || existingPractice.lenght === 0)
        return res.status(403).json({ message: "Not Found" });

      res.json({
        success: "Practice retrieved successfully",
        data: existingPractice,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getByIdDoctor: async (req, res, next) => {
    try {
      const doctorId = req.params.id;

      const practice = await practiceOnDoctor.findMany({
        where: { doctorId: parseInt(doctorId) },
        select: {
          doctorId: true,
          doctor: {
            select: {
              name: true,
            },
          },
          practice: {
            select: {
              id: true,
              days: true,
              open: true,
              close: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      if (!practice || practice.length === 0) {
        return res.status(404).json({ message: "Practice Not Found" });
      }

      res.json({
        success: "Practice retrieved successfully",
        data: practice,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const byid = req.params.id;

      const existingPractice = await practice.findUnique({
        where: {
          id: parseInt(byid),
        },
      });

      if (!existingPractice || existingPractice.lenght === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      res.json({
        success: "Practice retrieved successfully",
        data: existingPractice,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { days, open, close } = req.body;
      const byid = parseInt(req.params.id);

      const existingPractice = await practice.findUnique({
        where: {
          id: byid,
        },
      });

      if (!existingPractice) {
        return res.status(404).json({ message: "Practice Not Found" });
      }

      const updated = await practice.update({
        where: {
          id: byid,
        },
        data: {
          // days: days || existingPractice.days,
          open: open || existingPractice.open,
          close: close || existingPractice.close,
        },
      });

      res.json({ success: "Updated succesfully", data: updated });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {
      const practiceId = parseInt(req.params.id);

      const existingpractice = await practice.findUnique({
        where: {
          id: practiceId,
        },
        include: {
          practiceDoctor: true,
        },
      });

      if (!existingpractice) {
        return res.status(404).json({ message: "Not Found" });
      }

      await practiceOnDoctor.deleteMany({
        where: {
          practiceId: practiceId,
        },
      });

      await practice.delete({
        where: {
          id: practiceId,
        },
      });

      res.json({
        success: "User and related data deleted successfully",
        data: existingpractice,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  destroyAll: async (req, res, next) => {
    try {
      await practiceOnDoctor.deleteMany();

      await practice.deleteMany();

      res.json({
        success: "All practices and related data deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

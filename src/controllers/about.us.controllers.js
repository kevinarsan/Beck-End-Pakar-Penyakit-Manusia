const { update } = require("lodash");

const {
    visiMisi,
    team,
    aboutUs,
    tutorial,
    faq,
    contact,
  } = require("../models"),
  multer = require("multer"),
  { imageKit } = require("../config"),
  upload = multer().single("picture");

module.exports = {
  visi: async (req, res, next) => {
    try {
      const { name, bab, description } = req.body;

      const visi = await visiMisi.create({
        data: {
          name: name,
          bab: bab,
          description: description,
        },
      });

      res.json({ success: "Created succesfully", visi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getVisi: async (req, res, next) => {
    try {
      const existingVisi = await visiMisi.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!existingVisi || existingVisi.length === 0) {
        return res.status(404).json({ message: "Visi Misi Empty" });
      }

      res.json({ success: "Visi Misi retreived succesfully", existingVisi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateMisi: async (req, res, next) => {
    try {
      const { name, bab, description } = req.body;
      const byId = parseInt(req.params.id);
      const existingMisi = await visiMisi.findUnique({
        where: {
          id: byId,
        },
      });
      if (!existingMisi) {
        return res.status(404).json({ message: "Not Found" });
      }

      const visi = await visiMisi.update({
        where: {
          id: byId,
        },
        data: {
          name: name || existingMisi.name,
          bab: bab || existingMisi.bab,
          description: description || existingMisi.description,
        },
      });

      res.json({ success: "Update succesfully", visi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteMisi: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const misi = await visiMisi.findUnique({
        where: {
          id: byId,
        },
      });

      if (!misi) {
        return res.status(404).json({ message: "Not Found" });
      }

      await visiMisi.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Delete succesfully", misi });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  about: async (req, res, next) => {
    try {
      const { description, name } = req.body;
      const created = await aboutUs.create({
        data: {
          name: name,
          description: description,
        },
      });

      res.json({ success: "Created data succesfully", created });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getAbout: async (req, res, next) => {
    try {
      const about = await aboutUs.findMany({
        where: {
          id: req.body.id,
        },
      });
      if (!about || about.length === 0) {
        return res.status(404).json({ message: "About Empty" });
      }

      res.json({ success: "About retreived succesfully", about });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateAbout: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const { description, name } = req.body;
      const moto = await aboutUs.findUnique({
        where: {
          id: byId,
        },
      });

      if (!moto) {
        return res.status(404).json({ message: "Not Found" });
      }

      const upMoto = await aboutUs.update({
        where: {
          id: byId,
        },
        data: {
          name: name || moto.name,
          description: description || moto.description,
        },
      });

      res.json({ success: "Update succesfully", upMoto });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteAbout: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const moto = await aboutUs.findUnique({
        where: {
          id: byId,
        },
      });

      if (!moto) {
        return res.status(404).json({ message: " Not Found" });
      }

      await aboutUs.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted succesfully", moto });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  teamCreate: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error uploading file" });
        }

        let { name, description } = req.body;

        let pictureUrl = null;

        if (req.file) {
          try {
            const uploadResponse = await imageKit.upload({
              file: req.file.buffer.toString("base64"),
              fileName: `${name}_team_picture`,
            });
            pictureUrl = uploadResponse.url;
          } catch (error) {
            console.error(uploadError);
            return res
              .status(500)
              .json({ message: "Error uploading file to ImageKit" });
          }
        }

        const teams = await team.create({
          data: {
            name: name,
            picture: pictureUrl,
            description: description,
          },
        });

        res.json({ success: "Created succesfully", teams });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getTeam: async (req, res, next) => {
    try {
      const teams = await team.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!teams || teams.length === 0) {
        return res.status(404).json({ message: "Teams Empty" });
      }

      res.json({ success: "Team retreived succesfully", teams });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateTeam: async (req, res, next) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error Uploading File" });
        }

        const byId = parseInt(req.params.id);
        const { name, description } = req.body;

        const existingTeam = await team.findUnique({
          where: {
            id: byId,
          },
        });

        if (!existingTeam) {
          return res.status(404).json({ message: "Not Found" });
        }

        let pictureUrl = existingTeam.picture;

        if (req.file) {
          try {
            const uploadResponse = await imageKit.upload({
              file: req.file.buffer.toString("base64"),
              fileName: `${name}_teams_picture`,
            });
            pictureUrl = uploadResponse.url;
          } catch (error) {
            return res
              .status(500)
              .json({ message: "Error uploading file to ImageKit" });
          }
        }

        const teams = await team.update({
          where: {
            id: byId,
          },
          data: {
            name: name || existingTeam.name,
            picture: pictureUrl,
            description: description || existingTeam.description,
          },
        });

        res.json({ success: "Update succesfully", teams });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteTeams: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const teams = await team.findUnique({
        where: {
          id: byId,
        },
      });

      if (!teams) {
        return res.status(404).json({ message: "Not Found" });
      }

      await team.delete({
        where: {
          id: byId,
        },
      });

      return res.json({ success: "deleted succesfully", teams });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  video: async (req, res, next) => {
    try {
      const { linkVideo, description } = req.body;

      const videos = await tutorial.create({
        data: {
          linkVideo: linkVideo,
          description: description,
        },
      });

      res.json({ success: "Created succesfully", videos });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getVideo: async (req, res, next) => {
    try {
      const existingVideo = await tutorial.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!existingVideo || existingVideo.length === 0) {
        return res.status(404).json({ message: "Tutorial Empty" });
      }

      const videos = await tutorial.findMany({
        where: {
          id: req.body.id,
        },
      });

      res.json({ success: "Retreived data succesfully", videos });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateVideo: async (req, res, next) => {
    try {
      const { linkVideo, description } = req.body;
      const byId = parseInt(req.params.id);

      const existingVideos = await tutorial.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingVideos) {
        return res.status(404).json({ message: "Not Found" });
      }

      const videos = await tutorial.update({
        where: {
          id: byId,
        },
        data: {
          linkVideo: linkVideo || existingVideos.linkVideo,
          description: description || existingVideos.description,
        },
      });

      res.json({ success: "Updated data succesfully", videos });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteVideo: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const existingVideo = await tutorial.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingVideo) {
        return res.status(404).json({ message: "Not Found" });
      }

      const videos = await tutorial.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Delete data succesfullly", videos });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  faq: async (req, res, next) => {
    try {
      const { pertanyaan, jawaban } = req.body;
      const FAQ = await faq.create({
        data: {
          pertanyaan: pertanyaan,
          jawaban: jawaban,
        },
      });

      res.json({ success: "Created succesfully", FAQ });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getFaq: async (req, res, next) => {
    try {
      const existingFaq = await faq.findMany({
        where: {
          id: req.body.id,
        },
      });

      if (!existingFaq || existingFaq.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      const FAQ = await faq.findMany({
        where: {
          id: req.body.id,
        },
      });

      res.json({ success: "Retrieved data succesfully", FAQ });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateFaq: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const { pertanyaan, jawaban } = req.body;

      const existingFaq = await faq.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingFaq) {
        return res.status(404).json({ message: "Not Found" });
      }

      const FAQ = await faq.update({
        where: {
          id: byId,
        },
        data: {
          pertanyaan: pertanyaan || existingFaq.pertanyaan,
          jawaban: jawaban || existingFaq.jawaban,
        },
      });

      res.json({ success: "Updated succesfully", FAQ });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteFaq: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const existingFaq = await faq.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingFaq) {
        return res.status(404).json({ message: "Not Found" });
      }

      const FAQ = await faq.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted succesfully", FAQ });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  kontak: async (req, res, next) => {
    try {
      const { name, email } = req.body;

      const contacts = await contact.create({
        data: {
          name: name,
          email: email,
        },
      });

      res.json({ success: "Created succesfully", contacts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  getContact: async (req, res, next) => {
    try {
      const existingContact = await contact.findMany({
        where: { id: req.body.id },
      });

      if (!existingContact || existingContact.length === 0) {
        return res.status(404).json({ message: "Not Found" });
      }

      const contacts = await contact.findMany({
        where: { id: req.body.id },
      });

      res.json({ message: "Retrieved succesfully", contacts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateContact: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);
      const { name, email } = req.body;
      const existingContact = await contact.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingContact) {
        return res.status(404).json({ message: "Not Found" });
      }

      const contacts = await contact.update({
        where: {
          id: byId,
        },
        data: {
          name: name || existingContact.name,
          email: email || existingContact.email,
        },
      });

      res.json({ success: "Updated data succesfully", contacts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  deleteContact: async (req, res, next) => {
    try {
      const byId = parseInt(req.params.id);

      const existingContact = await contact.findUnique({
        where: {
          id: byId,
        },
      });

      if (!existingContact) {
        return res.status(404).json({ message: "Not Found" });
      }

      const contacts = await contact.delete({
        where: {
          id: byId,
        },
      });

      res.json({ success: "Deleted data succesfully", contacts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

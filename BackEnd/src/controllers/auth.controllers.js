const { user, profile, profileDoctor } = require("../models"),
  {
    cryptPassword,
    verifyHashed,
    jwt,
    exclude,
  } = require("../utils/encrypt.password"),
  { createNotification } = require("../utils/notification");

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      const { username, email, password, phone } = req.body;

      const existingEmail = await user.findFirst({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        return res.status(400).json({ message: "Email is already taken" });
      }

      const existingUsername = await user.findFirst({
        where: {
          username: username,
        },
      });

      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      const existingPhone = await user.findFirst({
        where: {
          profile: {
            phone: phone,
          },
        },
      });

      if (existingPhone) {
        return res.status(400).json({ message: "Phone is already taken" });
      }

      const register = await user.create({
        data: {
          username: username,
          email: email,
          password: await cryptPassword(password),
          role: "user",
          profile: {
            create: {
              phone: phone,
            },
          },
        },
      });

      const welcomeMessage = `Selamat datang, ${username}! Terima kasih telah bergabung.`;
      await createNotification(register.id, welcomeMessage);

      const data = exclude(register, [
        "password",
        "resetToken",
        "veryficationToken",
      ]);

      res.json({
        success: "Register successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  registerAdmin: async (req, res, next) => {
    try {
      const { username, email, password, phone, role } = req.body;

      const existingEmail = await user.findFirst({
        where: {
          email: email,
        },
      });

      if (existingEmail) {
        return res.status(400).json({ message: "Email is already taken" });
      }

      const existingUsername = await user.findFirst({
        where: {
          username: username,
        },
      });

      if (existingUsername) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      const existingPhone = await user.findFirst({
        where: {
          profile: {
            phone: phone,
          },
        },
      });

      if (existingPhone) {
        return res.status(400).json({ message: "Phone is already taken" });
      }

      const register = await user.create({
        data: {
          username: username,
          email: email,
          password: await cryptPassword(password),
          role: role,
          [role === "admin" ? "profile" : "profileDoctor"]: {
            create: {
              phone: phone,
            },
          },
        },
      });

      const welcomeMessage = `Selamat datang, ${username}! Terima kasih telah bergabung.`;
      await createNotification(register.id, welcomeMessage);

      const data = exclude(register, [
        "password",
        "resetToken",
        "veryficationToken",
      ]);

      res.json({
        success: "Register successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, email, password, phone } = req.body;

      let users;
      if (username) {
        users = await user.findFirst({
          where: { username: username },
          include: { profile: true },
        });
      } else if (email) {
        users = await user.findFirst({
          where: { email: email },
          include: { profile: true },
        });
      } else if (phone) {
        users = await user.findFirst({
          where: {
            profile: { phone: phone },
          },
          include: { profile: true },
        });
      } else {
        return res.status(400).json({ message: "Invalid login request" });
      }

      if (!users) {
        return res.status(403).json({ message: "Invalid credentials" });
      }

      const verifyPassword = await verifyHashed(
        password,
        users.password.toString()
      );
      if (!verifyPassword) {
        return res.status(403).json({ message: "Invalid password" });
      }

      // Menentukan role dan mengambil data sesuai role
      let userData;
      if (users.role === "dokter") {
        userData = await profileDoctor.findUnique({
          where: { userId: users.id },
        });
      } else {
        userData = await profile.findUnique({
          where: { userId: users.id },
        });
      }

      const payload = {
        id: users.id,
        username: users.username,
        email: users.email,
        phone: userData.phone,
        role: users.role,
      };

      const token = jwt(payload);

      res.json({
        success: "Login successfully",
        data: { user: payload, token },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  me: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const users = await user.findUnique({
        where: {
          id: userId,
        },
      });

      const data = exclude(users, [
        "password",
        "resetToken",
        "veryficationToken",
      ]);

      res.json({
        success: "Fetch data successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  updateMe: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const token = req.user.id;

      const existingUser = await user.findUnique({
        where: {
          id: token,
        },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "Not Found" });
      }

      const update = await user.update({
        where: {
          id: token,
        },
        data: {
          username: username || existingUser.username,
        },
      });

      const data = exclude(update, [
        "password",
        "resetToken",
        "veryficationToken",
      ]);

      res.json({
        success: "Update successfully",
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

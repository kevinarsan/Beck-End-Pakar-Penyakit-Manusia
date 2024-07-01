const { user, profile, profileDoctor } = require("../models"),
  {
    cryptPassword,
    verifyHashed,
    jwt,
    exclude,
  } = require("../utils/encrypt.password"),
  { createNotification } = require("../utils/notification"),
  { generateOTP } = require("../utils/otp"),
  nodemailer = require("nodemailer"),
  { generate } = require("otp-generator");
const { validationResult } = require("express-validator");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config();

module.exports = {
  register: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password, phone } = req.body;

      const existingEmail = await user.findFirst({
        where: {
          email: email,
        },
      });
      if (existingEmail) {
        return res.status(403).json({ message: "Your email already exists" });
      }

      const generatedOTP = generateOTP();

      const data = await user.create({
        data: {
          username: username,
          email: email,
          password: await cryptPassword(password),
          role: "user",
          validasi: generatedOTP,
          isActive: false,
          profile: {
            create: {
              phone: phone,
            },
          },
        },
      });

      // Konfigurasi OAuth2 client
      const oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
      });

      const accessToken = oauth2Client.getAccessToken();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_USER,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP Verification",
        html: `<p>Hi ${email},</p><p>Your OTP for account verification is: <strong>${generatedOTP}</strong></p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: "Failed to send OTP email" });
        }
        console.log("Email sent:", info.response);
        res.json({
          email: data.email,
          otp: data.validasi,
          success: "Check your email for verify",
        });
      });
    } catch (error) {
      console.error("Error registering user:", error);
      next(error);
    }
  },

  verifyUser: async (req, res) => {
    try {
      const findUser = await user.findFirst({
        where: {
          email: req.params.key,
        },
      });
      if (!findUser) {
        return res.status(403).json({
          error: "Your email is not registered in our system",
        });
      }
      if (findUser && findUser.validasi !== req.body.validasi) {
        return res.status(403).json({
          error: "Your OTP not valid",
        });
      }
      const data = await user.update({
        data: {
          isActive: true,
        },
        where: {
          id: findUser.id,
        },
      });

      const token = jwt.sign(
        { id: findUser.id, email: findUser.email, phone: findUser.phone },
        secret_key,
        { expiresIn: "6h" }
      );

      res.json({
        data: {
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error,
      });
    }
  },

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
        return res.status(401).json({ message: "Username is already taken" });
      }

      const existingPhone = await user.findFirst({
        where: {
          profile: {
            phone: phone,
          },
        },
      });

      if (existingPhone) {
        return res.status(402).json({ message: "Phone is already taken" });
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

      const registerUser = exclude(register, [
        "password",
        "resetToken",
        "veryficationToken",
      ]);

      res.json({
        success: "Register successfully",
        registerUser,
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
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const verifyPassword = await verifyHashed(
        password,
        users.password.toString()
      );
      if (!verifyPassword) {
        return res.status(403).json({ message: "Invalid password" });
      }

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

  resetPassword: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { oldPassword, newPassword } = req.body;
      const token = req.user.id;

      const existingUser = await user.findUnique({
        where: { id: token },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordMatch = await verifyHashed(
        oldPassword,
        existingUser.password
      );
      if (!isPasswordMatch) {
        return res.status(403).json({ message: "Old password is incorrect" });
      }

      const hashedPassword = await cryptPassword(newPassword);

      await user.update({
        where: { id: token },
        data: { password: hashedPassword },
      });

      res.json({ success: "Password updated successfully" });
    } catch (error) {
      console.error("Error resetting password:", error);
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

      const me = exclude(users, [
        "password",
        "resetToken",
        "veryficationToken",
      ]);

      res.json({
        success: "Fetch data successfully",
        me,
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

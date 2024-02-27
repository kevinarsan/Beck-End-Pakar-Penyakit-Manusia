const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const { FORGOT_PASSWORD, USER_EMAIL, USER_PASSWORD } = require("../config");
const link = FORGOT_PASSWORD;
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD,
    },
});

module.exports = {
    encryptEmail: async(password) => {
        try {
            const saltRounds = 5;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            const base64EncodedHash = Buffer.from(hashedPassword).toString("base64");
            return base64EncodedHash;
        } catch (error) {
            throw new Error("Password encryption failed");
        }
    },

    generateOTP: () => {
        return otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
        });
    },

    sendOTPByEmail: (email, otp, callback) => {
        const mailOptions = {
            from: "System@gmail.com",
            to: email,
            subject: "Send OTP",
            text: `Use the following OTP to complete your verification: ${otp}.`,
        };

        transporter.sendMail(mailOptions, callback);
    },

    sendLinkByEmail: (email, resetToken, callback) => {
        const mailOptions = {
            from: "System@gmail.com",
            to: email,
            subject: "Send Link Reset Password",
            html: `Click this <a href="${link}/${resetToken}">link </a> for reset your password.`,
        };
        transporter.sendMail(mailOptions, callback);
    },

    sendWarnByEmail: (email, callback) => {
        const mailOptions = {
            from: "System@gmail.com",
            to: email,
            subject: "Send Link Reset Password",
            text: `Your password has been changed. See your account for check it`,
        };
        transporter.sendMail(mailOptions, callback);
    },
};
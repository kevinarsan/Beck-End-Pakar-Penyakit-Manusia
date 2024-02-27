const dotEnv = require("dotenv");
dotEnv.config();
const ImageKit = require("imagekit");

module.exports = {
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    FORGOT_PASSWORD: process.env.FORGOT_PASSWORD,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    imageKit: new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_SECRET_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    }),
};
const jwt = require("jsonwebtoken"),
    { SECRET_KEY } = require("../config"),
    { user } = require("../models");

module.exports = {
    checkToken: async(req, res, next) => {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                error: "please provide a token",
            });
        }

        if (token.toLowerCase().startsWith("bearer")) {
            token = token.slice("bearer".length).trim();
        }

        try {
            const jwtPayload = jwt.verify(token, SECRET_KEY);

            const users = await user.findUnique({
                where: {
                    id: jwtPayload.id,
                },
            });

            if (!users) {
                return res.status(401).json({
                    error: "unauthenticated",
                });
            }

            req.user = jwtPayload;
            next();
        } catch (error) {
            return res.status(401).json({
                error: "unauthenticated",
            });
        }
    },
};
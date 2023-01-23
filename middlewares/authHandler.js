const jwt = require('jsonwebtoken');
const CreateNewError = require('../middlewares/errorHandling.js');

const verifyToke = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(CreateNewError(401, "You are Not Authenticate!"));

    jwt.verify(token, process.env.JWT_SECRET, (err, userId) => {
        if (err) return next(CreateNewError(403, "Authentication Failed!"));
        req.user = userId;
        next();
    })
}

module.exports = verifyToke;
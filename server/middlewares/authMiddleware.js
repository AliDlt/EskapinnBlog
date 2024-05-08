// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decodedToken.userId,
            role: decodedToken.role,
            passoword:decodedToken.password
        };
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Authentication failed'
        });
    }
};

exports.authorize = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'editor') {
        next();
    } else {
        res.status(403).json({
            status: 'fail',
            message: 'You are not authorized to perform this action'
        });
    }
};

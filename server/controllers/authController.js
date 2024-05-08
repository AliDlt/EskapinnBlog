// controllers/authController.js

const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.status(200).json({
            status: 'success',
            data: {
                token
            }
        });
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: err.message
        });
    }
};

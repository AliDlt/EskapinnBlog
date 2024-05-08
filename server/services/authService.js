const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await User.create({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            role: userData.role || 'editor'
        });
        return newUser;
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.login = async (username, password) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error('Invalid credential');
        }
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                password: user.password
            }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        return token;
    } catch (err) {
        throw new Error(err.message);
    }
};

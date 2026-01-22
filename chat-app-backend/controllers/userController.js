const userService = require('../services/userService');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
};

module.exports = { getUsers };

var UserDAO = require('../daos/userDAO');

const getByEmail = (email, successCbk, errorCbk) => {
    return UserDAO.getByEmail(email, successCbk, errorCbk);
};

const add = (user, successCbk, errorCbk) => {
    return UserDAO.add(user, successCbk, errorCbk);
};

const get = (userId, successCbk, errorCbk) => {
    return UserDAO.get(userId, successCbk, errorCbk);
};

module.exports = {
    getByEmail: getByEmail,
    add: add,
    get: get
};
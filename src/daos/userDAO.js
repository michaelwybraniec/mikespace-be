var User = require('../persisters/user.js');


const getByEmail = (email, successCbk, errorCbk) => {
    User.findOne({ "email": new RegExp("^" + email + "$", 'i') }, function (err, user) {
        if(err) return errorCbk(err);

        return successCbk(user);
    });
};

const add = (user, successCbk, errorCbk) => {
    new User(user).save(function (err, user) {
        if(err) return errorCbk(err);

        return successCbk(user);
    });
};

const get = (userId, successCbk, errorCbk) => {
    User.findOne({ "_id": userId }, function (err, user) {
        if(err) return errorCbk(err);

        user.password = "***";

        return successCbk(user);
    });
};

module.exports = {
    getByEmail: getByEmail,
    add: add,
    get: get
};

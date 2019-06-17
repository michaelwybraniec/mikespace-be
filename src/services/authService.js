var UserService = require('../services/userService');

const fs = require('fs');
const jwt = require('jsonwebtoken');

const login = (email, password, res, successCbk, errorCbk) => {
    UserService.getByEmail(email, function (user) {
        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err || !isMatch) return errorCbk(403, {
                    "success": false, "message": "Authentication error"
                });

                if (isMatch) {
                    let payload = {
                        "email": user.email,
                        "last_name": user.last_name,
                        "first_name": user.first_name,
                        "id": user._id
                    };

                    var privateKey = fs.readFileSync('./private.key', 'utf-8');
                    // var publicKey = fs.readFileSync('./public.key', 'utf-8');

                    let issuer = "MICHAEL-WYBRANIEC";
                    let subject = "michauwybraniec@gmail.com";
                    let audience = "https://www.linkedin.com/in/michaelwybraniec/";

                    let signOptions = {
                        issuer: issuer,
                        subject: subject,
                        audience: audience,
                        expiresIn: "12h",
                        algorithm: "RS256"
                    }

                    let token = jwt.sign(payload, privateKey, signOptions);
                    res.set('jwtToken', token);

                    // Security : hide pwd
                    user.password = "***";

                    return successCbk(200, { "user": user });
                }
            })
        } else {
            return errorCbk(403, { "success": false, "message": "Authentication error" });
        }
    }, errorCbk);
};

module.exports = {
    login: login
};
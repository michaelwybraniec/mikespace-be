const fs = require('fs');
const jwt = require('jsonwebtoken');

const jwtHandler = (req, res, next) => {
    var privateKey = fs.readFileSync('./private.key', 'utf-8');
    var publicKey = fs.readFileSync('./public.key', 'utf-8');
    let i = "MICHAEL-WYBRANIEC";
    let s = "michauwybraniec@gmail.com";
    let a = "https://www.linkedin.com/in/michaelwybraniec/";

    let signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "12h",
        algorithm: "RS256"
    }

    jwt.verify(req.headers.jwttoken, publicKey, signOptions, function (err, decoded) {
        if (err) {
            res.status(403).json({
                "success": false,
                "message": err
            });
        } else {
            req.userId = decoded.id;
            next();
        }
    });
}

module.exports = {
    jwtHandler: jwtHandler
};
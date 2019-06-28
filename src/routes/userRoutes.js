var express = require('express');
var router = express.Router();

var middlewareJwt = require('../middlewares/jwt');

var successCbk = require('../misc/callbacks').successCbk;
var errorCbk = require('../misc/callbacks').errorCbk;
var validateAnd = require('../misc/callbacks').validateAnd;

var UserValidator = require('../validators/userValidator');
var UserService = require('../services/userService');

router.post('/user', function (req, res) {
    return validateAnd(
        UserValidator,
        req.body,
        res,
        () => UserService.add(
            req.body,
            (data) => successCbk(res, 200, { "user": data }),
            (err) => errorCbk(res, 400, err)
        )
    );
});

router.get('/user', middlewareJwt.jwtHandler, function (req, res) {
    UserService.get(req.userId,
        (user) => successCbk(res, 200, { user: user }),
        (err) => errorCbk(res, 400, err),
    );
});

// router.get('/user', async (req, res, next) => {
//     try {
//         const user = await UserService.get(req.userId)
//         res.json(user);
//     } catch (e) {
//         middlewareJwt.jwtHandler

//         next(e)
//     }
// });

// router.get('/user', middlewareJwt.jwtHandler, async function (req, res) {
//     try {
//         var result = await UserService.get(req.userId);
//         res(result);
//     } catch (error) {
//         res(error);
//     }
// });

// router.post('/user/email', function (req, res) {
//     UserService.getByEmail(req.body.email,
//         (user) => {
//             if (user) successCbk(res, 200, { emailExists: true });
//             else successCbk(res, 200, { emailExists: false });
//         },
//         (err) => errorCbk(res, 400, err),
//     );
// });

router.put('/user', middlewareJwt.jwtHandler, function (req, res) {
    // TODO
});

router.delete('/user', middlewareJwt.jwtHandler, function (req, res) {
    // TODO
});


module.exports = router;
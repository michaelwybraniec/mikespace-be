var express = require('express');
var router = express.Router();

var successCbk = require('../misc/callbacks').successCbk;
var errorCbk = require('../misc/callbacks').errorCbk;

var AuthService = require('../services/authService');

router.post('/auth/login', function (req, res) {
    AuthService.login(req.body.email, req.body.password, res, 
        (status, data) => successCbk(res, status, data),
        () => errorCbk(res, 403, { "success": false, "message": "Authentication error" }));
});

module.exports = router;
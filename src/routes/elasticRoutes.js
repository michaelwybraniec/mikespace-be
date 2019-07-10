var express = require('express');
var router = express.Router();

var middlewareJwt = require('../middlewares/jwt');

/* var elasticsearch = require('elasticsearch');
var client = new elasticsearch.client({
  host: 'localhost:9200'
})*/


router.post('/test', (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({
      message: "Id is required"
    });
  }

  /* client.index({
    index: "test",
    type: "bytype",
    id: req.body.id,
    body: req.body

  }, function (err, resp, status) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).send({
        message: "POST test workout call succeded"
      })
    }
  });*/
})

// router.get('/user', middlewareJwt.jwtHandler, function (req, res) {
//   UserService.get(req.userId,
//     (user) => successCbk(res, 200, { user: user }),
//     (err) => errorCbk(res, 400, err),
//   );
// });

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

// router.put('/user', middlewareJwt.jwtHandler, function (req, res) {
//   // TODO
// });

// router.delete('/user', middlewareJwt.jwtHandler, function (req, res) {
//   // TODO
// });


module.exports = router;
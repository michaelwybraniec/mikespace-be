
const errorHandler = (req, res, next) => {
    res.status(404).json({
        "success": false,
        "message": {
            "errorCode": 404,
            "errorMessage": "Route is not defined"
        }
    });

    next();
};

const notFound = (err, req, res, next) => {
    // Sets a generic server error status code if none is part of the err
    if (!err.statusCode) err.statusCode = 500;

    res.status(err.statusCode).send(err.message);
};

module.exports = {
    errorHandler: errorHandler,
    notFound: notFound
};
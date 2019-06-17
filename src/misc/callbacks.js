const successCbk = (res, status, data) => {
    res.status(status).json({
        "success": true,
        "message": data
    });
};

const errorCbk = (res, status, data) => {
    res.status(status).json({
        "success": false,
        "message": data
    });
};

const validateAnd = (validator, data, res, successCbk) => {
    validator.validate(data, { abortEarly: false })
        .then(validatedChanges => {
            return successCbk();
        })
        .catch(validationError => {
            return errorCbk(res, 400, validationError.details);
        });
};

module.exports = {
    successCbk: successCbk,
    errorCbk: errorCbk,
    validateAnd: validateAnd
};
function checkParams(scheme) {
    return (req, res, next) => {
        const validationResut = scheme.validate(req.params);
        if (validationResut.error) {
            return res.status(400).send(validationResut.error.details);
        }
        next();
    }
} 

function checkBody(scheme) {
    return (req, res, next) => {
        const validationResut = scheme.validate(req.body);
        if (validationResut.error) {
            return res.status(400).send(validationResut.error.details);
        }
        next();
    }
};

module.exports = { checkParams, checkBody };
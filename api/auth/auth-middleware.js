const hash = require('../access_keys/verify-key');

module.exports.AuthMiddleware = function (req, res, next) {
    const { accesskey } = req.headers;
    if (accesskey == null) {
        return res.status(400).send({ "response": "Access Key Missing" });
    }
    else {
        const isValidKey = hash.verifyAccessKey(accesskey);

        if (!isValidKey) {
            return res.status(401).send({ "response": "Unauthorizied" });
        }
    }
    next();
}

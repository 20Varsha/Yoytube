const bcrypt = require('bcrypt');
const { hashString } = require('../config/keys');

var hash = '';

module.exports.getAPIKey = function () {
    if (hash === '') {
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(hashString, salt);
    }
    return hash;
};
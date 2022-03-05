const bcrypt = require('bcrypt');

var hash = '';

module.exports.getAPIKey = function (hashString) {
    if (hash === '') {
        const salt = bcrypt.genSaltSync(10);
        hash = bcrypt.hashSync(hashString, salt);
    }
    return hash;
};



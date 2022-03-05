const bcrypt = require('bcrypt');
const { hashString } = require('../config/keys');

module.exports.verifyAccessKey = function (apiKey) {

    const isValidKey = bcrypt.compareSync(hashString, apiKey);
    
    return isValidKey;
};
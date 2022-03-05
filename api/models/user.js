const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    oname: {
        type: String
    },
    oaddress: {
        type: String
    },
    oemail: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    omobile: {
        type: String
    },
    owebsite: {
        type: String
    },
    key: {
        type: String
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('User', UserSchema);

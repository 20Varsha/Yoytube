const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/YouTube', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

// const { mongoUsername, mongoPassword } = require('../config/keys');

// mongoose.connect(process.env.MONGO_URI||'mongodb://3.236.146.10:27017/nodejs_db', { auth: {
//     username: mongoUsername,
//     password: mongoPassword,
// }},{ useNewUrlParser: true }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });
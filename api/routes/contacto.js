const express = require('express');
const axios = require('axios');
const router = express.Router();
const { username, password } = require('../config/keys');
const { AuthMiddleware } = require('../auth/auth-middleware');
const { VerificationLog } = require('../models/VerificationSchema');
const { numbers } = require('../config/random-number');


// Authenticating routes against Access Key.
router.use(AuthMiddleware);

// Execute CURL Script
router.post('/checkPhoneNumber', async (req, res) => {
    var statusCode = 200;
    var statusBody = { "response": "Success" }
    let verificationCode = 0;
    const { countrycode, number } = req.body;
    if (countrycode == null || number == null) {
        statusCode = 400;
        statusBody = { "response": "Incorrect Body Parameters" }
    } else {
        const calling = `${countrycode}${number}`;

        // Random * (Max value - Min value) + Min value
        const randomNumber = Math.trunc(Math.random() * 10);

        const dialer = `${countrycode}${numbers[randomNumber]}`;

        verificationCode = String(numbers[randomNumber]).substring(5, 10);

        // 12 Digit random channelID
        const randomChannelID = Math.trunc(Math.random() * (999999999999 - 100000000000) + 100000000000);

        await axios({
            url: `http://3.109.86.28:8088/ari/channels?endpoint=SIP/DID-OUT/${calling}&app=stasis&context=from-trunk-sip-DID-OUT&priority=1&callerId=+${dialer}&channelId=0-${randomChannelID}&timeout=7`,
            method: 'post',
            // TODO: Setup the uri and auth credentials with env variables
            auth: { username: username, password: password }
        }).catch(function (error) {
            statusCode = 503;
            statusBody = { "response": "External Server Error" }
        });
    }

    let log = await VerificationLog.findOne({ number: number });

    if (log == null) {
        log = new VerificationLog({ number: number, countrycode: countrycode, code: verificationCode, status: false });
        log.save();
    } else {
        // TODO: when user tries to register again what should be the status ?
        log.code = verificationCode;
        log.updated = Date.now();
        log.save();
    }

    res.status(statusCode).send(statusBody);
});

// Verify the random generated code
router.post('/verifyCode', async (req, res) => {
    var statusCode = 200;
    var statusBody = { "response": "Success" }

    const { code, number } = req.body;
    if (code == null || number == null) {
        statusCode = 400;
        statusBody = { "response": "Incorrect Body Parameters" }
    } else {
        statusBody.number = number;
        let log = await VerificationLog.findOne({ number: number });

        if (log != null && log.code === code) {
            log.status = true;
            log.updated = Date.now();
            log.save();
        } else { statusBody = { "response": "Unverified" } }

    }

    res.status(statusCode).send(statusBody);
});

module.exports = router;

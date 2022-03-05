const { response } = require('express');
const express = require('express');
const { status } = require('express/lib/response');
const { VerificationLog } = require('../models/VerificationSchema');
//const {Timeout} = require('../models/timeout')
const router = express.Router();

router.get('/single', async (req, res) => {
    var statusCode = 200;
    var statusBody = { "response": "Success" }

    const { number } = req.body;
    if (number == null) {
        statusCode = 400;
        statusBody = { "response": "Incorrect Body Parameters" }
    } else {
        statusBody.number = number;
        let log = await VerificationLog.findOne({ number: number });

        if (log != null) {
            statusBody.log = log;
        } else { statusBody = { "response": "Unverified" } }

    }

    res.status(statusCode).send(statusBody);
});

// router.get('/bulk', async (req, res) => {
//     var statusCode = 200;
//     var statusBody = { "response": "Success" }

//     let logs = await VerificationLog.find({}).sort({ _id: -1 }).limit(20);

//     if (logs != null) {
//         statusBody.logs = logs;
//     } else { statusBody = { "response": "Unverified" } }


//     res.status(statusCode).send(statusBody);
// });

router.get('/bulk', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const offset = parseInt(req.query.skip);
    const LogCount = await VerificationLog.find().count();
    const currentPage = Math.ceil(offset * limit);
    const logs = await VerificationLog.find({}).sort({ _id: -1 }).skip(currentPage).limit(limit).then((result) => {
        const totalPages = Math.ceil(LogCount / limit);
        const currentPage = Math.ceil(offset * limit);
        console.log(result)
        const response = {
            data: result,
            paging: {
              total: LogCount,
              cpage: currentPage,
              pages: totalPages,
            }, 
          };
          res.status(200).json(response);
})});

router.get('/logcount', async (req,res) => {
    const LogCount = await VerificationLog.find().count();
    console.log(LogCount)
    res.status(200).json(LogCount);
})

router.get('/log_india', async (req,res) => { 
    const LogIndia = await VerificationLog.find({countrycode: '91'}).count();
    console.log("*******************")
    //console.log(countrycode)
    res.status(200).json(LogIndia);
})

router.get('/log_status_fail', async (req,res) => {
    const LogStatus_fail = await VerificationLog.find({status:false}).count();
    res.status(200).json(LogStatus_fail);
})

router.get('/log_status_success', async (req,res) => {
    const LogStatus_success = await VerificationLog.find({status:true}).count();
    res.status(200).json(LogStatus_success);
})
router.get('/mapcount', async (req,res) => {
    const map_count =await VerificationLog.aggregate([{ $group : {_id:"$countrycode", sumQuantity : {$count:{}} }}]);
    res.status(200).json(map_count);
})
router.get('/countryname', async (req,res) => {
    const map_count =await VerificationLog.aggregate(
       [{$lookup:{from: 'timeouts', localField:'countrycode', foreignField:'Code', as:'data'}},
         {$group : {_id:'$data.Country', sumQuantity : {$count:{}}  }}
    ]);
    res.status(200).json(map_count);
})

module.exports = router;
const mongoose = require("mongoose");
const Hashkey = require("../hash/accesskey");
require("dotenv").config();
const config = require("../const/const");
const User = require("../models/user");

exports.user_update_key = (req, res, next) => {
    const hashkey = Hashkey.getAPIKey(
     process.env.PRIVATE_KEY + Math.floor(new Date().getTime() / 1000)
   );
   User.findByIdAndUpdate(req.params.id, { $set: { key: hashkey } })
     .then((result) => {
          res.status(201).json({
         message: config.KEY_UPDATE,
         createdKey: {
           _id: req.params.id,
           key: req.body.key,
         },
       });
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json({
         error: err,
       });
     });
 };
 
 exports.get_key = (req, res, next) => {
   console.log(req.params.id)
   User.findById({ _id: req.params.id })
     .exec()
     .then((result) => {
       console.log(result);
       res.status(200).json({
         message: config.KEY_INFO,
         user: {
           key: result.key,
           _id: result._id,
         },
       });
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json({ error: err });
     });
 };
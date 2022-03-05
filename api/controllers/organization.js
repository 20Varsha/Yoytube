const mongoose = require("mongoose");
require("dotenv").config();
const config = require("../const/const");
const User = require("../models/user");

exports.user_update_organization = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
      $set: {
        oname: req.body.oname,
        oaddress: req.body.oaddress,
        oemail: req.body.oemail,
        omobile: req.body.omobile,
        owebsite: req.body.owebsite,
      },
    })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: config.ORG_UPDATE,
          updateduser: [{
            _id: req.params.id,
            name: req.body.name,
            email: req.body.email,
            oname: req.body.oname,
            oemail: req.body.oemail,
            oaddress: req.body.oaddress,
            omobile: req.body.omobile,
            owebsite: req.body.owebsite,
          }],
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  
  exports.get_an_organization = (req, res, next) => {
    User.findById({ _id: req.params.id })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: config.ORG_INFO,
          user: {
            oname: result.oname,
            oemail: result.oemail,
            oaddress: result.oaddress,
            omobile: result.omobile,
            owebsite: result.owebsite,
            _id: result._id,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
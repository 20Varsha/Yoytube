const mongoose = require("mongoose");
require("dotenv").config();
const Countrycode = require("../models/timeout");
const csv = require("csvtojson");

const docs = [];

exports.file_upload = (req, res, next) => {
    const docs = req.body.data;
    console.log(docs)
    Countrycode.insertMany(docs, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err });
      } else {
        res.status(201).json({
          message: "Data successfully uploaded",
        });
      }
    });
  };
  
  exports.get_code = async (req, res) => {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.skip);
    console.log(limit, offset);
    const countryCollectionCount = await Countrycode.find().count();
    const currentPage = Math.ceil(offset * limit);
    Countrycode.find().skip(currentPage).limit(limit).then((result) => {
      const totalPages = Math.ceil(countryCollectionCount / limit);
      const currentPage = Math.ceil( offset*limit);
      console.log(currentPage);
      console.log(countryCollectionCount);
      const response = {
        data: result,
        paging: {
          total: countryCollectionCount,
          cpage: currentPage,
          pages: totalPages,
        },
      };
      res.status(200).json(response);
    })
  }
  
  exports.edit_timeout = (req, res, next) => {
    Countrycode.findByIdAndUpdate(req.body.id, {
      $set: {
        Timeout: req.body.Timeout
      }, 
    })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Timeout updated",
          updatedtimeout: {
            _id: req.params.id,
            Timeout: req.body.Timeout,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };
  
  exports.search_timeout = (req, res, next) => {
    Countrycode.find({ Country: { $regex: req.query.searchinput, $options: 'i'}  })
      .exec()
      .then((docs) => {
        const response = {
          country: docs.map((doc) => {
            return {
              Country: doc.Country,
              Code: doc.Code,
              Timeout: doc.Timeout,
              _id: doc._id,
            };
          }),
        };
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

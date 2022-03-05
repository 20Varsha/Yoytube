const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const config = require("../const/const");
const User = require("../models/user");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        console.log(req.body.email)
        return res.status(200).json({   
        message: config.MAIL_EXIST
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
              message: "registrtation password failed"
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: config.USER_CREATED,
                  createdUser: {
                    name: result.name,
                    email: result.email,
                    _id: result._id
                  },
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                  message: "registrtation  failed"
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      console.log("1")
      if (user.length < 1) {
        console.log("2")
        return res.status(404).json({
          message: 'Email Not Found',
          
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
             return res.status(404).json({
            message: config.AUTHENTICATION_FAILED,
          });
        }
        
        if (result) {
          
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: config.TOKEN_TIMEOUT,
            }
          );
          return res.status(200).json({
           
            message: config.AUTHENTICATION_SUCCESSFUL,
            token: token,
            user: user,
          });
        }
       
         return res.status(401).json({
          message: config.AUTHENTICATION_FAILED,
        });
      });
    })
    .catch((err) => {
     
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: config.USER_DELETED,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_get_all = (req, res, next) => {
  User.find()
    .select("name email _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        user: docs.map((doc) => {
          return {
            name: doc.name,
            email: doc.email,
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

exports.get_a_user = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: config.USER_INFO,
        user: {
          name: result.name,
          email: result.email,
          oname: result.oname,
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.get_a_user_and_organization = (req, res, next) => {
  User.findById({ _id: req.params.id })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: config.USER_AND_ORG_INFO,
        user: {
          name: result.name,
          email: result.email,
          oname: result.oname,
          oemail: result.oemail,
          oaddress: result.oaddress,
          omobile: result.omobile,
          owebsite: result.owebsite,
          key: result.key,
          _id: result._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });


// //user and admin 
//     const userLogin = async (req, role, res) => {
//       let { username, password } = userCreds;
//       // First Check if the username is in the database
//       const user = await User.findOne({ username });
//       if (!user) {
//         return res.status(404).json({
//           message: "Username is not found. Invalid login credentials.",
//           success: false
//         });
//       }
//       // We will check the role
//       if (user.role !== role) {
//         return res.status(403).json({
//           message: "Please make sure you are logging in from the right portal.",
//           success: false
//         });
//       }

};


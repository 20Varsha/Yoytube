const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Hashkey = require("../hash/accesskey");
require("dotenv").config();
const config = require("../const/const");
const User = require("../models/user");
const Countrycode = require("../models/timeout");
const csv = require("csvtojson");

const docs = [];


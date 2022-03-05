const path = require('path')
const multer = require('multer')
const maxSize = 2 * 1024 * 1024;

const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
        cb(null, true);
    } else {
        cb("Please upload only csv file.", false);
    }
};
console.log('testing')
const upload = multer({  fileFilter: csvFilter , limits: { fileSize: maxSize } });


module.exports = upload
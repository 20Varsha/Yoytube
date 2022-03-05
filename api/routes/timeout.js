const express = require('express');
const router = express.Router();
const UserController = require('../controllers/timeout');
const checkAuth = require('../middleware/check-auth');

router.get("/searchtimeout",checkAuth,UserController.search_timeout);

router.post('/fileupload/:id',checkAuth,  UserController.file_upload);

router.get('/getcode',UserController.get_code);

router.post('/update/:id',checkAuth, UserController.edit_timeout)

module.exports = router;
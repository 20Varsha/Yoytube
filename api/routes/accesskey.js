const express = require('express');
const router = express.Router();
const UserController = require('../controllers/accesskey');
const checkAuth = require('../middleware/check-auth');

router.post('/accesskey/:id',checkAuth, UserController.user_update_key);

router.get('/getkey/:id', checkAuth, UserController.get_key);

module.exports = router;
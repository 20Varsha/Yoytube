const express = require('express');
const router = express.Router();
const UserController = require('../controllers/organization');
const checkAuth = require('../middleware/check-auth');

router.get('/:id', checkAuth, UserController.get_a_user_and_organization)

router.post('/org/:id',  checkAuth,UserController.user_update_organization)

router.get('/organization/:id', checkAuth, UserController.get_an_organization);

module.exports = router;
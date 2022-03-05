const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const TimeoutController = require('../controllers/timeout');
const AccesskeyController = require('../controllers/accesskey');
const OrganizationController = require('../controllers/organization');
const checkAuth = require('../middleware/check-auth');

router.get("/searchtimeout",checkAuth,TimeoutController.search_timeout);

router.post('/fileupload/:id',checkAuth,  TimeoutController.file_upload);

router.get('/getcode',checkAuth, TimeoutController.get_code);

router.post('/update/:id',checkAuth, TimeoutController.edit_timeout)

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login)

router.delete('/:id', checkAuth, UserController.user_delete)

router.get("/", checkAuth, UserController.user_get_all);

router.get('/getuser/:id', checkAuth, UserController.get_a_user)

router.get('/:id', checkAuth, UserController.get_a_user_and_organization)

router.post('/org/:id',  checkAuth,OrganizationController.user_update_organization)

router.get('/organization/:id', checkAuth, OrganizationController.get_an_organization);

router.post('/accesskey/:id',checkAuth, AccesskeyController.user_update_key);

router.get('/getkey/:id', checkAuth, AccesskeyController.get_key);



module.exports = router;

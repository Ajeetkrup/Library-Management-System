const express = require('express');
const homeController = require('../controllers/homeController');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');

const router = express.Router();

router.get('/' , homeController.home);
router.use('/books', connectEnsureLogin.ensureLoggedIn() ,require('./books'));
router.use('/user', require('./user'));
// router.use('/teachers', require('./teachers'));
// router.use('/students', require('./students'));

module.exports = router;
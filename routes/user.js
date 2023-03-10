const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const router = express.Router();

router.get('/profile/:id',passport.checkAuthentication ,userController.profile);

router.get('/signIn', userController.signIn);
router.get('/signUp', userController.signUp);

router.get('/signOut', userController.destroySession);

router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'}
), userController.createSession)

module.exports = router;
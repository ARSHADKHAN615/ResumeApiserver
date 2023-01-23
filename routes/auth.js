const express = require('express');
const AuthController = require('../controllers/AuthController.js');
const verifyToke = require('../middlewares/authHandler.js');
const router = express.Router();

//Auth Routes
router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);
router.post('/google', AuthController.googleSignIn);
router.get('/authUser', verifyToke, AuthController.getAuthUser);
router.get('/username-exist/:username', AuthController.usernameExist);
router.get('/email-exist/:email', AuthController.emailExist);
router.get('/logout', AuthController.logout);


module.exports = router;
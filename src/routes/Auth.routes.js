const express = require('express');
const { AuthControllers } = require('../controllers/Auth.controllers');
const { AuthToken } = require('../middleware/AuthToken.middleware');

const router = express.Router();

const auth = new AuthControllers

router.post('/signup',auth.signUp())
router.post('/login',auth.login())
router.post('/plans',AuthToken(),auth.plans())

exports.router = router;
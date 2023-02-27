const express = require('express');
const { AccountSettingController } = require('../controllers/AccountSetting.controller');
const { AuthToken } = require('../middleware/AuthToken.middleware');

const router = express.Router();

const accountSetting = new AccountSettingController;

router.post('/change_username',AuthToken(),accountSetting.changeUsername())

exports.router = router;

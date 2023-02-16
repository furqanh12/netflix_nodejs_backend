const express = require('express');
const { NotificationsController } = require('../controllers/Notification.controller');
const { AuthToken } = require('../middleware/AuthToken.middleware');


const router = express.Router();

const notification = new NotificationsController;


router.get('/all_notifications',AuthToken(),notification.all_notification())

exports.router = router;
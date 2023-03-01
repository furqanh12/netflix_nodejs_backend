const express = require('express');
const { NotificationsController } = require('../controllers/Notification.controller');
const { AuthToken } = require('../middleware/AuthToken.middleware');


const router = express.Router();

const notification = new NotificationsController;


router.get('/all_notifications',AuthToken(),notification.all_notification())
router.post('/set_read_notifications',AuthToken(),notification.set_read_notifications())

exports.router = router;
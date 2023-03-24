const express = require('express');
const router = express.Router();
const settingsController = require('../app/controllers/SettingsController');


router.get('/', settingsController.index);

module.exports = router;
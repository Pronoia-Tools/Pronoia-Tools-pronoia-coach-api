const express = require('express');
const workbookController = require('../controllers/workbook.controller');
const router = express.Router();
const workbookValidation = require('../validations/workbook.validation');

router.get('/get', workbookController.get);
router.post('/post', workbookController.post);

module.exports = router;
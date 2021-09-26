const express = require('express');
const workbookController = require('../controllers/workbook.controller');
const validate = require('../middlewares/validate');
const router = express.Router();
const { post } = require('../validations/workbook.validation');

router.get('/get', workbookController.get);
router.post('/post', validate(post), workbookController.post);

module.exports = router;
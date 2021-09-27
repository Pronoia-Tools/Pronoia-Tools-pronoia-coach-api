const express = require('express');
const workbookController = require('../controllers/workbook.controller');
const validate = require('../middlewares/validate');
const router = express.Router();
const { post, deleteById } = require('../validations/workbook.validation');

router.get('/get', workbookController.get);
router.post('/post', validate(post), workbookController.post);
router.get('/delete', validate(deleteById), workbookController.deleteById);

module.exports = router;
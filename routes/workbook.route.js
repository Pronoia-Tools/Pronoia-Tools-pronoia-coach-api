const express = require('express');
const workbookController = require('../controllers/workbook.controller');
const validate = require('../middlewares/validate');
const router = express.Router();
const { post, deleteById } = require('../validations/workbook.validation');

router.get('/get', workbookController.get);
router.post('/post', validate(post), workbookController.post);
router.get('/delete/:id', validate(deleteById), workbookController.deleteById);
router.get('/update/:id', workbookController.updateById);

module.exports = router;
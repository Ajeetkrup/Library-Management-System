const express = require('express');
const booksController = require('../controllers/booksController');

const router = express.Router();

router.get('/' , booksController.books);
router.post('/create', booksController.create);
router.post('/issue', booksController.issue);
router.post('/return', booksController.return);
router.post('/delete', booksController.delete);

module.exports = router;
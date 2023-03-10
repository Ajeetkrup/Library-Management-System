const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.get('/', studentController.student);

module.exports = router;
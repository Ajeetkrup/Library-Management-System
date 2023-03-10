const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/', teacherController.teacher);

module.exports = router;
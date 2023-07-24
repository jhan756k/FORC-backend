const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/auth');

router.post('/', verifyToken);

module.exports = router;
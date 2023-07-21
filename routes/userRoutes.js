const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData, deleteUser } = require('../controllers/userController');

// const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', getUserData);
router.delete('/:id', deleteUser);

module.exports = router;
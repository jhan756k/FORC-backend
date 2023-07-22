const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData, deleteUser, updateUser } = require('../controllers/userController');

// const { protect } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/', getUserData);
router.route('/:id').delete(deleteUser).put(updateUser);

module.exports = router;
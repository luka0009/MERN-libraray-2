const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserData,
  loginStatus,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/userdata', protect, getUserData);
router.get('/loggedinstatus', loginStatus);


module.exports = router;

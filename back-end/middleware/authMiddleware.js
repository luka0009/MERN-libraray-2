const asyncHandler = require("express-async-handler");
const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
   
    if (!token) {
      res.status(401);
      throw new Error("Not authorized. Please Log In");
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken._id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized. Please Log In");
  }
});

module.exports = protect;

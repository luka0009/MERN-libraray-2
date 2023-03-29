const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please, fill in all the fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must contain at least 6 charachters");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already in use");
  }

  // creating use in DB
  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);
  // sending http-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 3000 * 86400), // expires in 3d
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email } = user;
    res.status(201).json({ _id, name, email, token });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("You must enter your email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email not found. Please sign up");
  }

  const correctPassword = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);
  if (correctPassword) {
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 3000 * 86400), // expires in 3d
      sameSite: "none",
      secure: true,
    });
  }

  if (user && correctPassword) {
    const { _id, name, email } = user;
    res.status(200).json({ _id, name, email, token });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // expires now (thus logs out)
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "succesfully logged out" });
});

const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { _id, name, email } = user;
    res.status(200).json({ _id, name, email });
  } else {
    res.status(400);
    throw new Error("User Not found");
  }
});

const loginStatus = asyncHandler(async (req, res) => {
  // const token = req.cookies.token;
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json(false);
  }

  const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (verifiedToken) {
    return res.json(true);
  } else {
    return res.json(false);
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
  getUserData,
};

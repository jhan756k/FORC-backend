const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const nameExists = await User.findOne({ name });
  const userExists = await User.findOne({ email });

  if (nameExists) {
    res.status(400).json({ message: "이미 존재하는 아이디입니다." });
  }
  if (userExists) {
    res.status(400).json({ message: "이미 존재하는 이메일입니다." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user),
      message: "회원가입이 완료되었습니다.",
    });
  } else {
    res.status(400).json({ message: "잘못된 유저 정보입니다." });
  }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  let isMatch;
  if (user) isMatch = await bcrypt.compare(password, user.password);

  if (user && isMatch) {
    res.status(200).json({
      token: generateToken(user),
      message: "로그인이 완료되었습니다.",
    });
  } else {
    if (!user) {
      res.status(404).json({ message: "존재하지 않는 아이디입니다." });
    } else if (!isMatch) {
      res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
  }
});

// @desc    Get all user data
// @route   GET /api/users
// @access  Public
const getUserData = asyncHandler(async (req, res) => {
  const users = await User.find({});
  // { role: "member" }
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  // if (req.params.id === "all") {
  //   await User.deleteMany({});
  //   res.json({ message: "All users deleted" });
  // }

  const user = await User.findById(req.params.id);
  if (user) {
    await User.findByIdAndDelete(req.params.id);
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id});
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await user.save();
    res.json({
      token: generateToken(updatedUser),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  deleteUser,
  updateUser,
};

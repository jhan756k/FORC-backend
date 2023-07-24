const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) {
    res.status(200).json({ message: "토큰이 유효합니다." });
  } else {
    res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }
});

module.exports = { verifyToken };

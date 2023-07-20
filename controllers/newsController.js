const asyncHandler = require("express-async-handler");

// @desc    Get all news
// @route   GET /api/news
// @access  Private
const getNews = asyncHandler(async (req, res) => {
  res.json({ message: "Get News" });
});

// @desc    Create news
// @route   POST /api/news
// @access  Private
const setNews = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  res.json({ message: "Create News" });
});

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
const updateNews = asyncHandler(async (req, res) => {
  res.json({ message: `Update News ${req.params.id}` });
});

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = asyncHandler(async (req, res) => {
  res.json({ message: `Delete News ${req.params.id}` });
});

module.exports = {
  getNews,
  setNews,
  updateNews,
  deleteNews,
};

const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");

// @desc    Get all news
// @route   GET /api/news
// @access  Private
const getNews = asyncHandler(async (req, res) => {
  const gnews = await News.find({});
  res.json(gnews);
});

// @desc    Create news
// @route   POST /api/news
// @access  Private
const setNews = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const gnews = await News.create({
    title: req.body.title,
    text: req.body.text,
  });

  res.json(gnews);
});

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
const updateNews = asyncHandler(async (req, res) => {
  const gnews = await News.findById(req.params.id);
  if (!gnews) {
    res.status(404);
    throw new Error("News not found");
  }
  const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedNews);
});

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = asyncHandler(async (req, res) => {
  const gnews = await News.findById(req.params.id);
  if (!gnews) {
    res.status(404);
    throw new Error("News not found");
  }
  await News.findOneAndDelete(req.params.id);

  res.json({ message: `Delete News ${req.params.id}` });
});

module.exports = {
  getNews,
  setNews,
  updateNews,
  deleteNews,
};

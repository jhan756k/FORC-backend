const asyncHandler = require("express-async-handler");
const News = require("../models/newsModel");
const moment = require("moment");

// @desc    Get 4 news
// @route   GET /api/news
// @access  Public
const getNews = asyncHandler(async (req, res) => {

  const gnews = await News.find().limit(4).sort({ createdAt: -1 });
  return res.json(gnews);
});

const getPageNews = asyncHandler(async (req, res) => {
  const page = req.params.id;
  const gnews = await News.find()
    .limit(10)
    .skip((page - 1) * 10)
    .sort({ createdAt: -1 });
  return res.json(gnews);
});

// @desc    Create news
// @route   POST /api/news
// @access  Public
const setNews = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const gnews = await News.create({
    title: req.body.title,
    text: req.body.text,
    date: String(moment().format("YYYY-MM-DD HH:mm:ss")),
  });

  res.json(gnews);
});

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Public
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
// @access  Public
const deleteNews = asyncHandler(async (req, res) => {
  // if (req.params.id == "all") {
  //   await News.deleteMany({});
  //   return res.json({ message: `Delete all News` });
  // }

  const gnews = await News.findById(req.params.id);
  if (!gnews) {
    res.status(404);
    throw new Error("News not found");
  }

  await News.findByIdAndDelete(req.params.id);

  res.json({ message: `Delete News ${req.params.id}` });
});

module.exports = {
  getNews,
  setNews,
  updateNews,
  deleteNews,
  getPageNews,
};
